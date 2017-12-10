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

function draw_circles(name, blocks, styling){
	var tmp = svg.append("g")
		.attr("id", name);

	blocks.forEach(function(d){
		tmp.append("circle")
			.data([d])
			.attr("cx", function(d){ return d.cx })
			.attr("cy", function(d){ return d.cy })
			.attr("r", function(d){ return d.r })
			.attr("fill", function(d){ return (d.fill || styling.fill || 'black') })
			.attr("stroke", function(d){ return (d.fill || styling.fill || 'black') })
	})
}
