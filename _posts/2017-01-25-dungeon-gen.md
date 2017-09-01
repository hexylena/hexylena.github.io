---
layout: post
Tags:
- gamedev
- mapgen
date: 2017-01-25T02:07:15Z
title: Dungeon Generation

---

<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.1/d3.min.js" integrity="sha256-4mL8TQfOJSbg0f42dQw5cKLl2ngQXUSXqfQnvK11M44=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

Found [this](http://www.gamasutra.com/blogs/AAdonaac/20150903/252889/Procedural_Dungeon_Generation_Algorithm.php)
blog post, so we're going to re-implement that in JS as well. This looks very
promising for building rooms/dungeons for red-eclipse.

<div id="plots">
</div>

<script src="/js/bboxCollide.js"></script>
<script type="text/javascript">
// Adapt to viewport
var width = $('section.post').width();
// These plots are mostly a 1:1 ratio.
var height = width;

var width = 400;
var height = 400;

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

// And lastly fully imitate the original.
var svg = _prep_svg();

var rectangles = [];

var x = d3.scaleLinear().range([-width / 2, width/2]),
	y = d3.scaleLinear().range([-height / 2, height/2]);


function rad2deg(rad){
	return rad * (180 / Math.PI);
}


for(var i = 0; i < 15; i++){
	var [x, y] = getRandomPointInCircle(128);
	var w = Math.round(getRandomArbitrary(20, 85));
	var h = Math.round(getRandomArbitrary(20, 85));
	var node = {
		x: x - w / 2,
		y: y - h / 2,
		cx: x,
		cy: y,
		w: w,
		h: h,
		theta: Math.atan2(x, y),
	};
	rectangles.push(node);
}

var main = svg.append('g').attr('transform', 'translate(200, 200)');

function update(){
	main.selectAll('g')
	.data(rectangles)
	.enter()
		.append('rect')
		.attr("x", function(d){ return d.x})
		.attr("y", function(d){ return d.y})
		.attr("width", function(d){ return d.w})
		.attr("height", function(d){ return d.h})
		.attr("stroke", "black")
		.attr("fill", "red");
}

function centerToCentroid(rect){
	//console.log(rect);
}


function intersect(a, b) {
	return (
		a.x <= b.x + b.width &&
		b.x <= a.x + a.width &&
		a.y <= b.y + b.height &&
		b.y <= a.y + a.height
	)
}

function tick(){
	for(var i = 0; i < rectangles.length; i++){
		rectangles[i].x += 10;
		//for(var j = 0; j < rectangles.length; j++){
		//	console.log(intersect(rectangles[i], rectangles[j]))
		//}
	}
}
tick();
update();




</script>
