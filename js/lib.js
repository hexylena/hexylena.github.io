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
