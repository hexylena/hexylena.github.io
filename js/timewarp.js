// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = 200;
var svg = document.getElementById("plot");
const canvas = document.getElementById('canvas');

var controls = new Controls({
	range: {
		seed: [0, 1, 200],
		r1: [0, 51, 100],
		r2: [0, 17, 100],
		r3: [0, 65, 100],
		r4: [0, 11, 100],
		r5: [0, 50, 100],
	},
	color: {
		sky: '#ffffff',
		bark: '#572d17'
	}
});

var gui = GUI(controls, render);
render();

function render(){
	var t0 = performance.now()
	_renderCanvas()
	var t1 = performance.now()
	console.log((t1 - t0) + " milliseconds.")
}


function noize(x, y){
	return noise.perlin2(x, y) + 0.5;
	//return Math.sin(x) * Math.sin(y);
}

function fbm6(x, y){
	var f = 0.0;
	f += 0.5000*(0.5 + 0.5 * noize(x, y));
	x *= 3.01
	y *= 2.01
	f += 0.2500*(0.5 + 0.5 * noize(x, y));
	x *= 1.01
	y *= 2.01
	f += 0.1250*(0.5 + 0.5 * noize(x, y));
	x *= 3.01
	y *= 2.01
	f += 0.0625*(0.5 + 0.5 * noize(x, y));
	x *= 3.01
	y *= 2.01
	f += 0.0312*(0.5 + 0.5 * noize(x, y));
	x *= 3.01
	y *= 2.01
	f += 0.0156*(0.5 + 0.5 * noize(x, y));
	return f;
}

function fbm4(x, y){
	var f = 0.0;
	f += 0.5000*noize(x, y);
	x *= 3.01
	y *= 2.01
	f += 0.2500*noize(x, y);
	x *= 1.01
	y *= 2.01
	f += 0.1250*noize(x, y);
	x *= 3.01
	y *= 2.01
	f += 0.0625*noize(x, y);
	return f;
}

function fbm4_2(x, y){
	return fbm4(fbm4(x, y) + controls.r1 / 100, fbm4(x + 11.7, y + 10))
}

function fbm4_3(x, y){
	return fbm4(fbm4_2(x, y) + controls.r3 / 100, fbm4_2(x + 12.3, y + 14.01))
}

function _renderCanvas() {
	scale = 3;
	canvas.style.width = width * scale + "px";
	canvas.style.height = width * scale + "px";
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = controls.sky;
	ctx.fillRect(0, 0, width, width);

	randomSetSeed(parseInt(controls.seed));
	//noize.seed(0);

	for(var x = 0; x < width; x++){
		for(var y = 0; y < width; y++){
			var n = fbm4_3(x, y);
			var r = 255 * (fbm4_3(x/32, y/32))
			var g = 255 * (fbm4_2((x + 32)/32, (y - 32)/32))
			var b = 255 * (fbm4_3((x + 32)/64, (y - 32)/16))
			ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 1)`;
			ctx.fillRect( x, y, 1, 1  );
		}
	}


}

