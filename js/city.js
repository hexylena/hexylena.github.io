// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = $("article.post").width();
var svg = document.getElementById("plot");

var controlSettings = function() {
	this.width = 60;
	this.depth = 40;

	this.seed = 0;
};

function addCircle(color) {
	//return `<circle fill="${fill}" cx="${cx}" cy="${cy}" r="${r}" />`
	return drawCircle(color, width * 0.35, hashCode(color));
}

var controls = new controlSettings();
render();
var gui = new dat.GUI();

gui.add(controls, "width", 20, 200).onChange(render);
gui.add(controls, "depth", 20, 200).onChange(render);
gui.add(controls, "seed", 1, 200).onChange(render);

function looper(fn) {
	//for (y = -10; y < width / controls.width; y++) {
	//for (x = -1; x < width / controls.width; x++) {
	for (y = -3; y < width / controls.width; y++) {
		for (x = -1; x < width / controls.width; x++) {
			//if (y + x + y + y > 26) {
			if (y + x + y + y > 26) {
				// too far below
				//} else if ( y + y + y +x < 2 ){
			} else if (y + y + y + x < 0) {
				// above
			} else {
				// just right
				fn();
			}
		}
	}
}

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

	looper(function() {
		xi = x * controls.width;
		yi = 3 * y * controls.depth + (x * controls.depth) / 2;
		w = controls.width;
		h = controls.depth;
		q = parseInt(3 * random());

		// building height
		randomSetSeed(controls.seed + x * 100 + y * 10);
		r = random();
		if (r < 0.7) {
			bh = 50 * 2;
		} else if (r < 0.8) {
			bh = 50 * 3;
		} else if (r < 0.9) {
			bh = 50 * 4;
		} else if (r < 0.9) {
			bh = 50 * 5;
		} else if (r < 0.95) {
			bh = 50 * 7;
		} else if (r < 0.99) {
			bh = 50 * 9;
		}

		if (q === 0) {
			// Wall
			svg.innerHTML += `
				<polygon points="
				${xi},${yi}
				${xi},${yi - bh}
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				" style="fill:#ffffff;stroke-width:1;stroke:black" />
			`;
			svg.innerHTML += `
				<polygon points="
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				${xi + w + w},${yi}
				${xi + w + w},${yi - bh}
				" style="fill:white" />
				<polygon points="
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				${xi + w + w},${yi}
				${xi + w + w},${yi - bh}
				" style="fill:url(#diagonalHatch);stroke-width:1;stroke:black" />
			`;
		} else if (q === 1) {
			svg.innerHTML += `
				<polygon points="
				${xi},${yi}
				${xi},${yi - bh}
				${xi + w / 2},${yi - bh - h / 2}
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				" style="fill:#ffffff;stroke-width:1;stroke:black" />
			`;
			svg.innerHTML += `

				<polygon points="
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				${xi + w + w},${yi}
				${xi + w + w},${yi - bh}
				" style="fill:white" />
				<polygon points="
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				${xi + w + w},${yi}
				${xi + w + w},${yi - bh}
				" style="fill:url(#diagonalHatch);stroke-width:1;stroke:black" />
			`;
		} else if (q === 2) {
			svg.innerHTML += `
				<polygon points="
				${xi},${yi}
				${xi},${yi - bh}
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				" style="fill:#ffffff;stroke-width:1;stroke:black" />
			`;
			svg.innerHTML += `
				<polygon points="
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				${xi + w + w},${yi}
				${xi + w + w},${yi - bh}
				${xi + w + w / 2},${yi - bh - h / 2}
				" style="fill:white" />
				<polygon points="
				${xi + w},${yi - bh + h / 2}
				${xi + w},${yi + h / 2}
				${xi + w + w},${yi}
				${xi + w + w},${yi - bh}
				${xi + w + w / 2},${yi - bh - h / 2}
				" style="fill:url(#diagonalHatch);stroke-width:1;stroke:black" />
			`;
		}

		// left wall windows
		for (var i = 0; i < bh; i += 50) {
			if (random() < 0.7) {
				svg.innerHTML += `
					<polygon points="
					${xi + 5 * (w / 8)},${yi - i + 4 * (h / 16) - 20}
					${xi + 7 * (w / 8)},${yi - i + 6 * (h / 16) - 20}
					${xi + 7 * (w / 8)},${yi - i + 6 * (h / 16) - 36}
					${xi + 5 * (w / 8)},${yi - i + 4 * (h / 16) - 36}
					" style="fill:white;stroke-width:1;stroke:black" />
				`;
			}
			if (random() < 0.7) {
				svg.innerHTML += `
					<polygon points="
					${xi + 1 * (w / 8)},${yi - i + 0 * (h / 16) - 20}
					${xi + 3 * (w / 8)},${yi - i + 2 * (h / 16) - 20}
					${xi + 3 * (w / 8)},${yi - i + 2 * (h / 16) - 36}
					${xi + 1 * (w / 8)},${yi - i + 0 * (h / 16) - 36}
					" style="fill:white;stroke-width:1;stroke:black" />
				`;
			}
		}

		// right wall windows
		for (var i = 0; i < bh; i += 50) {
			if (random() < 0.7) {
				svg.innerHTML += `
					<polygon points="
					${xi + w + 5 * (w / 8)},${yi - i + 2 * (h / 16) - 20}
					${xi + w + 7 * (w / 8)},${yi - i + 0 * (h / 16) - 20}
					${xi + w + 7 * (w / 8)},${yi - i + 0 * (h / 16) - 36}
					${xi + w + 5 * (w / 8)},${yi - i + 2 * (h / 16) - 36}
					" style="fill:none;stroke-width:1;stroke:black" />
				`;
			}
			if (random() < 0.7) {
				svg.innerHTML += `
					<polygon points="
					${xi + w + 1 * (w / 8)},${yi - i + 6 * (h / 16) - 36}
					${xi + w + 3 * (w / 8)},${yi - i + 4 * (h / 16) - 36}
					${xi + w + 3 * (w / 8)},${yi - i + 4 * (h / 16) - 20}
					${xi + w + 1 * (w / 8)},${yi - i + 6 * (h / 16) - 20}
					" style="fill:none;stroke-width:1;stroke:black" />
				`;
			}
		}

		// Roof
		if (q === 0) {
			// Flat
			svg.innerHTML += `
				<polygon points="${xi},${yi - bh} ${xi + w},${yi + h / 2 - bh} ${xi + w + w},${yi - bh} ${xi + w},${yi -
				h / 2 -
				bh}" style="fill:#ffffff;stroke-width:1;stroke:black" />
			`;
		} else if (q === 1) {
			// two point sw/ne

			svg.innerHTML += `
				<polygon points="
				${xi + w + w / 2},${yi - bh - h}
				${xi + w + w},${yi - bh}
				${xi + w},${yi + h / 2 - bh}
				${xi + w / 2},${yi - bh - h / 2}
				" style="fill:white" />
				<polygon points="
				${xi + w + w / 2},${yi - bh - h}
				${xi + w + w},${yi - bh}
				${xi + w},${yi + h / 2 - bh}
				${xi + w / 2},${yi - bh - h / 2}
				" style="fill:url(#diagonalHatch);stroke-width:1;stroke:black" />
			`;
		} else if (q === 2) {
			// two point sw/ne

			svg.innerHTML += `
				<polygon points="
				${xi + w / 2},${yi - bh - h}
				${xi + w + w / 2},${yi - bh - h / 2}
				${xi + w},${yi - bh + h / 2}
				${xi},${yi - bh}
				" style="fill:#ffffff;stroke-width:1;stroke:black" />
			`;
		}
	});
}
