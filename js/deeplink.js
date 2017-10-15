
function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}

ready(function(){
	var elements = document.querySelectorAll("h2,h3,h4,h5,h6");
	Array.prototype.forEach.call(elements, function(el, i){
		var id = el.id;
		if(id){
			console.log(id);
			var ln = document.createElement('a');
			ln.classList.add('header-link');
			ln.setAttribute('href', '#' + id);
			ln.innerHTML = '<span>&#128279</span>';
			el.insertBefore(ln, el.firstChild);
		}
	});
})
