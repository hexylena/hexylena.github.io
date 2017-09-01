---
layout: post
Description: "Thoughts / blog / progress on Redeclipse Map generation"
Tags:
- dev
- personal
date: 2017-01-07T12:54:53Z
title: RedEclipse Map Generation
draft: true
#repo: erasche/redeclipse-maps
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.1/d3.min.js" integrity="sha256-4mL8TQfOJSbg0f42dQw5cKLl2ngQXUSXqfQnvK11M44=" crossorigin="anonymous"></script>
<script src="/js/controls.js"></script>


<svg id="ex1" width="624" height="200"></svg>

<script type="text/javascript">

var svg = d3.select("#ex1"),
    radius = 18;

// var obj = { position: [100, 50] };
// var circle = cartesian(ref(obj, 'x'), ref(obj, 'y'));

/*
var obj = {x: 0, y: 0};
var circle = cartesian(
    Model.ref(obj, 'x')
       .clamped(0, 19)
       .rounded()
       .multiply(30)
       .add(20),
    Model.ref(obj, 'y')
       .clamped(0, 3)
       .rounded()
       .multiply(20)
       .add(20)
);
*/

var obj2 = {radius: 0, angle: 0};

var radial = polar(
    Model.ref(obj2, 'radius')
        .clamped(0, 4)
        .rounded()
        .multiply(15)
    ,
    Model.ref(obj2, 'angle')
        .multiply(1/360)
        .multiply(5).rounded().multiply(1/5)
        .multiply(2*Math.PI)
)
.offset([100, 100]);


svg.selectAll("circle")
  .data([radial])
  .enter().append("circle")
    .attr("cx", function(d) { return d.cx(); })
    .attr("cy", function(d) { return d.cy(); })
    .attr("r", radius)
    .style("stroke", "#000000")
    .style("stroke-width", "1")
    .style("fill", "#5eb95e")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));
</script>
