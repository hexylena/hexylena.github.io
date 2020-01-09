// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = $('article.post').width();
var svg = document.getElementById('plot');

hashCode = function(s){
	  return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}
function randomSetSeed(s) {
	seed = s;
}

function random() {
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

Array.prototype.random = function () {
	return this[Math.floor((random()*this.length))];
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(random() * 16)];
  }
  return color;
}



function animate(offset){
	if(offset > 1000) {
		return;
	}

	text.major = noise.simplex2(offset / 100, offset / 100) * 2;
	text.minor = noise.simplex2((offset + 500) / 100, (2 * offset) / 100) * 10;
	console.log(offset);
	render();

	setTimeout(function(){
		animate(offset + 1);
	}, 100)
}


var sampleText = function() {
	this.color1 = "#ff0000";
	this.color2 = "#00ff00";
	this.color3 = "#0000ff";

	this.nfMajor = 60;
	this.nfMinor = 24;
	this.major = 1;
	this.minor = 3;

	this.seed = 0;
	this.speckle = false;
	this.blendMode = 'screen';

	this.animate = function() {
		animate(900);
	}
};


function addCircle(color){
	//var r = width * 0.35,
		//cx = width / 2 + (random() * 20),
		//cy = width / 2 + (random() * 20),
		//fill = color;

	//return `<circle fill="${fill}" cx="${cx}" cy="${cy}" r="${r}" />`
	return drawCircle(color, width * 0.35, hashCode(color));
}


var text = new sampleText();
render();
var gui = new dat.GUI();
gui.addColor(text, 'color1').onChange(render);
gui.addColor(text, 'color2').onChange(render);
gui.addColor(text, 'color3').onChange(render);
gui.add(text, 'seed', 1, 200).onChange(render);

gui.add(text, 'nfMajor', 1, 200).onChange(render);
gui.add(text, 'nfMinor', 1, 200).onChange(render);
gui.add(text, 'major',   0, 4).onChange(render);
gui.add(text, 'minor',   0, 10).onChange(render);
gui.add(text, 'blendMode', ['screen', 'multiply']).onChange(render);
gui.add(text, 'animate')


function render() {
	svg.style.width = width + "px";
	svg.style.height = width + "px";
	svg.color = text.color;
	svg.className.baseVal = text.blendMode;
	svg.innerHTML = `
    <filter
	       inkscape:collect="always"
		          style="color-interpolation-filters:sRGB"
	       id="filter829"
	       x="-0.081931039"
	       width="1.1638621"
	       y="-0.14849999"
	       height="1.297">
		      <feGaussianBlur
	         inkscape:collect="always"
	         stdDeviation="0.74839282"
	         id="feGaussianBlur831" />
		    </filter>

  <filter
     id="roughpaper"
     x="0%"
     y="0%"
     width="100%"
     height="100%">
    <feTurbulence
       type="fractalNoise"
       baseFrequency="0.04"
       result="noise"
       numOctaves="5"
       id="feTurbulence886" />
    <feDiffuseLighting
       in="noise"
       lighting-color="white"
       surfaceScale="10"
       id="feDiffuseLighting890">
      <feDistantLight
         azimuth="45"
         elevation="60"
         id="feDistantLight888" />
    </feDiffuseLighting>
  </filter>

	`;
	randomSetSeed(text.seed);

	noise.seed(text.seed);
	svg.innerHTML += addCircle(text.color1);
	svg.innerHTML += addCircle(text.color2);
	svg.innerHTML += addCircle(text.color3);


	if(text.speckle){
		for(var x = 0; x<width; x += 10){
			for(var y = 0; y<width; y += 10){
				n = noise.simplex2(x, y)
				if( n > 0.8 ){
					w = Math.floor(random() * 10);
					svg.innerHTML += `<circle cx="${x}" cy="${y}" r="${n * 4}" style="fill:#${w}${w}${w}5;filter:url(#filter829)"/>`
				}
			}
		}
	}

	//svg.innerHTML += `  <rect
		 //x="0"
		 //y="0"
		 //width="100%"
		 //height="100%"
		 //id="rect893"
		 //filter="url(#roughpaper)"
		 //fill="none"
		 //style="opacity:0.05" />
		//`
}







function drawCircle(color, r, id) {
	var d = ''
	let point, x, y;
	for(let angle = 0; angle < Math.PI * 2; angle += 0.01) {
		point = calcPoint(angle, r, id);
		d += `${(d==='') ? 'M ' : ''} ${point[0]} ${point[1]} ${(d==='') ? ' L ' : ''}`
	}
	d+=' Z';
	return `<path d="${d}" style="fill:${color}"/>`
}

function calcPoint(angle, r, id) {
	n = noise.simplex2(text.major * Math.cos(angle), text.major * Math.sin(angle)) * text.nfMajor;
	q = noise.simplex2(text.minor * Math.cos(angle) + id, text.minor * Math.sin(angle) + id) * text.nfMinor;
	//n = Math.abs(n);
	//q = Math.abs(q);
	x = Math.cos(angle) * (r + n + q) + width / 2;
	y = Math.sin(angle) * (r + n + q) + width / 2;
	return [x, y];
}
