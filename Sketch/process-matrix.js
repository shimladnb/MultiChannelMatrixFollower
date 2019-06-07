inlets = 1;
outlets = 2;

var outmatrix = new JitterMatrix(4,"char",320,240);

function jit_matrix(mname) {
	var matrix = new JitterMatrix(mname);

	var planemap = new Array();
	planemap[0]=0;
	planemap[1]=3;
	planemap[2]=2;
	planemap[3]=1;
	outmatrix.planemap  = planemap;
	outmatrix.frommatrix(matrix);
	outlet(0,"jit_matrix",outmatrix.name);	
}

function bang() {

	var matrix = new JitterMatrix("noisemat");	// defined in max patch
	for(i=0; i<10; i++) {
		for(j=0; j<10; j++) {
			var val = matrix.getcell(j, i);
			matrix.setcell(j,i,"val",val[0],val[1]-100,val[2]-100,val[3]-100);
		}
	}
	outlet(1,"jit_matrix",matrix.name);	
}