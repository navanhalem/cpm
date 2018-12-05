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

		// diffusion variables
		this.resolutionDecrease = 10
		this.newSize = this.size/this.resolutionDecrease
		this.D = 6.2 * Math.pow(10, -5)/10 // 10 diffusion steps per MCS
		this.dx = .38/(600/this.resolutionDecrease)//1 //pixel
		this.dt = 60/60//1 //MCS
		this.secretion = 100 //molecules per lattice site
		this.decay = 0.15 //15% of the concentration decays

		// biased entry variables
		this.entryBias = 0
		this.entryBiasStrength = 1

		// prepare laplacian matrix
		this.L = math.multiply( math.identity( (this.newSize)*(this.newSize), (this.newSize)*(this.newSize), 'sparse' ), -4 )
		for( let x = 0 ; x < (this.newSize) ; x ++ ){
			for( let y = 0 ; y < (this.newSize); y ++ ){
				let i = t21(x,y,(this.newSize))
				this.L.set([i,t21(nmod(x-1,(this.newSize)),y,(this.newSize))],1)
				this.L.set([i,t21(nmod(x+1,(this.newSize)),y,(this.newSize))],1)
				this.L.set([i,t21(x,nmod(y-1,(this.newSize)),(this.newSize))],1)
				this.L.set([i,t21(x,nmod(y+1,(this.newSize)),(this.newSize))],1)
			}
		}

		// scale matrix to diffusion coefficient & spatiotemporal step
		this.A = math.multiply( this.L, this.D * this.dt / this.dx / this.dx )
		this.chemokinelevel = math.zeros((this.newSize)*(this.newSize),1)
		this.chemokinereal = math.zeros(this.size*this.size,1)
	}

	// at every pixel occupied by an infected cell, secrete (secretion rate/(resolutionDecrease^2)) chemokine
	produceChemokine () {
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
				if (this.infection[this.pixt([x,y])] > 0) {
					let index = [t21(math.floor(x/this.resolutionDecrease),math.floor(y/this.resolutionDecrease),(this.newSize)),0]
					this.chemokinelevel.set(index, this.chemokinelevel.get(index) + (this.secretion/(this.resolutionDecrease*this.resolutionDecrease)) * this.dt)
				}
			}
		}
	}

	// perform diffusion
	updateValues () {
		this.chemokinelevel = math.add( math.multiply( this.A, this.chemokinelevel ), this.chemokinelevel )
	}

	// interpolate between the grid points in the diffusion grid to obtain a more accurate chemokine value for the main grid
	interpolate(x, y, c) {
		let xplus = x + 0.001
		let yplus = y + 0.001
		let p1 = c.get([nmod(math.ceil(xplus),this.newSize), nmod(math.ceil(yplus),this.newSize)]) * Math.abs((x - math.floor(xplus)) * (y - math.floor(yplus)))
		let p2 = c.get([nmod(math.ceil(xplus),this.newSize), nmod(math.floor(yplus),this.newSize)]) * Math.abs((x - math.floor(xplus)) * (math.ceil(yplus) - y))
		let p3 = c.get([nmod(math.floor(xplus),this.newSize), nmod(math.ceil(yplus),this.newSize)]) * Math.abs((math.ceil(xplus) - x) * (y - math.floor(yplus)))
		let p4 = c.get([nmod(math.floor(xplus),this.newSize), nmod(math.floor(yplus),this.newSize)]) * Math.abs((math.ceil(xplus) - x) * (math.ceil(yplus) - y))
		return (p1+p2+p3+p4)
	}

	// updates the main grid with interpolated values of the chamokine grid
	updateGrid () {
		let chemokineMatrix = math.reshape(this.chemokinelevel, [(this.newSize), (this.newSize)])
		this.chemokinereal = math.reshape(this.chemokinereal, [this.size, this.size])
		for (var x = 0; x < this.size; x++) {
	    for (var y = 0; y < this.size; y++) {
				let scalex = x/this.resolutionDecrease
				let scaley = y/this.resolutionDecrease
				let value = this.interpolate(scalex, scaley, chemokineMatrix)
				this.chemokinereal.set([x,y], value)
			}
		}
		this.chemokinereal = math.reshape(this.chemokinereal, [this.size*this.size, 1])
		this.chemokinelevel = math.reshape(this.chemokinelevel, [(this.newSize)*(this.newSize), 1])
	}

	// removes a percentage of the chemokine
	removeChemokine () {
		this.chemokinelevel = math.multiply(this.chemokinelevel, 1 - this.decay * this.dt)
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
			let gradientvec2 = this.computeGradient( this.i2p(sourcei), this.chemokinereal )
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
