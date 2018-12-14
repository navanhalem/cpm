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
var savetime = parseInt(process.argv[3]) || 1
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
			C.infection[centroids[i].id] = C.maxInfection / 2
			C.setCellKind(centroids[i].id, 3)
		}
	}
}

function logData() {
	console.log(sim.time, chemotaxis, killingTime, entryBias, C.countCells(1), C.countCells(5), C.countCells(2), C.countCells(3), C.countCells(4) )
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
		// console.log(chemotaxis, killingTime, entryBias, tissuedamage, sim.time/25/60)
		report = false
		// stopSim()
	}
	if(sim.time == sim.runtime) {
		// console.log(chemotaxis, killingTime, entryBias, tissuedamage, sim.runtime/25/60 + 1)
		report = false
	}
}

// Perform a step in the model
function step(){

	let timestart = sim.time

	while ( sim.time <= sim.runtime && !sim.stop ) {
		// console.time("MCS")
		// console.time("mcs")
		sim.timestep()
		// console.timeEnd("mcs")
		// console.time("chemokine")

		// console.time("p c")
		C.produceChemokine()
		// console.timeEnd("p c")

		// console.time("d c")
		for(let i = 0; i < 10; i++) {
			C.updateValues()
		}
		// console.timeEnd("d c")

		// console.time("update grid")
		C.updateGrid()
		// console.timeEnd("update grid")

		// console.time("r c")
		C.removeChemokine()
		// console.timeEnd("r c")

		// console.timeEnd("chemokine")
		// Cimgradient.drawChemokineGradientFromList( "ffffff" )
		// Cimgradient.drawChemokineGradientFromList( "0061ff" )
		// console.timeEnd("MCS")
		// if (sim.time % savetime == 0) {
		// 	// console.log(simulationType, sim.time)
		// 	sim.drawCanvas()
		// 	Cim.writePNG("output/" + sim.time + "_" + borderingparameter + ".png")
		// 	// fs.writeFileSync("output/" + sim.time + "_" + chemotaxis + "_" + killingTime + "_" + entryBias + "_" + simulationType + "G.png", Cimgradient.el.toBuffer())
		// }

		//log data
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
