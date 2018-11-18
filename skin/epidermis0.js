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
var chemotaxis = parseInt(process.argv[5]) || 0
var infectionStart = parseFloat(process.argv[6]) || 0.1
var entryBias = parseInt(process.argv[7]) || 0
var killingTime = parseInt(process.argv[8]) || 15 //15, 30, 45, 60
var avg_border_CTL_infection = 11.59
var simulationType = parseInt(process.argv[9]) || 1
var report = true

function initialize(){
	Cset = CsetChemotaxis
	Cset.conf["LAMBDA_CHEMOTAXIS"][1] = chemotaxis
	Cset.conf["LAMBDA_CHEMOTAXIS"][5] = chemotaxis
	if(simulationType == 2){
		Cset.conf["LAMBDA_CHEMOTAXIS"][5] = 0
		Cset.conf["LAMBDA_ACT"][5] = 0
	}
	if(simulationType == 3){
		Cset.conf["LAMBDA_CHEMOTAXIS"][5] = 0
	}
	C = new CPMchemotaxis( Cset.ndim, {x:field_size,y:field_size}, Cset.conf)
	C.entryBias = entryBias
	C.maxTCells = max_CTL
	C.infectionStart = infectionStart
	C.maxKilling = killingTime * 25 * avg_border_CTL_infection
	Cim = new CPMCanvas( C, {zoom:zoom,wrap:wrap} )
	Cimgradient = new BGCanvas( C, {zoom:zoom, wrap:wrap} )

	Cs = new CPMStats( C )
	Ct = null//new TrackCanvas( Cs, {zoom:zoom} )

	simsettings["RUNTIME"] = runtime
	simsettings["NRCELLS"][1] *= kera_cells_factor
	sim = new simulation( C, Cim, Cs, simsettings, Ct )
	sim.initialize()
	report = true
	startSim()
	step()
}

function reportResults(){
	var tissuedamage = 0
	var infection = false
	for (let i = 0; i < C.t2k.length; i ++) {
		if (C.t2k[i] == 3){
			tissuedamage += 1
			infection = true
		} else if (C.t2k[i] == 4) {
			tissuedamage += 1
		}
	}
	if(infection == false) {
		console.log(chemotaxis, killingTime, entryBias, tissuedamage, sim.time/25/60)
		report = false
		stopSim()
	}
	if(sim.time == sim.runtime) {
		console.log(chemotaxis, killingTime, entryBias, tissuedamage, sim.runtime/25/60 + 1)
		report = false
	}
}

// Perform a step in the model
function step(){

	while ( sim.time <= sim.runtime && !sim.stop ) {

		sim.timestep()

		sim.drawCanvas()
		C.produceChemokine()
		C.updateValues()
		C.removeChemokine()
		// Cimgradient.drawChemokineGradientFromList( "ffffff" )
		// Cimgradient.drawChemokineGradientFromList( "0061ff" )

		if (sim.time % savetime == 0) {
			console.log(sim.time)
			Cim.writePNG("output/" + sim.time + ".png")
			// this.fs.writeFileSync("output/" + sim.time + "G.png", Cimgradient.el.toBuffer())
		}

		//when the infection is cleared, print the time in hours and the tissue damage in nr of cells
		if(report){
			reportResults()
		}
	}

	// sim.Tcell_infection_borders

	 // const fs = require('fs');
	 // for ( i in sim.Tcell_infection_borders ) {
		//  // console.log(sim.Tcell_infection_borders[i])
	 // }
	 // // write to a new file named values.txt
	 // fs.writeFile('borders.txt', sim.Tcell_infection_borders.toString(), (err) => {
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
