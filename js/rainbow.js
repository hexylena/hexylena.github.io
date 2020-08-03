// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = 700;
var svg = document.getElementById("plot");
const canvas = document.getElementById('canvas');

var controls = new Controls({
	range: {
		seed: [0, 1, 200],
		branches: [0, 100, 100],
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

function _renderCanvas() {
	canvas.style.width = width + "px";
	canvas.style.height = width + "px";
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = controls.sky;
	ctx.fillRect(0, 0, width, width);

	randomSetSeed(parseInt(controls.seed));
	noise.seed(0);


	trees(ctx, controls, width/2, width/2);

}

