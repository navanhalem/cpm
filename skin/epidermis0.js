// require("../src/DiceSet.js")
// require("../src/CPM.js")
var CPMStats = require("../src/CPMStats.js")
var CPMCanvas = require("../src/CPMCanvas.js")
var BGCanvas = require("../src/BGCanvas.js")
var CPMchemotaxis = require("../src/CPMchemotaxis.js")
var TrackCanvas = require("../src/TrackCanvas.js")
var simulation = require("./simulation-tissue.js")
var CsetChemotaxis = require("./CPMskin-template.js")
var simsettings = require("./CPMskin-settings.js")


var C,Cim,Ct,Cs, showtracks=simsettings["VIEWTRACKS"], stopped=true, zoom=4, wrap=[0,0]

// used to name the sliders
var names = {
	LAMBDA_ACT : "&lambda;<sub>Act</sub>",
	MAX_ACT : "Max<sub>Act</sub>",
	LAMBDA_P : "&lambda;<sub>P,tissue</sub>"
}

var runtime = parseInt(process.argv[2]) || 100
var savetime = parseInt(process.argv[3]) || 1
var field_size = parseInt(process.argv[4]) || 200
var kera_cells_factor = (field_size*field_size)/(200*200)
var max_CTL = 100*( (field_size*field_size) / (600*600) )
var chemotaxis = parseInt(process.argv[5]) || 30
var infectionArea = parseFloat(process.argv[6]) || 0.1
var entryBias = parseFloat(process.argv[7]) || 0

function initialize(){
	Cset = CsetChemotaxis
	Cset.conf["LAMBDA_CHEMOTAXIS"][1] = chemotaxis
	C = new CPMchemotaxis( Cset.ndim, {x:field_size,y:field_size}, Cset.conf)
	C.entryBias = entryBias
	C.maxTCells = max_CTL
	C.infectionArea = infectionArea
	Cim = new CPMCanvas( C, {zoom:zoom,wrap:wrap} )
	Cimgradient = new BGCanvas( C, {zoom:zoom, wrap:wrap} )

	Cs = new CPMStats( C )
	Ct = null//new TrackCanvas( Cs, {zoom:zoom} )

	simsettings["RUNTIME"] = runtime
	simsettings["NRCELLS"][1] *= kera_cells_factor
	sim = new simulation( C, Cim, Cs, simsettings, Ct )

	this.fs = require("fs")
	sim.initialize()
	step()
}

// Perform a step in the model
function step(){

	while ( sim.time < sim.runtime ) {

		if (sim.time % savetime == 0) {
			console.log(sim.time)
			Cim.writePNG("output/" + sim.time + ".png")
			// this.fs.writeFileSync("output/" + sim.time + "G.png", Cimgradient.el.toBuffer())
		}

		// Cs.centroids( false, sim.findCells(-1) )

		for( var i = 0; i < 1; i++ ){
			sim.timestep()
		}

		sim.drawCanvas()
		C.produceChemokine()
		C.updateValues()
		C.removeChemokine()

		//when the infection is cleared, print the time in hours and the tissue damage in nr of cells
		var tissuedamage = 0
		var infection = false
		for (let i = 0; i < C.t2k.length; i ++) {
			if (C.t2k[i] == 2){
				if(C.infection[i] == -2) {
					tissuedamage += 1
				}
				if(C.infection[i] > 0){
					tissuedamage += 1
					infection = true
				}
			}
		}
		if(infection == false) {
			// console.log(tissuedamage, sim.time/25/60)
		}


		Cimgradient.drawChemokineGradientFromList( "ffffff" )
		Cimgradient.drawChemokineGradientFromList( "0061ff" )
	}

	// sim.Tcell_infection_borders

	 const fs = require('fs');
	 for ( i in sim.Tcell_infection_borders ) {
		 // console.log(sim.Tcell_infection_borders[i])
	 }
	 // write to a new file named values.txt
	 // fs.writeFile('values.txt', sim.Tcell_infection_borders.toString(), (err) => {
		//  // throws an error, you could also catch it here
		//  if (err) throw err;
		//  // success case, the file was saved
		//  // console.log('array saved!');
	 // })

}

// For controlling the simulation
function startSim(){
	sim.stop = false
	step()
}

function stopSim(){
	sim.stop = true
}

initialize()
