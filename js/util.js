// Adapt to viewport
var width = $('article.post').width();
// These plots are mostly a 1:1 ratio.
var height = width;

// Setup the SVG object on the page
function _prep_svg(){
	var svg = d3.select("#plots").append('svg')
		.attr("width", width)
		.attr("height", height);
	return svg;
}

// Setup various objects needed by all the plot functions
function _prep_plot(){
	return [x, y, area];
}

function getRandomArbitrary(min, max) {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
	return Math.random() * (max - min) + min;
}

function getRandomPointInCircle(radius){
	var t = 2 * Math.PI * Math.random(),
		u = Math.random() + Math.random(),
		r = null;

	if(u > 1){
		r = 2 - u;
	} else {
		r = u;
	}
	return [
		Math.round(radius * r * Math.cos(t)),
		Math.round(radius * r * Math.sin(t))
	];
}

function rad2deg(rad){
	return rad * (180 / Math.PI);
}

function deg2rad(deg){
	return deg * (Math.PI / 180);
}
