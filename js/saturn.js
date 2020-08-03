// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = $("article.post").width();
var svg = document.getElementById("plot");

var controls = new Controls({
	range: {
		poffX: [-200, 0, 1000],
		poffY: [-200, 45, 1000],
		pR: [0, 241, 800],
		rR: [0, 10, 800],
		rings: [0, 110, 500],
		skew: [-80, 48, 80],
		ringRotation: [-180, 180, 180],
		width: [20, 60, 200],
		depth: [20, 40, 200],
		seed: [0, 0, 200],
	},
	color: {
		space: '#ffffff',
		planet: '#000000',
		ring: '#888888',
	}
});
var gui = GUI(controls, render);
render();

function render() {
	svg.style.width = width + "px";
	svg.style.height = width + "px";

	randomSetSeed(controls.seed);
	noise.seed(controls.seed);

	svg.innerHTML = `

<style xmlns="http://www.w3.org/2000/svg" type="text/css">
        line { stroke: #000; stroke-width: 2;  }
</style>
<defs>
<pattern id="diagonalHatch" width="5" height="5" patternTransform="rotate(27)" patternUnits="userSpaceOnUse">
  <line x1="0" y1="0" x2="0" y2="5" />
</pattern>
</defs>
	`;

	var offsets = [];
	for(var i = 0; i < controls.rings; i++){
		off =  1 + (i * 0.01 + random()/30)
		offsets.push(off);
	}

	// Background
	svg.innerHTML += `
		<rect x="-1000" y="-1000" width="3000" height="3000" style="stroke:none;fill:${controls.space}" />
	`

	// Background Rings
	var tmp = '';
	tmp += `<g transform="translate(${controls.poffX}, ${controls.poffY})">`;
	for(var i = 0; i < controls.rings; i++){
		off = offsets[i];
		//(controls.pR + controls.rR)*off
		s = off * (controls.pR + controls.rR) / 100
		tmp += `
			<path
				style="fill:none;stroke-width:${1 / s};stroke:${controls.ring}"
				id="path815"
				d="M 100,0 A 100,100 0 0 1 50,86.659274 100,100 0 0 1 -50,86.488739 100,100 0 0 1 -100,0"

				type="arc"
				start="0"
				end="3.1415927"
				ry="100"
				open="true"
				rx="100"
				cy="0"
				cx="0"
				transform="
					rotate(${controls.ringRotation} 0 0)
					skewX(${controls.skew})
					scale(${s})
				"
				/>

		`

	}
	tmp += '</g>'
	svg.innerHTML += tmp;

	// planet
	svg.innerHTML += `
		<ellipse cx="${controls.poffX}" cy="${controls.poffY}" rx="${controls.pR}" ry="${controls.pR}" style="stroke:none;fill:${controls.planet}" />
	`

	// Foreground Rings
	var tmp = '';
	tmp += `<g transform="translate(${controls.poffX}, ${controls.poffY})">`;
	for(var i = 0; i < controls.rings; i++){
		off = offsets[i];
		s = off * (controls.pR + controls.rR) / 100
		tmp += `
			<path
				style="fill:none;stroke-width:${1 / s};stroke:${controls.ring}"
				id="path815"
				d="M 100,0 A 100,100 0 0 1 50,86.659274 100,100 0 0 1 -50,86.488739 100,100 0 0 1 -100,0"

				type="arc"
				start="0"
				end="3.1415927"
				ry="100"
				open="true"
				rx="100"
				cy="0"
				cx="0"
				transform="
					rotate(${controls.ringRotation + 180} 0 0)
					skewX(${controls.skew})
					scale(${s})
				"
				/>

		`
	}
	tmp += '</g>'
	svg.innerHTML += tmp;

}
