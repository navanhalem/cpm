/* This extends the CPM from CPM.js with a chemotaxis module.
Can be used for two- or three-dimensional simulations, but visualization
is currently supported only in 2D. Usable from browser and node.
*/


/* ------------------ CHEMOTAXIS --------------------------------------- */
if( typeof CPM == "undefined" ){
	CPM = require("./CPM.js" )
}

var math = require("mathjs")

function nmod(x, N) {
	return ((x % N) + N) % N;
}

function t21(x,y,N){
	return nmod(y,N)*N+nmod(x,N)
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

		this.entryBias = 0
		this.entryBiasStrength = 0.97

		this.D = 6.2 * Math.pow(10, -5)
		this.dx = .38/600//1 //pixel
		this.dt = 60/25//1 //MCS
		this.secretion = 100 //molecules per lattice site
		this.decay = 0.15 //15% of the concentration decays

		// prepare laplacian matrix
		this.L = math.multiply( math.identity( this.size*this.size, this.size*this.size, 'sparse' ), -4 )
		for( let x = 0 ; x < this.size ; x ++ ){
			for( let y = 0 ; y < this.size; y ++ ){
				let i = t21(x,y,this.size)
				this.L.set([i,t21(nmod(x-1,this.size),y,this.size)],1)
				this.L.set([i,t21(nmod(x+1,this.size),y,this.size)],1)
				this.L.set([i,t21(x,nmod(y-1,this.size),this.size)],1)
				this.L.set([i,t21(x,nmod(y+1,this.size),this.size)],1)
			}
		}

		// scale matrix to diffusion coefficient & spatiotemporal step
		this.Afirst = math.multiply( this.L, this.D * this.dt / this.dx / this.dx )
		this.A = math.multiply( this.L, this.D * this.dt / this.dx / this.dx )
		for ( let i = 1; i < 10; i++ ) {
			this.A = math.multiply( this.A, this.Afirst )
		}
		this.chemokinelevel = math.zeros(this.size*this.size,1)

	}

	produceChemokine () {
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
				if (this.infection[this.pixt([x,y])] > 0) {
					// this.chemokinelevel[x][y] += 100
					this.chemokinelevel.set([t21(x,y,this.size),0], this.secretion * this.dt)
				}
			}
		}
		// for (var x = 0; x < this.size; x++) {
	  //   for (var y = 0; y < this.size; y++) {
		// 		if (Math.sqrt(Math.pow(100-x,2) + Math.pow(100-y, 2)) < 15) {
		// 			this.chemokinelevel[x][y] += 100
		// 		}
		// 	}
		// }
	}

	removeChemokine () {
		// for (var x = 0; x < this.size; x++) {
	  //   for (var y = 0; y < this.size; y++) {
		// 			this.chemokinelevel[x][y] *= .85
		// 	}
		// }
		this.chemokinelevel = math.multiply( this.chemokinelevel, 1 - this.decay * this.dt )
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
	  this.values_to_add[x][y] += J
	  this.values_to_add[x_new][y_new] -= J
	}

	updateValues () {
	  // this.clearDatagrid()
		// for (var x = 0; x < this.size; x++) {
	  //   for (var y = 0; y < this.size; y++) {
		// 		this.values_to_add[x][y] += this.D * (this.chemokinelevel[(x+1+this.size)%this.size][y] +
		// 		 														this.chemokinelevel[x][(y+1+this.size)%this.size] +
		// 																this.chemokinelevel[(x-1+this.size)%this.size][y] +
		// 																this.chemokinelevel[x][(y-1+this.size)%this.size] +
		// 																this.chemokinelevel[(x-1+this.size)%this.size][(y-1+this.size)%this.size] +
		// 																this.chemokinelevel[(x+1+this.size)%this.size][(y-1+this.size)%this.size] +
		// 																this.chemokinelevel[(x-1+this.size)%this.size][(y+1+this.size)%this.size] +
		// 																this.chemokinelevel[(x+1+this.size)%this.size][(y+1+this.size)%this.size] -
		// 																(4+4*(1/Math.sqrt(1+1)))*this.chemokinelevel[x][y])
	  //   }
	  // }
		// for (var x = 0; x < this.size; x++) {
	  //   for (var y = 0; y < this.size; y++) {
	  //     this.chemokinelevel[x][y] += this.values_to_add[x][y]
	  //   }
	  // }
		this.chemokinelevel = math.add( math.multiply( this.A, this.chemokinelevel ), this.chemokinelevel )
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
		if ( norm2 == 0 ) { return 0 }
		return r/Math.sqrt(norm1)/Math.sqrt(norm2)
	}

	/* This computes the gradient based on a given function evaluated at the two target points. */
	gridAttractor ( p1, p2, dir ){
		return dir( p2 ) - dir( p1 )
	}

	computeGradient ( source, chemokinelevel ) {
		let gradient = [0, 0]
		for ( let i = -1; i < 2; i++ ) {
			for ( let j = -1; j < 2; j++ ) {
				//gradient is - for all dimensions - the sum of the directions*chemokine_level of all neighbors
				gradient[0] += i * (chemokinelevel.get([t21((source[0]+i)%(this.field_size.x-1)+1, (source[1]+j)%(this.field_size.x-1)+1,this.size),0]) - chemokinelevel.get([t21(source[0], source[1],this.size),0]))
				gradient[1] += j * (chemokinelevel.get([t21((source[0]+i)%(this.field_size.x-1)+1, (source[1]+j)%(this.field_size.x-1)+1,this.size),0]) - chemokinelevel.get([t21(source[0], source[1],this.size),0]))
			}
		}
		return gradient
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
			let gradientvec2 = this.computeGradient( this.i2p(sourcei), this.chemokinelevel )
			bias = this.linAttractor( this.i2p(sourcei), this.i2p(targeti), gradientvec2 )
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
