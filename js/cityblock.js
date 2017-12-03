// Adapt to viewport
var width = $('article.post').width();
var height = width / 1.5;

function getRandomArbitrary(min, max) {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	return Math.random() * (max - min) + min;
}

function getRandomInteger(min, max) {
	// Inclusive of boundaries
	return Math.round(getRandomArbitrary(min, max))
}

function choice(choices) {
	var index = Math.floor(Math.random() * choices.length);
	return choices[index];
}


var svg = d3.select("#cityblock").append('svg')
	.attr("width", width)
	.attr("height", height);

// Draw the city block.
bw = 30;
sw = 40;
// Surrounding blocks are just showing that other blocks
// could be there.
surrounding = [
	// Corner pieces
	[0, 0, bw, bw],
	[width - bw, 0, bw, bw],
	[width - bw, height - bw, bw, bw],
	[0, height - bw, bw, bw],

	// Edge pieces
	[bw + sw, 0, width - 2 * (bw + sw), bw],
	[bw + sw, height - bw, width - 2 * (bw + sw), bw],

	[0, bw + sw, bw, height - 2 * (bw + sw)],
	[width - bw, bw + sw, bw, height - 2 * (bw + sw)],
]

streets = [
	// Roads on each side.
	[bw, 0, sw, height],
	[0, bw, width, sw],
	[0, height - bw - sw, width, sw],
	[width - bw - sw, 0, sw, height],
]

blkstrt = bw + sw;
blkwidth = width - 2 * (bw + sw);
blkheight = height - 2 * (bw + sw);

function draw_rects(name, blocks, styling){
	var tmp = svg.append("g")
		.attr("id", name);

	blocks.forEach(function(d){
		tmp.append("rect")
			.data([d])
			.attr("x", function(d){ return d[0] })
			.attr("y", function(d){ return d[1] })
			.attr("width", function(d){ return d[2] })
			.attr("height", function(d){ return d[3] })
			.attr("fill", function(d){ return styling.fill || 'black' })
			.attr("stroke", function(d){ return styling.stroke || 'red' })
	})

}

draw_rects('surrounding', surrounding, {'fill': '#ccc', 'stroke': '#333'});
draw_rects('street', streets, {'fill': '#999', 'stroke': 'none'});

workspace = [
	[blkstrt, blkstrt, blkwidth, blkheight]
]
draw_rects('current_block', workspace, {'fill': '#fff', 'stroke': 'black'});


max_y = Math.round(blkheight * 0.3 / 10)
max_x = Math.round(blkwidth * 0.3 / 10)
if(blkwidth / blkheight > 2) { max_x *= 2; }
if(blkwidth / blkheight < 0.5) { max_y *= 2; }

max_min = 0.7;
max_max = 1.1;

// Let's try placing some anchor rooms in each corner.
var a = 10 * getRandomInteger(max_min * max_x, max_max * max_x),
	b = 10 * getRandomInteger(max_min * max_y, max_max * max_y),
	c = 10 * getRandomInteger(max_min * max_y, max_max * max_y),
	d = 10 * getRandomInteger(max_min * max_x, max_max * max_x),
	e = 10 * getRandomInteger(max_min * max_x, max_max * max_x),
	f = 10 * getRandomInteger(max_min * max_y, max_max * max_y),
	g = 10 * getRandomInteger(max_min * max_x, max_max * max_x),
	h = 10 * getRandomInteger(max_min * max_y, max_max * max_y);

anchor_houses = [
	//top left
	[blkstrt, blkstrt, a, b],
	// top right
	[blkstrt + blkwidth - g, blkstrt, g, h],
	//bottom left
	[blkstrt, blkstrt + blkheight - c, d, c],
	// bottom right
	[blkstrt + blkwidth - e, blkstrt + blkheight - f, e, f],
];

draw_rects('anchor', anchor_houses, {'fill': '#f55', 'stroke': '#800'});

function findLargestIdx(segments) {
	var idx = -1, largest = -1;
	for(var i = 0; i < segments.length; i++){
		var len = segments[i][1] - segments[i][0];
		if(len > largest){
			idx = i;
			largest = len;
		}
	}
	return idx
}

function splitSegment(segment){
	var segment_length = segment[1] - segment[0];
	var bound = 0.2;
	var split_x = getRandomArbitrary(
		bound * segment_length,
		(1 - bound) * segment_length,
	);
	return [
		[segment[0], segment[0] + split_x],
		[segment[0] + split_x, segment[1]]
	]
}
// given some boundaries, do BSP with a min_size.
function bsp(length, min_size, max_size){
	segments = [[0, length]];
	var q = 0;
	while(1){
		q++;
		// Prevent infinite loops
		if(q > 10){ break; }

		// DEBUG
		//for(var i = 0; i < segments.length; i++){
			//console.log('Segment ', i, Math.round(segments[i][0]), Math.round(segments[i][1]), 'length', Math.round(segments[i][1]) - Math.round(segments[i][0]));
		//}

		// Check conditions, if all segments within size, then we exit.
		if(segments.every(function(x){
			seg_len = x[1] - x[0];
			cond_a = seg_len > 0.8 * min_size;
			cond_b = seg_len < 1.1 * max_size;
			//console.log('done?', cond_a && cond_b);
			return cond_a && cond_b
		})){
			break;
		}
		// Find the largest idx.

		segment_idx = findLargestIdx(segments);
		new_segments = splitSegment(segments[segment_idx]);

		// If either segment is too small, we quit + retry
		if(
			new_segments[0][1] - new_segments[0][0] < 0.8 * min_size ||
			new_segments[1][1] - new_segments[1][0] < 0.8 * min_size
		){
			//console.log('Bad segment', new_segments[0][1] - new_segments[0][0], new_segments[1][1] - new_segments[1][0]);
			continue;
		}

		// otherwise, we splice the segments list back together.
		replace = [];
		// Prior
		for(var i = 0; i < segment_idx; i++){
			replace.push(segments[i]);
		}
		// New
		replace.push(new_segments[0]);
		replace.push(new_segments[1]);
		// Post
		for(var i = segment_idx + 1; i < segments.length; i++){
			replace.push(segments[i]);
		}
		segments = replace;
	}
	return segments
}

// All houses
houses = []

// BSP Boundaries.
bsp_max = Math.min(b, h);
bsp_min = 0.8 * bsp_max;

// top row of houses
var x_off = blkstrt + a;
bsp(blkwidth - g - a, bsp_min, bsp_max).forEach(function(segment){
	house_len = segment[1] - segment[0];
	houses.push([
		x_off, // x
		blkstrt, // y
		house_len,
		Math.min(house_len, bsp_max),
	]);
	x_off = x_off + house_len;
});


bsp_max = Math.min(c, f);
bsp_min = 0.8 * bsp_max;

var x_off = blkstrt + d;
bsp(blkwidth - d - e, bsp_min, bsp_max).forEach(function(segment){
	house_len = segment[1] - segment[0];
	houses.push([
		x_off, // x
		blkstrt + blkheight - Math.min(house_len, bsp_max), // y
		house_len,
		Math.min(house_len, bsp_max),
	]);

	x_off = x_off + house_len;
});


bsp_max = Math.min(a, d);
bsp_min = 0.8 * bsp_max;

// top row of houses
var y_off = blkstrt + b;
bsp(blkheight - c - b, bsp_min, bsp_max).forEach(function(segment){
	house_len = segment[1] - segment[0];
	houses.push([
		blkstrt, // x
		y_off, // y
		Math.min(house_len, bsp_max),
		house_len,
	]);
	y_off = y_off + house_len;
});


bsp_max = Math.min(g, e);
bsp_min = 0.8 * bsp_max;

// top row of houses
var y_off = blkstrt + h;
bsp(blkheight - h - f, bsp_min, bsp_max).forEach(function(segment){
	house_len = segment[1] - segment[0];
	houses.push([
		blkstrt + blkwidth - Math.min(house_len, bsp_max), // x
		y_off, // y
		Math.min(house_len, bsp_max),
		house_len,
	]);
	y_off = y_off + house_len;
});

draw_rects('houses', houses, {'fill': '#88f', 'stroke': '#009'});
