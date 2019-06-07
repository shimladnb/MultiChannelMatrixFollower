autowatch = 1;

var lamps = [];
var matOut = new JitterMatrix(1, "char", 16);

lamp = function(i){
	this.i = i;
	this.r = 0;
	this.g = 0;
	this.b = 0;
}

function init(v){
	matOut = new JitterMatrix(1, "char", v*4);
	lamps = [];
	for (var i=0; i<v; i++){
		lamps.push(new lamp(i));
	}
}

function color(c, v){
	for (var i=0; i<lamps.length; i++){
		switch(c){
			case "red":
				lamps[i].r = v; break;
			case "green":
				lamps[i].g = v; break;
			case "blue":
				lamps[i].b = v; break;
		}
		matOut.setcell1d(i*4, lamps[i].i);
		matOut.setcell1d(i*4+1, lamps[i].r);
		matOut.setcell1d(i*4+2, lamps[i].g);
		matOut.setcell1d(i*4+3, lamps[i].b);
	}
}

function bang(){
	outlet(0, "jit_matrix", matOut.name);
}