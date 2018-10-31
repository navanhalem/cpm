	// simulations settings
	var simsettings = {
		SIMTYPE : "2D",
		NRCELLS : [0,280],
		BURNIN : 0,
		RUNTIME : 12000,
		CANVASCOLOR : "FFFFFF",
		STROMACOLOR : "AAAAAA",
		CELLCOLOR : ["00CC00","4A4C4F"],
		ACTCOLOR : [false,false],
		VIEWTRACKS : false,
		TRACKCOLOR : ["FF0000"],
		SHOWBORDERS : [false,true],
		SAVEIMG : false,
		FRAMERATE : 10,
		SAVEPATH : "movies",
		MCSRATE : 5
	}

if( typeof module !== "undefined" ){
	module.exports = simsettings
}
