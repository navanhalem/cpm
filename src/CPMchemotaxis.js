/* This extends the CPM from CPM.js with a chemotaxis module. 
Can be used for two- or three-dimensional simulations, but visualization
is currently supported only in 2D. Usable from browser and node.
*/


/* ------------------ CHEMOTAXIS --------------------------------------- */
if( typeof CPM == "undefined" ){
	CPM = require("./CPM.js" )	
}

class CPMchemotaxis extends CPM {

	constructor( ndim, field_size, conf ) {
		// call the parent (CPM) constructor
		super( ndim, field_size, conf )
		// make sure "chemotaxis" is included in list of terms
		if( this.terms.indexOf( "chemotaxis" ) == -1 ){
			this.terms.push( "chemotaxis" )
		}
		this.size = field_size.x
		this.chemokinelevel = []
		for (var i = 0; i < this.size; i++) {
		   this.chemokinelevel[i] = []
		   for (var j = 0; j < this.size; j++) {
		      this.chemokinelevel[i][j] = 0
		   }
		}
		this.values_to_add = []
		for (var i = 0; i < this.size; i++) {
		  this.values_to_add[i] = []
			for (var j = 0; j < this.size; j++) {
			  this.values_to_add[i][j] = 0
			}
		}
		this.D = 24.8 * 0.01//0000000001
	}

	produceChemokine () {
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
				if (this.infection[this.pixt([x,y])] > 0) {
					this.chemokinelevel[x][y] += 100
				}
			}
		}
	}

	removeChemokine () {
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
					this.chemokinelevel[x][y] *= .85
			}
		}
	}

	clearDatagrid () {
	  for (var i = 0; i < this.size; i++) {
	     for (var j = 0; j < this.size; j++) {
	        this.values_to_add[i][j] = 0
	     }
	  }
	}

	flow (x, y, x_new, y_new) {
	  x_new = x_new%this.size
	  y_new = y_new%this.size
	  if (x_new < 0) {
	    x_new += this.size
	  }
	  let J = -this.D * (this.chemokinelevel[x][y] - this.chemokinelevel[x_new][y_new])
	  J *= 1/8
	  this.values_to_add[x][y] += J
	  this.values_to_add[x_new][y_new] -= J
	}

	updateValues () {
	  this.clearDatagrid()
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
	      this.flow(x, y, x+1, y)    //flow east
	      this.flow(x, y, x+1, y+1)  //flow south-east
	      this.flow(x, y, x, y+1)    //flow south
	      this.flow(x, y, x-1, y+1)  //flow south-west
	    }
	  }
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
	      this.chemokinelevel[x][y] += this.values_to_add[x][y]
	    }
	  }
	}

	/*  To bias a copy attempt p1->p2 in the direction of target point pt.
		Vector p1 -> p2 is the direction of the copy attempt,
		Vector p1 -> pt is the preferred direction. Then this function returns the cosine
		of the angle alpha between these two vectors. This cosine is 1 if the angle between
		copy attempt direction and preferred direction is 0 (when directions are the same),
		-1 if the angle is 180 (when directions are opposite), and 0 when directions are
		perpendicular. */
	pointAttractor ( p1, p2, pt ){
		let r = 0., norm1 = 0, norm2 = 0, d1=0., d2=0.
		for( let i=0 ; i < p1.length ; i ++ ){
			d1 = pt[i]-p1[i]; d2 = p2[i]-p1[i]
			r += d1 * d2
			norm1 += d1*d1
			norm2 += d2*d2
		}
		return r/Math.sqrt(norm1)/Math.sqrt(norm2)
	}
	
	/* To bias a copy attempt p1 -> p2 in the direction of vector 'dir'.
	This implements a linear gradient rather than a radial one as with pointAttractor. */
	linAttractor ( p1, p2, dir ){

		let r = 0., norm1 = 0, norm2 = 0, d1 = 0., d2 = 0.
		// loops over the coordinates x,y,(z)
		for( let i = 0; i < p1.length ; i++ ){
			// direction of the copy attempt on this coordinate is from p1 to p2
			d1 = p2[i] - p1[i]

			// direction of the gradient
			d2 = dir[i]
			r += d1 * d2
			norm1 += d1*d1
			norm2 += d2*d2
		}
		return r/Math.sqrt(norm1)/Math.sqrt(norm2)
	}

	/* This computes the gradient based on a given function evaluated at the two target points. */
	gridAttractor ( p1, p2, dir ){
		return dir( p2 ) - dir( p1 )
	}

	/* This computes the gradient based on a given function evaluated at the two target points for custom gradient. */
	customAttractor ( source, target, chemokinelevel ){
		if( chemokinelevel[source[0]][source[1]] < chemokinelevel[target[0]][target[1]] ) {
			return 1
		} else {
			return -1
		}
	}

	deltaHchemotaxis ( sourcei, targeti, src_type, tgt_type ){
		const gradienttype = this.conf["GRADIENT_TYPE"]
		const gradientvec = this.conf["GRADIENT_DIRECTION"]
		let bias, lambdachem

		if( gradienttype == "radial" ){
			bias = this.pointAttractor( this.i2p(sourcei), this.i2p(targeti), gradientvec )
		} else if( gradienttype == "linear" ){
			bias = this.linAttractor( this.i2p(sourcei), this.i2p(targeti), gradientvec )
		} else if( gradienttype == "grid" ){
			bias = this.gridAttractor( this.i2p( sourcei ), this.i2p( targeti ), gradientvec )
		} else if( gradienttype == "custom" ){
			bias = this.customAttractor( this.i2p(sourcei), this.i2p(targeti), this.chemokinelevel )
		// } else if( gradienttype == "custom" ){
		// 	bias = gradientvec( this.i2p( sourcei ), this.i2p( targeti ), this )
		}  else {
			throw("Unknown GRADIENT_TYPE. Please choose 'linear', 'radial', 'grid', or 'custom'." )
		}
		// if source is non background, lambda chemotaxis is of the source cell.
		// if source is background, use lambda chemotaxis of target cell.
		if( src_type != 0 ){
			lambdachem = this.par("LAMBDA_CHEMOTAXIS",src_type )
		} else {
			lambdachem = this.par("LAMBDA_CHEMOTAXIS",tgt_type )
		}

		return -bias*lambdachem
	}

}



/* This allows using the code in either the browser or with nodejs. */
if( typeof module !== "undefined" ){
	module.exports = CPMchemotaxis
}

