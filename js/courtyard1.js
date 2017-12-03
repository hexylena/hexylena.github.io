// Adapt to viewport
var width = $('article.post').width();
var height = width / 1;

bw = 30;
sw = 40;
blkstrt = bw + sw;
blkwidth = width - 2 * (bw + sw);
blkheight = height - 2 * (bw + sw);
max_y = Math.round(blkheight * 0.3 / 10)
max_x = Math.round(blkwidth * 0.3 / 10)
max_min = 0.7;
max_max = 1.1;



var svg = d3.select("#courtyard1").append('svg')
	.attr("width", width)
	.attr("height", height);


function flattenArray(a){
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
	return a.reduce(
		( acc, cur ) => acc.concat(cur),
		[]
	);
}

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

function maxA(arr){
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	return arr.reduce(function(a, b) {
		return Math.max(a, b);
	})
}

function minA(arr){
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
	return arr.reduce(function(a, b) {
		return Math.min(a, b);
	})
}


// Draw the city block.
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
			.attr("fill", function(d){ return (d.length > 4 ? d[4].fill : null) || styling.fill || 'black' })
			.attr("stroke", function(d){ return (d.length > 4 ? d[4].stroke : null) || styling.stroke || 'red' })
	})
}

draw_rects('surrounding', surrounding, {'fill': '#ccc', 'stroke': '#333'});
draw_rects('street', streets, {'fill': '#999', 'stroke': 'none'});

workspace = [
	[blkstrt, blkstrt, blkwidth, blkheight]
]
draw_rects('current_block', workspace, {'fill': '#fff', 'stroke': 'black'});


if(blkwidth / blkheight > 2) { max_x *= 2; }
if(blkwidth / blkheight < 0.5) { max_y *= 2; }


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

function findLargestHouseIdx(houses) {
	var idx_x = -1,
		idx_y = -1,
		largest_x = -1,
		largest_y = -1;

	houses.forEach(function(h, idx){
		var len_x = h[2];
		var len_y = h[3];

		if(len_x > largest_x){
			largest_x = len_x;
			idx_x = idx;
		}

		if(len_y > largest_y){
			largest_y = len_y;
			idx_y = idx;
		}
	})

	return [idx_x, idx_y];
}

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

function getSplit(segment){
	var segment_length = segment[1] - segment[0];
	var bound = 0.2;
	var split_x = getRandomArbitrary(
		bound * segment_length,
		(1 - bound) * segment_length,
	);
	return split_x
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

function newSegments(segments, idx, split_dist){
	var new_segments = splitSegment(segments[idx], split_dist);
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
	return replace;
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
		split_dist = getSplit(segments[segment_idx]);
		// Putative split
		split_a = [segments[segment_idx][0], segments[segment_idx][0] + split_dist];
		split_b = [segments[segment_idx][0] + split_dist, segments[segment_idx][1]];

		// If either segment is too small, we quit + retry
		if(
			split_a[1] - split_a[0] < 0.8 * min_size ||
			split_b[1] - split_b[0] < 0.8 * min_size
		){
			//console.log('Bad segment', new_segments[0][1] - new_segments[0][0], new_segments[1][1] - new_segments[1][0]);
			continue;
		}

		replace = newSegments(segments, segment_idx, split_dist);
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
		{'side': 'top'}
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
		{'side': 'bottom'}
	]);

	x_off = x_off + house_len;
});


bsp_max = Math.min(a, d);
bsp_min = 0.8 * bsp_max;

// left row of houses
var y_off = blkstrt + b;
bsp(blkheight - c - b, bsp_min, bsp_max).forEach(function(segment){
	house_len = segment[1] - segment[0];
	houses.push([
		blkstrt, // x
		y_off, // y
		Math.min(house_len, bsp_max),
		house_len,
		{'side': 'left'}
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
		{'side': 'right'}
	]);
	y_off = y_off + house_len;
});

// Usable internal space:
side_l = Math.max(a, d) + 10;
side_r = blkwidth - Math.max(g, e) - 10;

side_t = Math.max(b, h) + 10;
side_b = blkheight - Math.max(c, f) - 10;
//console.log(side_l, side_r, side_t, side_b);

// Let's add a doorway / gate
h_t = houses.filter(function(house){ return house[4].side == 'top'; });
h_l = houses.filter(function(house){ return house[4].side == 'left'; });
h_r = houses.filter(function(house){ return house[4].side == 'right'; });
h_b = houses.filter(function(house){ return house[4].side == 'bottom'; });

//side_t = 20 + maxA(h_t.map(function(h){ return h[3]; }));
//side_l = 20 + maxA(h_l.map(function(h){ return h[0] + h[2] - blkstrt; }));
//side_r = - 20 + minA(h_r.map(function(h){ return h[0] - blkstrt; }));
//side_b = - 20 + minA(h_b.map(function(h){ return h[1] - blkstrt; }));

side_t = 20 + maxA(h_t.map(function(h){ return h[3]; }));
side_l = 20 + maxA(h_l.map(function(h){ return h[0] + h[2] - blkstrt; }));
side_r = - 20 + minA(h_r.map(function(h){ return h[0] - blkstrt; }));
side_b = - 20 + minA(h_b.map(function(h){ return h[1] - blkstrt; }));

side_t = Math.max(b, h) + 10;
side_l = Math.max(a, d) + 10;
side_r = blkwidth - Math.max(g, e) - 10;
side_b = blkheight - Math.max(c, f) - 10;

// Pick a big one.
var [large_w_t, large_h_t] = findLargestHouseIdx(h_t)
var [large_w_l, large_h_l] = findLargestHouseIdx(h_l)
var [large_w_r, large_h_r] = findLargestHouseIdx(h_r)
var [large_w_b, large_h_b] = findLargestHouseIdx(h_b)

h_t = h_t.map(function(house, hidx){
	if(hidx == large_w_t){
		house[2] -= 10;
		return [house, [
			house[0] + house[2],
			house[1],
			10,
			20,
			{"side": "top", "fill": "rgba(50,50,255,0.3)", "stroke": "rgba(50,50,255,0.9)" }
		]]
	}
	return [house]
})

h_l = h_l.map(function(house, hidx){
	if(hidx == large_w_l){
		house[3] -= 10;
		return [house, [
			house[0],
			house[1] + house[3],
			20,
			10,
			{"side": "left", "fill": "rgba(50,50,255,0.3)", "stroke": "rgba(50,50,255,0.9)" }
		]]
	}
	return [house]
})

h_b = h_b.map(function(house, hidx){
	if(hidx == large_w_b){
		house[2] -= 10;
		return [house, [
			house[0] + house[2],
			house[1] + house[3] - 20,
			10,
			20,
			{"side": "bottom", "fill": "rgba(50,50,255,0.3)", "stroke": "rgba(50,50,255,0.9)" }
		]]
	}
	return [house]
})

h_r = h_r.map(function(house, hidx){
	if(hidx == large_w_r){
		house[3] -= 10;
		return [house, [
			house[0] + house[2] - 20,
			house[1] + house[3],
			20,
			10,
			{"side": "right", "fill": "rgba(50,50,255,0.3)", "stroke": "rgba(50,50,255,0.9)" }
		]]
	}
	return [house]
})

houses = flattenArray(h_t)
	.concat(flattenArray(h_l))
	.concat(flattenArray(h_b))
	.concat(flattenArray(h_r));

draw_rects('houses', houses, {'fill': '#88f', 'stroke': '#009'});
draw_rects('usable', [[
	blkstrt + side_l,
	blkstrt + side_t,
	side_r - side_l,
	side_b - side_t,
	{'fill': 'rgba(255, 0, 0, 0.1)'}
]], {'fill': 'none', 'stroke': '#f8f'})
