// Adapt to viewport
var width = $('article.post').width() / 2;
var height = width / 1;

bw = 20;

var svg = d3.select("#courtyard1").append('svg')
	.attr("width", width)
	.attr("height", height);


walkways = [
	[width / 2 - (bw / 2), 0, bw, height],
	[0, height / 2 - (bw / 2), width, bw]
]


trees = [];
for(var i = 0; i < width / 16; i++){
	for(var j = 0; j < height / 16; j++){
		tree_radius = getRandomArbitrary(width / 80, width / 20);
		cx = i * 16;
		cy = j * 16;

		// heck if the trees overlap any others.
		touching = trees.map(function(t){
			return Math.pow(t.cx - cx, 2) +
					Math.pow(t.cy - cy, 2) <= Math.pow(t.r + tree_radius, 2)
		});

		// or if touching paths.
		avoid = 14;
		// TODO: more generic?
		touching_paths =
			(cx >= (width / 2 - (bw / 2) - avoid)) && (cx <= (width / 2 + (bw / 2) + avoid)) ||
			(cy >= (height / 2 - (bw / 2) - avoid)) && (cy <= (height / 2 + (bw / 2) + avoid));

		if(!touching.some(function(x){ return x; }) && !touching_paths){
			trees.push({
				cx: cx,
				cy: cy,
				r: Math.max(tree_radius / 3, 4),
				fill: '#8a0808',
			});
			trees.push({
				cx: cx,
				cy: cy,
				r: tree_radius
			});
		}
	}
}

// Let's add some paths
draw_rects('walkways', walkways, {'fill': 'grey', 'stroke': 'black'});
draw_circles('trees', trees, {'fill': 'rgba(0, 200, 0, 0.9)', 'stroke': '#3a3'});
