	// simulations settings
	var simsettings = {
		SIMTYPE : "2D",
		NRCELLS : [1,280],
		BURNIN : 0,
		RUNTIME : 5000,
		CANVASCOLOR : "FFFFFF",
		STROMACOLOR : "AAAAAA",
		CELLCOLOR : ["000000","eaecef"],
		ACTCOLOR : [true,false],
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
