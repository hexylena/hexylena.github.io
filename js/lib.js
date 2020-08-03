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

hashCode = function(s){
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
