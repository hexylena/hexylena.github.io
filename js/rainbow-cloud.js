// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = 700;
var svg = document.getElementById("plot");
const canvas = document.getElementById('canvas');

var controls = new Controls({
	range: {
		poffX: [0, 50, 700],
		poffY: [0, 50, 700],
		pR: [0, 30, 90],
		seed: [0, 1, 200],
		blobs: [30, 60, 100],
		spread: [50, 100, 130],
	},
	color: {
		cloud: '#ffffff',
		sky: '#333388',
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

function _renderCanvas() {
	canvas.style.width = width + "px";
	canvas.style.height = width + "px";
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = controls.sky;
	ctx.fillRect(0, 0, width, width);
	ctx.fillStyle = controls.cloud;

	randomSetSeed(parseInt(controls.seed));
	noise.seed(0);


	cloud(ctx, 80, 100, 50, 200, 200);

}

