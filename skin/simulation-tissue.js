

function simulation( C, Cim, Cs, conf, Ct  ){

	this.C = C
	this.Cim = Cim
	this.Cs = Cs
	this.conf = conf

	// max x,y,z coordinates in the grid
	this.maxc = [this.C.field_size.x-1, this.C.field_size.y-1 ]
	if( this.C.ndim == 3 ){
		this.maxc[2] = this.C.field_size.z-1
	}

	this.viewtracks = this.conf["VIEWTRACKS"]
	if( this.viewtracks ){
		this.Ct = Ct
	}

	this.save = this.conf["SAVEIMG"]
	this.runtime=this.conf["RUNTIME"]
	this.simtype = this.conf["SIMTYPE"] || "2D"

	// to track the time of the actual simulation (no burnin)
	this.time = 0
	this.borderthreshold = 30
	this.Tcell_infection_borders = []
}

simulation.prototype = {

	// Seed cells and allow a burnin phase, then start the simulation.
	initialize : function(){

		var nrcells = this.conf["NRCELLS"], burnin = this.conf["BURNIN"]
		var cellkind, i, stromavoxels

		// if the simulation is 1D, set up the microchannel
		// (top and bottom row of pixels in the grid)
		if( this.simtype == "1D" ){
			channelvoxels = this.C.addStromaPlane( [], 1, 0 )
			channelvoxels = this.C.addStromaPlane( channelvoxels, 1, this.C.field_size.y-1 )
			this.C.addStroma( channelvoxels )
		}


		// Seed the right number of cells for each cellkind
		var totalcells = 0
		for( cellkind = 0; cellkind < nrcells.length; cellkind ++ ){

			for( i = 0; i < nrcells[cellkind]; i++ ){
				// first cell always at the midpoint. Any other cells
				// randomly.
				// if( totalcells == 0){
				// 	this.C.seedCellAt( cellkind+1, this.C.midpoint, false )
				// 	totalcells++
				// } else {
					this.C.seedCell( cellkind+1 )
					totalcells++
				// }
			}
		}

		// Simulate the burnin phase
		for( i = 0; i < burnin; i++ ){
			this.C.monteCarloStep()
		}

		// Call timestep to start the real simulation.
		this.timestep()

	},

	getCellsToAffect : function( affectors, targetmin, targetmax ){
		var cellsToAffect = {}
		for ( i = 0; i < affectors.length; i++ ) {
			infectedCellNeighbors = this.Cs.cellNeighborsList(affectors[i])[1]
			for (const [key, value] of Object.entries(this.Cs.cellNeighborsList(affectors[i])[1])) {
				if (this.C.infection[key] <= targetmax && this.C.infection[key] >= targetmin){
					if ( key in cellsToAffect ){
						cellsToAffect[key] = cellsToAffect[key] + value
					}
					else {
						cellsToAffect[key] = value
					}
				}
			}
		}
		return cellsToAffect
	},

	findCells : function(infectionLevelMin, infectionLevelMax){
		var cells = []
		for( i = 0; i < this.C.t2k.length; i++ ) {
			if( this.C.infection[i] >= infectionLevelMin  && this.C.infection[i] <= infectionLevelMax ) {
				cells.push(i)
			}
		}
		return cells
	},

	kill : function(){
		var killers = this.findCells(-1, -1)
		var infectedNeighbors = this.getCellsToAffect( killers, 1, this.C.maxInfection )

		for (const [key, value] of Object.entries(infectedNeighbors)){
			if (this.C.killing[key] < this.C.maxKilling){
				this.C.killing[key] = this.C.killing[key] + value
				// this.Tcell_infection_borders.push(value)
				if(this.C.killing[key] >= this.C.maxKilling){
					this.C.killing[key] = this.C.maxKilling
					this.C.infection[key] = -2
					this.C.setCellKind(key, 4)
				}
			}
		}
	},

	infectOthers : function(){
		var infected = this.findCells(1, this.C.maxInfection)
		var skinNeighbors = this.getCellsToAffect( infected, 0, 0 )

		for (const [key, value] of Object.entries(skinNeighbors)){
			let rand = Math.random()
			if (rand < value * 0.00005){
				this.C.infection[key] = 1
				this.C.setCellKind(key, 3)
			}
		}
	},

	getMoreInfected : function(){
		for( i = 0; i < this.C.t2k.length; i++ ) {
			if( this.C.infection[i] > 0 && this.C.infection[i] < this.C.maxInfection ) {
				this.C.infection[i] = this.C.infection[i] + 1
			}
		}
	},

	replaceInfectionBorderCell : function(cell_idToReplace){
		// replace border cell with most infected neighbors with this cell
		var skinNeighbors = this.getCellsToAffect( this.findCells(1, this.C.maxInfection), 0, 0 )
		var maxKey = -1
		var maxVal = -1
		for (const [key, value] of Object.entries(skinNeighbors)){
			if (value > maxVal) {
				maxKey = key
				maxVal = value
			}
		}
		this.C.killing[maxKey] = this.C.killing[cell_idToReplace]
		this.C.infection[maxKey] = this.C.infection[cell_idToReplace]
		this.C.setCellKind(maxKey, 3)
	},

	biasedEntry : function() {
		let xpos = Math.floor( Math.random()*( this.C.field_size.x ) )
		let ypos = Math.floor( Math.random()*( this.C.field_size.y ) )
		let maxConcentration = Math.max.apply(null, this.C.chemokinelevel.map(function(row){ return Math.max.apply(Math, row)}))
	  let sumConcentrations =  this.C.chemokinelevel.reduce(function(a,b) { return a.concat(b) }).reduce(function(a,b) { return a + b })

	  let maxProb = maxConcentration/sumConcentrations
		let thisProb = this.C.chemokinelevel[xpos][ypos]/sumConcentrations
		var thisRealProb = (thisProb/maxProb)*this.C.entryBiasStrength + (1-this.C.entryBiasStrength)

		while ( Math.random() > thisRealProb ) {
			xpos = Math.floor( Math.random()*( this.C.field_size.x ) )
			ypos = Math.floor( Math.random()*( this.C.field_size.y ) )
			thisProb = this.C.chemokinelevel[xpos][ypos]/sumConcentrations
			thisRealProb = (thisProb/maxProb)*this.C.entryBiasStrength + (1-this.C.entryBiasStrength)
		}
		return [xpos, ypos]
	},

	addTCell : function() {
		var cell_idToReplace = -1
		typeToReplace = 1
		while ( typeToReplace != 2) {
			let x = Math.floor( Math.random()*( this.C.field_size.x ) )
			let y = Math.floor( Math.random()*( this.C.field_size.y ) )
			if ( this.C.entryBias == 1 ) {
				let xy = this.biasedEntry()
				x = xy[0]
				y = xy[1]
			}
			cell_idToReplace = this.C.pixt([x, y])
			typeToReplace = this.C.cellKind(cell_idToReplace)
		}
		if (this.C.killing[cell_idToReplace] < 7500 && this.C.infection[cell_idToReplace] > 0) {
			this.replaceInfectionBorderCell(cell_idToReplace)
		}
		this.C.infection[cell_idToReplace] = -1
		this.C.killing[cell_idToReplace] = -1
		this.C.setCellKind(cell_idToReplace, 1)
	},

	// Update the grid and either draw it or print track output
	timestep : function(){
		// Update the grid with one MCS
		this.kill()
		this.infectOthers()
		this.getMoreInfected()
		if ((this.time + 1) % 20 == 0 && this.C.countCells(1) < this.C.maxTCells) {
			this.addTCell()
		}
		this.C.monteCarloStep()
		this.time++
	},

	atBorder : function(){

		var cbp = this.C.cellborderpixels
		var i,p,j

		// only check in detail if centroid is within 20px of grid borders
		if( this.nearBorder(this.borderthreshold) ){

			// loop over the cellborderpixels, and check if they are at the grid border.
			for( i = 0; i < cbp.length; i++ ){
				p = this.C.i2p( cbp.elements[i] )
				for( j = 0; j < p.length; j++ ){
					if( p[j] == 0 || p[j] == this.maxc[j] ){
						return true
					}
				}
			}

		}
		return false

	},
	nearBorder : function( threshold ){

		// since there is only one cell, this is an array
		// of length 1 containing an object with "id", x,y,z
		// of the cell t = "id".
		// Still, loop for consistency:
		var centroid = this.Cs.getCentroids()
		var i,c


		for( i = 0; i < centroid.length; i++ ){
			c = centroid[i]
			var xmax = this.C.field_size.x - threshold - 1,
				ymax = this.C.field_size.y - threshold -1,
				zmax = this.C.field_size.z-threshold-1

			if( c.x < threshold || c.x > xmax ){
				return true;
			}
			if( this.simtype != "1D" && ( c.y < threshold || c.y > ymax ) ){
				return true;
			}
			if( this.C.ndim == 3 ){
				if( c.z < threshold || c.z > zmax ){
					return true;
				}
			}
		}

		return false
	},


	// Draw the grid
	drawCanvas : function(){

		var canvascolor=this.conf["CANVASCOLOR"], stromacolor=this.conf["STROMACOLOR"],
			showborders=this.conf["SHOWBORDERS"],
			cellcolor=this.conf["CELLCOLOR"], actcolor=this.conf["ACTCOLOR"],
			trackcolor=this.conf["TRACKCOLOR"],
			nrcells=this.conf["NRCELLS"],cellkind

		// Clear canvas and draw stroma border
		this.Cim.clear( canvascolor )
		if( this.simtype == "1D" ){
			this.Cim.drawStroma( stromacolor )
		}

		// Draw each cellkind appropriately
		for( cellkind = 0; cellkind < nrcells.length; cellkind ++ ){
			if( cellcolor[ cellkind ] != -1 ){
				this.Cim.drawCells( cellkind+1, cellcolor[cellkind] )
			}
			if( actcolor[ cellkind ] ){
				this.Cim.drawActivityValues( cellkind + 1 )
			}
			if( showborders[ cellkind ] ){
				//this.Cim.drawCellBorders( cellkind+1, "AAAAAA" )
				this.Cim.drawCellBorders( cellkind+1, "000000" )
			}
			if( this.viewtracks ){
				if( trackcolor[ cellkind ] != -1 ){
					this.Ct.drawTracks( trackcolor[cellkind], cellkind+1 )
				}
			}

		}

	},

	reset : function(){


		// remove all cells from the grid, but keep stroma
		var cellpix1 = this.C.cellpixelstype, cellpix = Object.keys( cellpix1 ), i
		for( i = 0; i < cellpix.length; i++ ){
			if( cellpix1[i] != 0 ){
				this.C.delpixi( cellpix[i] )
			}
		}
		// Also remove the cellborderpixels
		this.C.cellborderpixels = new DiceSet()
		// call initialize to re-seed cells
		this.initialize()
	}


}


/* This allows using the code in either the browser or with nodejs. */
if( typeof module !== "undefined" ){
	var DiceSet = require("../../cpm/src/DiceSet.js")
	module.exports = simulation
}
