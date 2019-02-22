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

const fs = require('fs')
var runtime = parseInt(process.argv[2]) || 1000
var savetime = parseInt(process.argv[3]) || 0
var field_size = parseInt(process.argv[4]) || 200
var kera_cells_factor = (field_size*field_size)/(200*200)
var max_CTL = 100*( (field_size*field_size) / (600*600) )
var chemotaxis = parseInt(process.argv[5]) || 0
var infectionStart = parseFloat(process.argv[6]) || 0.1
var entryBias = parseInt(process.argv[7]) || 0
var killingTime = parseInt(process.argv[8]) || 15 //15, 30, 45, 60
var avg_border_CTL_infection = 30.46
var simulationType = parseInt(process.argv[9]) || 1
var infectionChance = parseFloat(process.argv[10]) || 0.000025
var maxAct = parseInt(process.argv[11]) || 20
var lAct = parseInt(process.argv[12]) || 1000
var borderingparameter = parseInt(process.argv[13]) || 2
var idnr = parseInt(process.argv[14]) || 0

var report = true

function initialize(){
	Cset = CsetChemotaxis
	Cset.conf["LAMBDA_CHEMOTAXIS"][1] = chemotaxis
	Cset.conf["LAMBDA_CHEMOTAXIS"][5] = chemotaxis
	Cset.conf["LAMBDA_ACT"][1] = lAct
	Cset.conf["LAMBDA_ACT"][5] = lAct
	Cset.conf["MAX_ACT"][1] = maxAct
	Cset.conf["MAX_ACT"][5] = maxAct
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
	C.maxKilling = killingTime * 60 * avg_border_CTL_infection

	Cim = new CPMCanvas( C, {zoom:zoom,wrap:wrap} )
	Cimgradient = new BGCanvas( C, {zoom:zoom, wrap:wrap} )
	Cs = new CPMStats( C )
	Ct = null//new TrackCanvas( Cs, {zoom:zoom} )

	simsettings["MAXKILLING"] = killingTime * 60 * avg_border_CTL_infection
	simsettings["RUNTIME"] = runtime
	simsettings["NRCELLS"][1] *= kera_cells_factor
	sim = new simulation( C, Cim, Cs, simsettings, Ct )
	sim.initialize()
	sim.borderingparameter = borderingparameter
	sim.infectionChance = infectionChance
	sim.avg_border_CTL_infection = avg_border_CTL_infection
	seedInfection()
	logData()
	report = true
	startSim()
	step()
}

function seedInfection() {
	let centroids = Cs.getCentroids()
	for (let i = 0; i < centroids.length; i++) {
		if(Math.sqrt(Math.pow((centroids[i].x - (field_size/2)), 2) + Math.pow((centroids[i].y - (field_size/2)), 2)) < (field_size*infectionStart)) {
			sim.infectionlist[centroids[i].id] = 2000 / 2
			C.setCellKind(centroids[i].id, 3)
		}
	}
}

function logData() {
	console.log(sim.time, chemotaxis, killingTime, entryBias, C.countCells(1), C.countCells(5), C.countCells(2), C.countCells(3), C.countCells(4) )
}

// Perform a step in the model
function step(){

	let timestart = sim.time

	while ( sim.time <= sim.runtime && !sim.stop ) {
		// MCS is performed
		sim.timestep()
		// Chemokine is produced by all chemokine grid lattice sites
		C.produceChemokine()
		// Every MCS, the chemokine diffuses 10 times
		for(let i = 0; i < 10; i++) {
			C.updateValues()
		}
		// Updates the main grid with interpolated values of the chemokine grid
		C.updateGrid()
		// Chemokine decays
		C.removeChemokine()
		// two lines below should be executed if chemokine should be drawn
		// Cimgradient.drawChemokineGradientFromList( "ffffff" )
		// Cimgradient.drawChemokineGradientFromList( "0061ff" )
		if (savetime != 0) {
			if (sim.time % savetime == 0) {
				sim.drawCanvas()
				Cim.writePNG("output/" + sim.time + "_" + chemotaxis + "_" + killingTime + "_" + simulationType + "_" + idnr + ".png")
				// the line below should be executed if chemokine should be drawn
				// fs.writeFileSync("output/" + sim.time + "_" + chemotaxis + "_" + killingTime + "_" + entryBias + "_" + simulationType + "G.png", Cimgradient.el.toBuffer())
			}
		}

		//log data every 30 MCS and stop simulation if no more infected cells are left
		if(report && sim.time % 30 == 0){
			logData()
			if(C.countCells(3) == 0){
				stopSim()
			}
		}
	}
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
