---
Tags:
- dev
- mapgen
date: 2017-01-22T01:29:05Z
title: Bitesofcode's Terrain Generation

---

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.1/d3.min.js" integrity="sha256-4mL8TQfOJSbg0f42dQw5cKLl2ngQXUSXqfQnvK11M44=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

Found [this](https://bitesofcode.wordpress.com/2016/12/23/landscape-generation-using-midpoint-displacement/) blog post and enjoyed the graphics. Re-implementing in JS for a learning exercise.

I started this post with the idea of doing fancy controls but... meh. No time for this, so you just get pretty pictures.

<div id="plots">
</div>

<script src="/js/bitesofcode.js"></script>

And here's my code:

{{< highlight javascript "style=friendly" >}}
// Adapt to viewport
var width = $('section.post').width(),
	height = 500

// Color function borrowed from original post
function color(idx){
	var colors = [
		[195, 157, 224],
		[158, 98, 204],
		[130, 79, 138],
		[68, 28, 99],
		[49, 7, 82],
		[23, 3, 38],
		[240, 203, 163]
	];
	return 'rgb(' + colors[idx][0] + ',' + colors[idx][1] + ',' +colors[idx][2] + ')';
}

// Setup the SVG object on the page
function _prep_svg(){
	var svg = d3.select("#plots").append('svg')
		.attr("width", width)
		.attr("height", height);
	return svg;
}

// Setup various objects needed by all the plot functions
function _prep_plot(){
	var x = d3.scaleLinear().range([0, width]),
		y = d3.scaleLinear().range([height, 0]);

	x.domain([0, 256]);
	y.domain([0, height]);

	var area = d3.area()
		.x(function(d) { return x(d[0]);  })
		.y0(height)
		.y1(function(d) { return y(d[1]);  });

	return [x, y, area];
}

// Plot a single data series
function plot(data){
	plot_multi([
		{
			data: data,
			color: 'gray',
		}
	])
};

// Plot more than one data series
function plot_multi(data_arr, svg){
	// arr of
	// {data: data, color: color}

	// Get our components
	if(svg === undefined){
		svg = _prep_svg();
	}
	var [x, y, area] = _prep_plot();

	// For each {data: data, color: color} in the data_arr, append an SVG path element.
	data_arr.forEach(function(d){
		svg.append("path")
			.data([d.data])
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", d.color);
	})
	// Return the SVG in case we want to re-use it.
	return svg;
};

function getRandomArbitrary(min, max) {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	return Math.random() * (max - min) + min;
}

// Midpoint displacement algorithm, completely copied from bitesofcode website.
function midpoint_displacement(start, end, roughness, vertical_displacement, num_of_iterations){
	if(vertical_displacement !== undefined){
		vertical_displacement = (start + end) / 2;
	}
	if(num_of_iterations === undefined){
		num_of_iterations = 16;
	}

	points = [start, end];
	var iteration = 1;
	while(iteration <= num_of_iterations) {
		var new_points = [];
		for(var i = 0; i < points.length - 1; i++){
			// Get the bounding points
			var left = points[i];
			var right = points[i + 1];
			// Average for new midpoint
			var midpoint = (left + right) / 2;
			// Apply displacement
			midpoint += getRandomArbitrary(-vertical_displacement, vertical_displacement);
			new_points.push(left);
			new_points.push(midpoint);
		}
		// Include the last 'right' since it wasn't caught before.
		new_points.push(points[points.length - 1]);
		// Replace points
		points = new_points;
		// Smooth out vertical displacement
		vertical_displacement = Math.pow(2, -roughness) * vertical_displacement;
		iteration++;
	}

	// Convert [10, 20, 10] to [[0, 10], [128, 20], [256, 10]]
	var num_points = points.length - 1;
	return points.map(function(x, i){
		return [256 * i / num_points, x];
	});
};

// Try out a test plot
points = midpoint_displacement(150, 200, 1.4, 20, 8);
plot(points);

// Now try a more complex one
plot_multi([
	{
		data: midpoint_displacement(450, 420, 0.9, 250, 8),
		color: color(5),
	},
	{
		data: midpoint_displacement(350, 320, 1.0, 250, 8),
		color: color(4),
	},
	{
		data: midpoint_displacement(260, 320, 0.9, 250, 8),
		color: color(3),
	},
	{
		data: midpoint_displacement(200, 190, 1, 120, 9),
		color: color(2),
	},
	{
		data: midpoint_displacement(100, 80, 1.2, 30, 12),
		color: color(1),
	},
	{
		data: midpoint_displacement(0, 100, 1.4, 20, 12),
		color: color(0),
	},
]);

// And lastly fully imitate the original.
var svg = _prep_svg();

svg.append("rect")
	.attr("x", 0)
	.attr("y", 0)
	.attr("width", width)
	.attr("height", height)
	.attr("fill", color(6));

// sun
svg.append("ellipse")
	.attr("cx", 50)
	.attr("cy", 50)
	.attr("rx", 25)
	.attr("ry", 25)
	.attr("fill", "white");

// Layers
plot_multi([
	{ data: midpoint_displacement(350, 320, 0.9, 250, 8),    color: color(0)},
	{ data: midpoint_displacement(270, 190, 1, 120, 9),      color: color(1)},
	{ data: midpoint_displacement(180, 80, 1.2, 30, 12),     color: color(2)},
	{ data: midpoint_displacement(250, 200, 1.4, 20, 12),    color: color(3)},
], svg);

{{< /highlight >}}
