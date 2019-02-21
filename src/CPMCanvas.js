/** Class for taking a CPM grid and displaying it in either browser or with nodejs. */

// Constructor takes a CPM object C
function CPMCanvas( C, options, simdata ){
	this.C = C
	this.zoom = (options && options.zoom) || 1

	this.wrap = (options && options.wrap) || [0,0,0]
	this.width = this.wrap[0]
	this.height = this.wrap[1]

	if( this.width == 0 || this.C.field_size.x < this.width ){
		this.width = this.C.field_size.x
	}
	if( this.height == 0 || this.C.field_size.y < this.height ){
		this.height = this.C.field_size.y
	}

	if( typeof document !== "undefined" ){
		this.el = document.createElement("canvas")
		this.el.width = this.width*this.zoom
		this.el.height = this.height*this.zoom//C.field_size.y*this.zoom
		var parent_element = (options && options.parentElement) || document.body
		parent_element.appendChild( this.el )
	} else {
		const {createCanvas} = require("canvas")
		this.el = createCanvas( this.width*this.zoom,
			this.height*this.zoom )
		this.fs = require("fs")
	}

	this.ctx = this.el.getContext("2d")
	this.ctx.lineWidth = .2
	this.ctx.lineCap="butt"
}


CPMCanvas.prototype = {


	/* Several internal helper functions (used by drawing functions below) : */
	pxf : function( p ){
		this.ctx.fillRect( this.zoom*p[0], this.zoom*p[1], this.zoom, this.zoom )
	},

	pxfnozoom : function( p ){
		this.ctx.fillRect( this.zoom*p[0], this.zoom*p[1], 1, 1 )
	},
	/* draw a line left (l), right (r), down (d), or up (u) of pixel p */
	pxdrawl : function( p ){
		this.ctx.fillRect( this.zoom*p[0], this.zoom*p[1], 1, this.zoom )
	},
	pxdrawr : function( p ){
		this.ctx.fillRect( this.zoom*(p[0]+1), this.zoom*p[1], 1, this.zoom )
	},
	pxdrawd : function( p ){
		this.ctx.fillRect( this.zoom*p[0], this.zoom*(p[1]+1), this.zoom, 1 )
	},
	pxdrawu : function( p ){
		this.ctx.fillRect( this.zoom*p[0], this.zoom*p[1], this.zoom, 1 )
	},

	/* For easier color naming */
	col : function( hex ){
		this.ctx.fillStyle="#"+hex
	},
	/* Color the whole grid in color [col] */
	clear : function( col ){
		col = col || "000000"
		this.ctx.fillStyle="#"+col
		this.ctx.fillRect( 0,0, this.el.width, this.el.height )
	},

	context : function(){
		return this.ctx
	},

	i2p : function( i ){
		var p = this.C.i2p( i ), dim
		for( dim = 0; dim < p.length; dim++ ){
			if( this.wrap[dim] != 0 ){
				p[dim] = p[dim] % this.wrap[dim]
			}
		}
		return p
	},

	/* DRAWING FUNCTIONS ---------------------- */

	/* Use to draw the border of each cell on the grid in the color specified in "col"
	(hex format). This function draws a line around the cell (rather than coloring the
	outer pixels)*/
	drawCellBorders : function( kind, col ){
		col = col || "000000"
		var p, pc, pu, pd, pl, pr, i, pdraw
		this.col( col )
		this.ctx.fillStyle="#"+col

		// cst contains indices of pixels at the border of cells
		var cst =  this.C.cellborderpixels.elements
		for( i = 0 ; i < cst.length ; i ++ ){
			if( this.C.cellKind(this.C.cellpixelstype[cst[i]]) == kind ){
				p = this.C.i2p( cst[i] )
				pdraw = this.i2p( cst[i] )
				pc = this.C.pixt( [p[0],p[1],0] )
				pr = this.C.pixt( [p[0]+1,p[1],0] )
				pl = this.C.pixt( [p[0]-1,p[1],0] )
				pd = this.C.pixt( [p[0],p[1]+1,0] )
				pu = this.C.pixt( [p[0],p[1]-1,0] )
				if( pc != pl  ){
					this.pxdrawl( pdraw )
				}
				if( pc != pr ){
					this.pxdrawr( pdraw )
				}
				if( pc != pd ){
					this.pxdrawd( pdraw )
				}
				if( pc != pu ){
					this.pxdrawu( pdraw )
				}
			}

		}
	},
	/* Use to show activity values of the act model using a color gradient, for
	cells in the grid of cellkind "kind". */
	drawActivityValues : function( kind ){

		// cst contains the pixel ids of all non-background/non-stroma cells in
		// the grid. The function tohex is used to convert computed color gradients
		// to the hex format.
		var cst = Object.keys( this.C.cellpixelstype ), ii, sigma, a,
			tohex = function(a) { a = parseInt(255*a).toString(16)
				return  ("00".substring(0,2-a.length))+a }, i

		// loop over all pixels belonging to non-background, non-stroma
		for( i = 0 ; i < cst.length ; i ++ ){
			ii = cst[i]
			sigma = this.C.cellpixelstype[ii]

			// For all pixels that belong to the current kind, compute
			// color based on activity values, convert to hex, and draw.
			if( this.C.cellKind(sigma) == kind ){
				a = this.C.pxact( ii )/this.C.par("MAX_ACT",sigma)
				if( a > 0 ){
					if( a > 0.5 ){
						this.col( "FF"+tohex(2-2*a)+"00" )
					} else {
						this.col( tohex(2*a)+"FF00" )
					}
					this.pxf( this.i2p( ii ) )
				}
			}
		}
	},
	/* colors outer pixels of each cell */
	drawOnCellBorders : function( col ){
		col = col || "000000"
		this.col( col )
		this.ctx.fillStyle="#"+col
		var cst =  this.C.cellborderpixels.elements, i
		for( i = 0 ; i < cst.length ; i ++ ){
			this.pxf( this.i2p( cst[i] ) )
		}
	},

	/* Converts rgb value ( 0 -> 255 ) to hex vaulue ( 00 -> FF ) */
	rgbToHex : function (rgb) {
		var hex = Number(rgb).toString(16);
		if (hex.length < 2) {
			hex = "0" + hex;
		}
		return hex;
	},

	/* Converts rgb array to hex color string ((0, 0, 255) -> "0000FF") */
	fullColorHex : function(r,g,b) {
		var red = this.rgbToHex(r);
		var green = this.rgbToHex(g);
		var blue = this.rgbToHex(b);
		return red+green+blue;
	},

	/* Converts hex color string array to rgb ("0000FF" -> [0,0,255]) */
	hexToRgb : function( hex ){
		let bigint = parseInt(hex, 16)
		let r = (bigint >> 16) & 255
		let g = (bigint >> 8) & 255
		let b = bigint & 255
		return [r,g,b]
	},

	/* Picks a color between color1 and color2 based on the weight */
	pickCol : function( color1, color2, weight ) {
		var w1 = weight;
		var w2 = 1 - w1;
		var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
		return rgb;
	},

	/* Draw all cells of cellkind "kind" in color col (hex). */
	drawCells : function( kind, col, infectionlist ){
		col = col || "000000"
		this.col( col )

		// Object cst contains pixel index of all pixels belonging to non-background,
		// non-stroma cells.
		var cst = Object.keys( this.C.cellpixelstype ), i
		for( i = 0 ; i < cst.length ; i ++ ){
			if( this.C.cellKind(this.C.cellpixelstype[cst[i]]) == kind ){
				// If cellkind == 2 draw between gray and red depending on how infected the cell is
				if (kind == 2 || kind == 3 || kind == 4) {
					cell_id = this.C.pixti(cst[i])
					if (this.C.t2k[cell_id] == 4) {
						this.col( "000000" )
					}
					else {
						hexCode = this.pickCol(this.hexToRgb( col ), this.hexToRgb( "CC0000" ), 1 - ( infectionlist[cell_id]/ 2000 ) )
						this.col( this.fullColorHex(hexCode[0], hexCode[1], hexCode[2]) )
					}
				}
				this.pxf( this.i2p( cst[i] ) )
			}
		}
	},

	/* Draw all stroma pixels in color col (hex). */
	drawStroma : function( col ){
		col = col || "000000"
		this.col( col )

		// Loop over all stroma pixels. Object cst contains
		// pixel index of all stroma pixels.
		var cst = Object.keys( this.C.stromapixelstype ), i
		for( i = 0 ; i < cst.length ; i ++ ){
			this.pxf( this.i2p( cst[i] ) )
		}
	},

	/* Draw grid to the png file "fname". */
	writePNG : function( fname ){
		this.fs.writeFileSync(fname, this.el.toBuffer())
	}
}

/* This allows using the code in either the browser or with nodejs. */
if( typeof module !== "undefined" ){
	module.exports = CPMCanvas
}
