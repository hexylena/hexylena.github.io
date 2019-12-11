// Author: Helena Rasche (@erasche)
// License: AGPLv3
var width = $('article.post').width();
var svg = document.getElementById('plot');

var sampleText = function() {
	this.baseFrequency = 0.05;
	this.numOctaves = 2;
	this.type = 'turbulence';
	this.scale = 82;
	this.separation = 10;
	this.blendMode = 'multiply';
};



var text = new sampleText();
render();
var gui = new dat.GUI();
gui.add(text, 'baseFrequency', 0, 0.3).onChange(render);
gui.add(text, 'numOctaves', 0, 10).step(1).onChange(render);
gui.add(text, 'scale',   0, 400).onChange(render);
gui.add(text, 'type',   ['fractalNoise', 'turbulence']).onChange(render);
gui.add(text, 'separation', 0, 60).onChange(render);
gui.add(text, 'blendMode', ['screen', 'multiply']).onChange(render);

//gui.add(text, 'speckle').onChange(render);

function render() {
	svg.style.width = width + "px";
	svg.style.height = width + "px";
	svg.color = text.color;
	svg.className.baseVal = text.blendMode;

	var size = width / 3 - text.scale / 2;
	var radius = width / 4;


	svg.innerHTML = `
  <filter id="displacementFilter">
    <feTurbulence type="${text.type}" baseFrequency="${text.baseFrequency}"
        numOctaves="${text.numOctaves}" />
    <feDisplacementMap in2="turbulence" in="SourceGraphic"
        scale="${text.scale}" xChannelSelector="R" yChannelSelector="B"/>
  </filter>
  <filter id="displacementFilter2">
    <feTurbulence type="${text.type}" baseFrequency="${text.baseFrequency}"
        numOctaves="${text.numOctaves}" />
    <feDisplacementMap in2="turbulence" in="SourceGraphic"
        scale="${text.scale}" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="displacementFilter3">
    <feTurbulence type="${text.type}" baseFrequency="${text.baseFrequency}"
        numOctaves="${text.numOctaves}" />
    <feDisplacementMap in2="turbulence" in="SourceGraphic"
        scale="${text.scale}" xChannelSelector="B" yChannelSelector="G"/>
  </filter>

  <circle cx="${size}"                       cy="${size}"                   r="${radius}" style="fill:#0000ff;filter:url(#displacementFilter)"/>
  <circle cx="${size + (text.separation/2)}" cy="${size + text.separation}" r="${radius}" style="fill:#ff0000;filter:url(#displacementFilter2)"/>
  <circle cx="${size - (text.separation/2)}" cy="${size + text.separation}" r="${radius}" style="fill:#00ff00;filter:url(#displacementFilter3)"/>
	`;
}
