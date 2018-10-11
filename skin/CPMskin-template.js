var Cset = {
	ndim : 2,
	field_size : {x:200,y:200},
	conf : {LAMBDA_P : [0,2,2],
		LAMBDA_V : [0,30,30],
		LAMBDA_ACT : [0,20,0],
		MAX_ACT : [0,1000,0],
		P : [0,125,145],
		V : [0,100,145],
		J_T_STROMA : [NaN,15,15],
		J_T_ECM : [NaN,20,20],
		J_T_T : [ [NaN,NaN,NaN], [NaN,100,20], [NaN,20,20] ],
		T : 20,
		ACT_MEAN : "geometric"
	}
}

if( typeof module !== "undefined" ){
	module.exports = Cset
}
