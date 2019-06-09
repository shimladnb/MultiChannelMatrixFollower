inlets = 1;
outlets = 2;
autowatch = 1;


var beforeMatrix 	= new JitterMatrix(1, "char", 255); 
var afterMatrix 	= new JitterMatrix(1, "char", 255);
var outputMatrix	= new JitterMatrix(1, "char", 512);
var outputMatrix2	= new JitterMatrix(1, "char", 512);
var split1			= new JitterMatrix(1, "char", 512);
var split2			= new JitterMatrix(1, "char", 512);

var afterAmount		= 0;

var beforeMult		= new JitterObject("jit.multiplex");
beforeMult.truncate = 0;
beforeMult.scan_a	= 1;
beforeMult.scan_b	= 1;

function after(a)
{
	afterAmount = a;	
}

function before(b)
{
	beforeMult.scan_a = b;
}

function bang() 
{
	var envMatrix = new JitterMatrix("semtiplex");	// defined in max patch
	beforeMult.matrixcalc([beforeMatrix, envMatrix],outputMatrix);

	if (afterAmount > 0) 
	{
		for (var i=0; i<afterAmount; i++) 
		{
			var initName = "afterAmt";
			var resultName = initName.concat(i);	

			var resultName	= new JitterObject("jit.multiplex");
			beforeMult.truncate = 0;
			beforeMult.scan_a	= 1;
			beforeMult.scan_b	= 1;

			resultName.matrixcalc([outputMatrix,beforeMatrix],outputMatrix2)
			outlet(0,"jit_matrix",outputMatrix2.name);	
		}		
	}
	else
	{
		outlet(0,"jit_matrix",outputMatrix.name);		
	}
}