// Adapt to viewport
var width = $('article.post').width() / 2;
var height = width / 1;

bw = 30;
sw = 40;
blkstrt = bw + sw;
blkwidth = width - 2 * (bw + sw);
blkheight = height - 2 * (bw + sw);

var svg = d3.select("#courtyard1").append('svg')
	.attr("width", width)
	.attr("height", height);


// Forest style.

trees = [];
for(var i = 0; i < 80; i++){
	tree_radius = getRandomArbitrary(width / 80, width / 20);
	cx = getRandomArbitrary(tree_radius, width - tree_radius);
	cy = getRandomArbitrary(tree_radius, width - tree_radius);

	// heck if the trees overlap any others.
	touching = trees.map(function(t){
		return Math.pow(t.cx - cx, 2) +
				Math.pow(t.cy - cy, 2) <= Math.pow(t.r + tree_radius, 2)
	});
	if(!touching.some(function(x){ return x; })){
		trees.push({
			cx: cx,
			cy: cy,
			r: tree_radius / 3,
			fill: '#8a0808',
		});
		trees.push({
			cx: cx,
			cy: cy,
			r: tree_radius
		});
	}

}

draw_circles('trees', trees, {'fill': 'rgba(0, 200, 0, 0.9)', 'stroke': '#3a3'});
