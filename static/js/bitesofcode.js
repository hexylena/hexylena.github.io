var width = $('section.post').width(),
	height = 500

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

function _prep_plot(){
	var svg = d3.select("#plots").append('svg')
		.attr("width", width)
		.attr("height", height);

	var x = d3.scaleLinear().range([0, width]),
		y = d3.scaleLinear().range([height, 0]);

	x.domain([0, 256]);
	y.domain([0, height]);

	var area = d3.area()
		.x(function(d) { return x(d[0]);  })
		.y0(height)
		.y1(function(d) { return y(d[1]);  });

	return [svg, x, y, area];
}

function plot(data){
	var [svg, x, y, area] = _prep_plot();

	svg.append("path")
		.data([points])
		.attr("class", "area")
		.attr("d", area);
};

function plot_multi(data_arr){
	// arr of
	// {data: data, color: color}
	var [svg, x, y, area] = _prep_plot();

	data_arr.forEach(function(d){
		svg.append("path")
			.data([d.data])
			.attr("class", "area")
			.attr("d", area)
			.attr("fill", d.color);
	})
};

function getRandomArbitrary(min, max) {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	return Math.random() * (max - min) + min;
}


function midpoint_displacement(start, end, roughness, vertical_displacement, num_of_iterations){
	console.log(start, end, roughness, vertical_displacement, num_of_iterations);
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

			if(i == points.length - 2){
				new_points.push(right);
			}
		}
		points = new_points;
		vertical_displacement = Math.pow(2, -roughness) * vertical_displacement;
		iteration++;
	}

	var num_points = points.length;
	return points.map(function(x, i){
		return [256 * i / num_points, x];
	});
};

points = midpoint_displacement(150, 200, 1.4, 20, 8);
plot(points);

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
