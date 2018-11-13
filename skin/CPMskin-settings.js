	// simulations settings
	var simsettings = {
		SIMTYPE : "2D",
		NRCELLS : [0,280,0,0],
		BURNIN : 500,
		RUNTIME : 12000,
		CANVASCOLOR : "FFFFFF",
		STROMACOLOR : "AAAAAA",
		CELLCOLOR : ["00CC00","4A4C4F","4A4C4F","4A4C4F"],
		ACTCOLOR : [false,false,false,false],
		VIEWTRACKS : false,
		TRACKCOLOR : ["FF0000"],
		SHOWBORDERS : [false,true,true,true],
		SAVEIMG : false,
		FRAMERATE : 10,
		SAVEPATH : "movies",
		MCSRATE : 5
	}

if( typeof module !== "undefined" ){
	module.exports = simsettings
}
