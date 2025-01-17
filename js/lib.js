HTMLCollection.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.filter = Array.prototype.filter;
NodeList.prototype.filter = Array.prototype.filter;
HTMLCollection.prototype.map = Array.prototype.map;
NodeList.prototype.map = Array.prototype.map;

let seed;

function randomSetSeed(s) {
	seed = s;
}

function shuffle(array) {
	for (i = array.length - 1; i > 0; i--) {
		j = Math.floor(random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function random() {
	// If not set, use built in randomness
	if (seed === undefined || seed === null) {
		return Math.random();
	}
	if (seed === "CSPRNG") {
		return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
	}
	var x = Math.sin(seed++) * 10000;
	return x - Math.floor(x);
}

Array.prototype.random = function () {
	return this[Math.floor((random()*this.length))];
}

Array.prototype.shuffle = function () {
	for (let i = this.length - 1; i >= 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[this[i], this[j]] = [this[j], this[i]];
	}
	return this;
}

hashCode = function(s){
	if(s === undefined || s === null){
		s = "";
	}
	return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(random() * 16)];
  }
  return color;
}

function Controls(attrs){
	var self = this;
	self._attrs = attrs;
	Object.keys(attrs['range']).forEach(function(x){
		// Set the attr
		self[x] = attrs['range'][x][1];
	})
	Object.keys(attrs['color']).forEach(function(x){
		// Set the attr
		self[x] = attrs['color'][x];
	})

}
function GUI(controls, fn){
	var gui = new dat.GUI();

	attrs = controls._attrs;
	Object.keys(attrs['range']).forEach(function(x){
		gui.add(controls, x, attrs['range'][x][0], attrs['range'][x][2]).step(1).onChange(fn)
	})
	Object.keys(attrs['color']).forEach(function(x){
		gui.addColor(controls, x).onChange(fn)
	})
}

function formToOpts(id) {
	let p = document.querySelector(id);
	let opts = {};
	for (let elem of p.querySelectorAll("input")) {
		if (elem.type === "checkbox") {
			opts[elem.name] = elem.checked;
		} else {
			opts[elem.name] = elem.value;
		}
	}
	for (let elem of p.querySelectorAll("select")) {
		opts[elem.name] = elem.value;
	}
	for (let elem of p.querySelectorAll("textarea")) {
		opts[elem.name] = elem.value;
	}
	return opts
}

Array.prototype.flatten = function() {
	return this.reduce((acc, val) => acc.concat(val), []);
}
