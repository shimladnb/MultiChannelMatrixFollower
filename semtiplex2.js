inlets = 1;
outlets = 2;
autowatch = 1;


var beforeMatrix 	= new JitterMatrix(1, "char", 255); 
var afterMatrix 	= new JitterMatrix(1, "char", 255);
var outputMatrix	= new JitterMatrix(1, "char", 512);
var split1			= new JitterMatrix(1, "char", 512);
var split2			= new JitterMatrix(1, "char", 512);

var beforeMult		= new JitterObject("jit.multiplex");
beforeMult.truncate = 0;
beforeMult.scan_a	= 1;
beforeMultscan_b	= 1;

/*
var afterMult1		= new JitterObject("jit.multiplex");
beforeMult.truncate = 0;
beforeMult.scan_a	= 1;
beforeMultscan_b	= 1;
*/

var cutOff			= new JitterObject("jit.split");
cutOff.splitdim 	= 1;
cutOff.splitpoint  	= 512;

// scissors.matrixcalc(inMatrix, [outMatrix1, outMatrix2]);


function before(v)
{
	beforeMult.scan_a = v;
}

function bang() 
{
	
	var envMatrix = new JitterMatrix("semtiplex");	// defined in max patch
	beforeMult.matrixcalc([beforeMatrix, envMatrix],outputMatrix);
	cutOff.matrixcalc(outputMatrix,[split1,split2]);
	outlet(0,"jit_matrix",split1.name);	
	outlet(1,"jit_matrix",split2.name);	

}