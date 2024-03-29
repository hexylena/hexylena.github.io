// Author: Helena Rasche (@hexylena)
// License: AGPLv3
//
// Adapt to viewport
var width = 720;//$('article.post').width();
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

function downloadSVG(evt){
	const svgContent = svg.outerHTML,
		blob = new Blob([svgContent], {
			type: "image/svg+xml"
		}),
		url = window.URL.createObjectURL(blob),
		link = evt.target;

	link.target = "_blank";
	link.download = "TruchetTiles.svg";
	link.href = url;
}


var TILES = [
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer" transform="translate(0,-207)">    <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 0 -113.38672 A 113.38583 113.38583 0 0 0 -113.38672 0 A 113.38583 113.38583 0 0 0 0 113.38672 L 226.77148 340.1582 A 113.38583 113.38583 0 0 0 340.1582 453.54297 A 113.38583 113.38583 0 0 0 453.54297 340.1582 A 113.38583 113.38583 0 0 0 340.1582 226.77148 L 113.29492 1.8496094 A 113.38583 113.38583 0 0 0 113.38672 0 A 113.38583 113.38583 0 0 0 0 -113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)" />    <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.37795269;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 0 113.38672 A 56.692912 56.692912 0 0 0 -56.693359 170.07812 A 56.692912 56.692912 0 0 0 0 226.77148 C 62.621958 226.77099 113.38721 277.53624 113.38672 340.1582 A 56.692913 56.692913 0 0 0 170.07812 396.84961 A 56.692913 56.692913 0 0 0 226.77148 340.1582 C 226.77139 214.9158 125.24239 113.38681 0 113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="90" cy="207" r="30" />    <circle r="30" cy="297" cx="0"  style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />    <path  d="M 89.999953,267 A 14.999999,14.999999 0 0 0 105.00007,252.0004 14.999999,14.999999 0 0 0 89.999953,237.00028 C 73.431227,237.00041 59.999587,223.56877 59.999717,207.00005 A 15,15 0 0 0 45.000118,192.00045 15,15 0 0 0 30,207.00005 C 30.000023,240.1371 56.862904,266.99998 89.999953,267 Z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" inkscape:connector-curvature="0" /></g>',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 120,207 A 30,30 0 0 0 89.999762,176.99976 30,30 0 0 0 59.999526,207 L -4.2728281e-4,266.99995 A 30,30 0 0 0 -30.000147,297.00019 30,30 0 0 0 -4.2728281e-4,326.99991 30,30 0 0 0 29.999809,297.00019 l 59.510577,-60.02424 a 30,30 0 0 0 0.489376,0.0243 A 30,30 0 0 0 120,207 Z"  />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 59.999526,207 A 14.999999,14.999999 0 0 0 44.999927,191.99988 14.999999,14.999999 0 0 0 29.999809,207 c 1.29e-4,16.56873 -13.43151,30.00037 -30.00023628281,30.00024 A 15,15 0 0 0 -15.000029,251.99984 15,15 0 0 0 -4.2728281e-4,266.99995 C 33.136624,266.99993 59.999502,240.13705 59.999526,207 Z"  />    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="297" cy="-89.999763" r="30" transform="rotate(90)" />    <circle r="30" cy="0.00023799999" cx="207"  style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" transform="rotate(90)" />    <path  d="m 29.999762,296.99995 a 14.999999,14.999999 0 0 0 14.9996,15.00012 14.999999,14.999999 0 0 0 15.00012,-15.00012 c -1.3e-4,-16.56873 13.43151,-30.00037 30.00023,-30.00024 A 15,15 0 0 0 104.99931,252.00012 15,15 0 0 0 89.999712,237 c -33.13705,2e-5 -59.99993,26.8629 -59.99995,59.99995 z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" inkscape:connector-curvature="0" />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 340.1582 -113.38672 A 113.38583 113.38583 0 0 0 226.77148 0 L 113.19727 0 A 113.19685 113.19685 0 0 0 0 -113.19727 A 113.19685 113.19685 0 0 0 -113.19727 0 A 113.19685 113.19685 0 0 0 0 113.19727 L 0 226.77148 A 113.38583 113.38583 0 0 0 -113.38672 340.1582 A 113.38583 113.38583 0 0 0 0 453.54297 A 113.38583 113.38583 0 0 0 113.38672 340.1582 L 226.96094 340.1582 A 113.19685 113.19685 0 0 0 340.1582 453.35352 A 113.19685 113.19685 0 0 0 453.35352 340.1582 A 113.19685 113.19685 0 0 0 340.1582 226.96094 L 340.1582 113.38672 A 113.38583 113.38583 0 0 0 453.54297 0 A 113.38583 113.38583 0 0 0 340.1582 -113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="0" cy="252" r="15" />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="90" cy="252" r="15" />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="45" cy="207" r="15" />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="45" cy="297" r="15" />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="4.2131041e-09" cy="296.99997" r="30" />    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="89.999992" cy="207" r="30" />    <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.37795269;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 170.08008 -56.705078 A 56.69291 56.69291 0 0 0 114.20898 -9.6367188 A 56.692913 56.692913 0 0 0 114.10742 -8.7949219 A 56.69291 56.69291 0 0 0 113.49414 -3.0585938 A 56.692913 56.692913 0 0 0 113.38477 0 C 113.38477 0.023502677 113.38476 0.046811494 113.38477 0.0703125 C 113.3408 62.654454 62.594497 113.37549 0 113.375 A 56.69291 56.69291 0 0 0 -44.410156 134.82617 A 56.692913 56.692913 0 0 0 -44.410156 134.82812 A 56.69291 56.69291 0 0 0 -50.525391 144.35156 A 56.692913 56.692913 0 0 0 -50.525391 144.35352 A 56.69291 56.69291 0 0 0 -56.693359 170.06641 A 56.69291 56.69291 0 0 0 -35.242188 214.47461 A 56.692913 56.692913 0 0 0 -35.240234 214.47461 A 56.69291 56.69291 0 0 0 -30.632812 217.77148 A 56.692913 56.692913 0 0 0 -30.630859 217.77148 A 56.69291 56.69291 0 0 0 -25.716797 220.5918 A 56.692913 56.692913 0 0 0 -25.714844 220.5918 A 56.69291 56.69291 0 0 0 -20.544922 222.90625 A 56.692913 56.692913 0 0 0 -20.542969 222.90625 A 56.69291 56.69291 0 0 0 -15.167969 224.69336 A 56.692913 56.692913 0 0 0 -15.166016 224.69336 A 56.69291 56.69291 0 0 0 -9.6386719 225.93359 A 56.692913 56.692913 0 0 0 -9.6347656 225.93359 A 56.69291 56.69291 0 0 0 -4.0117188 226.61719 A 56.692913 56.692913 0 0 0 -4.0097656 226.61719 A 56.69291 56.69291 0 0 0 0 226.75977 C 62.62197 226.75927 113.38721 277.52455 113.38672 340.14648 A 56.692913 56.692913 0 0 0 113.38672 340.14844 C 113.38672 340.1517 113.38672 340.15494 113.38672 340.1582 A 56.692913 56.692913 0 0 0 113.66992 345.80664 A 56.69291 56.69291 0 0 0 170.07812 396.85156 A 56.69291 56.69291 0 0 0 226.62891 344.1543 A 56.692913 56.692913 0 0 0 226.77148 340.14648 C 226.77735 277.53057 277.53913 226.77205 340.15625 226.77148 A 56.69291 56.69291 0 0 0 346.66406 226.35938 A 56.69291 56.69291 0 0 0 356.91211 224.23828 A 56.692913 56.692913 0 0 0 362.23242 222.29688 A 56.69291 56.69291 0 0 0 362.23438 222.29492 A 56.692913 56.692913 0 0 0 367.33594 219.83203 A 56.69291 56.69291 0 0 0 367.33789 219.83008 A 56.692913 56.692913 0 0 0 372.16797 216.86914 A 56.69291 56.69291 0 0 0 380.54102 209.8418 A 56.692913 56.692913 0 0 0 380.82422 209.57812 A 56.69291 56.69291 0 0 0 380.82617 209.57617 A 56.692913 56.692913 0 0 0 384.56445 205.32031 A 56.69291 56.69291 0 0 0 384.56641 205.31836 A 56.692913 56.692913 0 0 0 387.86133 200.71094 A 56.69291 56.69291 0 0 0 387.86328 200.70898 A 56.692913 56.692913 0 0 0 390.68164 195.79492 A 56.69291 56.69291 0 0 0 390.68164 195.79297 A 56.692913 56.692913 0 0 0 392.99609 190.62305 A 56.69291 56.69291 0 0 0 392.99609 190.62109 A 56.692913 56.692913 0 0 0 394.7832 185.24414 A 56.69291 56.69291 0 0 0 394.7832 185.24219 A 56.692913 56.692913 0 0 0 395.0625 184.00195 A 56.692913 56.692913 0 0 0 396.625 174.77148 A 56.692913 56.692913 0 0 0 396.70703 174.08984 A 56.69291 56.69291 0 0 0 396.70703 174.08789 A 56.692913 56.692913 0 0 0 396.84961 170.08008 A 56.69291 56.69291 0 0 0 340.15625 113.38672 C 277.55777 113.38721 226.80711 62.659852 226.76953 0.0703125 C 226.76954 0.042877555 226.77148 0.015718472 226.77148 -0.01171875 A 56.69291 56.69291 0 0 0 170.08008 -56.705078 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <circle r="30" cy="207" cx="0"  style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />    <circle r="30.000002" cy="297" cx="90"  style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 340.1582 -113.38672 A 113.38583 113.38583 0 0 0 226.77148 0 L 113.19727 0 A 113.19685 113.19685 0 0 0 0 -113.19727 A 113.19685 113.19685 0 0 0 -113.19727 0 A 113.19685 113.19685 0 0 0 0 113.19727 L 0 226.77148 A 113.38583 113.38583 0 0 0 -113.38672 340.1582 A 113.38583 113.38583 0 0 0 0 453.54297 A 113.38583 113.38583 0 0 0 113.38672 340.1582 L 226.96094 340.1582 A 113.19685 113.19685 0 0 0 340.1582 453.35352 A 113.19685 113.19685 0 0 0 453.35352 340.1582 A 113.19685 113.19685 0 0 0 340.1582 226.96094 L 340.1582 113.38672 A 113.38583 113.38583 0 0 0 453.54297 0 A 113.38583 113.38583 0 0 0 340.1582 -113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.00157475;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 0 113.38672 A 56.692913 56.692913 0 0 0 -56.693359 170.07812 A 56.692913 56.692913 0 0 0 0 226.77148 L 340.1582 226.77148 A 56.692913 56.692913 0 0 0 396.84961 170.07812 A 56.692913 56.692913 0 0 0 340.1582 113.38672 L 0 113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.00157475;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 170.07812 -56.693359 A 56.692913 56.692913 0 0 0 113.38672 0 L 113.38672 340.1582 A 56.692913 56.692913 0 0 0 170.07812 396.84961 A 56.692913 56.692913 0 0 0 226.77148 340.1582 L 226.77148 0 A 56.692913 56.692913 0 0 0 170.07812 -56.693359 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 340.1582 -113.38672 A 113.38583 113.38583 0 0 0 226.77148 0 L 113.19727 0 A 113.19685 113.19685 0 0 0 0 -113.19727 A 113.19685 113.19685 0 0 0 -113.19727 0 A 113.19685 113.19685 0 0 0 0 113.19727 L 0 226.77148 A 113.38583 113.38583 0 0 0 -113.38672 340.1582 A 113.38583 113.38583 0 0 0 0 453.54297 A 113.38583 113.38583 0 0 0 113.38672 340.1582 L 226.96094 340.1582 A 113.19685 113.19685 0 0 0 340.1582 453.35352 A 113.19685 113.19685 0 0 0 453.35352 340.1582 A 113.19685 113.19685 0 0 0 340.1582 226.96094 L 340.1582 113.38672 A 113.38583 113.38583 0 0 0 453.54297 0 A 113.38583 113.38583 0 0 0 340.1582 -113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="0" cy="252" r="15" />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="90" cy="252" r="15" />    <path style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:1.00157475;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 170.07812 -56.693359 A 56.692913 56.692913 0 0 0 113.38672 0 L 113.38672 340.1582 A 56.692913 56.692913 0 0 0 170.07812 396.84961 A 56.692913 56.692913 0 0 0 226.77148 340.1582 L 226.77148 0 A 56.692913 56.692913 0 0 0 170.07812 -56.693359 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 119.99991,297.00019 A 30,30 0 0 0 89.999677,266.99995 V 236.95011 A 29.95,29.95 0 0 0 119.94979,207 29.95,29.95 0 0 0 89.999677,177.04989 29.95,29.95 0 0 0 60.049566,207 H 29.999724 A 30,30 0 0 0 -5.1228281e-4,176.99976 30,30 0 0 0 -30.000232,207 30,30 0 0 0 -5.1228281e-4,237.00024 v 30.04984 A 29.95,29.95 0 0 0 -29.950107,297.00019 29.95,29.95 0 0 0 -5.1228281e-4,326.94978 29.95,29.95 0 0 0 29.949596,297.00019 h 30.049845 a 30,30 0 0 0 30.000236,29.99972 30,30 0 0 0 30.000233,-29.99972 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="207" cy="-44.999676" r="15" transform="rotate(90)" />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="297" cy="-44.999676" r="15" transform="rotate(90)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.26499999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 104.99979,251.99984 A 15,15 0 0 0 89.999677,237.00024 H -5.1228281e-4 A 15,15 0 0 0 -15.000114,251.99984 15,15 0 0 0 -5.1228281e-4,266.99995 H 89.999677 a 15,15 0 0 0 15.000113,-15.00011 z"  />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="4.2131041e-09" cy="296.99997" r="30" />    <path style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.37795275;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 340.1582 -113.38672 A 113.38583 113.38583 0 0 0 226.77148 0 L 113.38672 0 L 113.19727 0 A 113.19685 113.19685 0 0 0 0 -113.19727 A 113.19685 113.19685 0 0 0 -113.19727 0 A 113.19685 113.19685 0 0 0 0 113.19727 A 113.19685 113.19685 0 0 0 0.19726562 113.18945 L 0 113.38672 L 226.77148 340.1582 L 226.9707 339.95898 A 113.19685 113.19685 0 0 0 226.96094 340.1582 A 113.19685 113.19685 0 0 0 340.1582 453.35352 A 113.19685 113.19685 0 0 0 453.35352 340.1582 A 113.19685 113.19685 0 0 0 340.1582 226.96094 A 113.19685 113.19685 0 0 0 339.96094 226.96875 L 340.1582 226.77148 L 340.1582 113.38672 A 113.38583 113.38583 0 0 0 453.54297 0 A 113.38583 113.38583 0 0 0 340.1582 -113.38672 z " transform="matrix(0.26458333,0,0,0.26458333,0,207)"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-45" cy="207" r="14.999998" transform="scale(-1,1)" />    <circle transform="scale(-1,1)" r="14.999998" cy="252" cx="-90"  style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />    <path  d="M 0,237 A 14.999999,14.999999 0 0 0 -15.00012,251.9996 14.999999,14.999999 0 0 0 0,266.99972 c 16.56873,-1.3e-4 30.000369,13.43151 30.00024,30.00023 a 15,15 0 0 0 14.999591,14.9996 15,15 0 0 0 15.000119,-14.9996 C 59.999931,263.8629 33.13705,237.00002 0,237 Z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" inkscape:connector-curvature="0" />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="206.99991" cy="0.00014448242" r="30" transform="rotate(90)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 120.00006,297.0001 A 30,30 0 0 0 89.999825,266.99986 v -29.99971 -0.0501 a 29.95,29.95 0 0 0 29.950115,-29.95011 29.95,29.95 0 0 0 -29.950115,-29.95011 29.95,29.95 0 0 0 -29.950111,29.95011 29.95,29.95 0 0 0 0.0021,0.0522 l -0.05224,-0.0522 -59.99995328281,59.99995 0.0527102928,0.0527 a 29.95,29.95 0 0 0 -0.0527102928,-0.003 A 29.95,29.95 0 0 0 -29.949959,297.0001 29.95,29.95 0 0 0 -3.6428281e-4,326.94969 29.95,29.95 0 0 0 29.949744,297.0001 a 29.95,29.95 0 0 0 -0.0021,-0.0522 l 0.05219,0.0522 h 29.999768 a 30,30 0 0 0 30.000236,29.99972 30,30 0 0 0 30.000232,-29.99972 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-251.99991" cy="-89.999817" r="14.999998" transform="matrix(0,-1,-1,0,0,0)" />    <circle transform="matrix(0,-1,-1,0,0,0)" r="14.999998" cy="-44.999821" cx="-296.99991"  style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />    <path  d="m 59.999825,206.99992 a 14.999999,14.999999 0 0 0 -14.9996,-15.00013 14.999999,14.999999 0 0 0 -15.00012,15.00013 c 1.3e-4,16.56872 -13.43151,30.00036 -30.00023,30.00023 a 15,15 0 0 0 -14.9996,14.9996 15,15 0 0 0 14.9996,15.00011 c 33.13705,-1e-5 59.99993,-26.8629 59.99995,-59.99994 z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" inkscape:connector-curvature="0" />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-89.999908" cy="-206.99976" r="30" transform="scale(-1)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m -2.77e-4,326.99996 a 30,30 0 0 0 30.00024,-30.00024 h 29.99971 0.0501 a 29.95,29.95 0 0 0 29.95011,29.95012 29.95,29.95 0 0 0 29.950107,-29.95012 29.95,29.95 0 0 0 -29.950107,-29.95011 29.95,29.95 0 0 0 -0.0522,0.002 l 0.0522,-0.0522 -59.99995,-59.99995 -0.0527,0.0527 a 29.95,29.95 0 0 0 0.003,-0.0527 29.95,29.95 0 0 0 -29.95051,-29.94958 29.95,29.95 0 0 0 -29.94959,29.94959 29.95,29.95 0 0 0 29.94959,29.95011 29.95,29.95 0 0 0 0.0522,-0.002 l -0.0522,0.0522 v 29.99977 a 30,30 0 0 0 -29.99972,30.00023 30,30 0 0 0 29.99972,30.00024 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="44.999912" cy="-296.99973" r="14.999998" transform="scale(1,-1)" />    <circle transform="scale(1,-1)" r="14.999998" cy="-251.99973" cx="-8.8447268e-05"  style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />    <path  d="M 89.999903,266.99972 A 14.999999,14.999999 0 0 0 105.00003,252.00012 14.999999,14.999999 0 0 0 89.999903,237 c -16.56872,1.3e-4 -30.00036,-13.43151 -30.00023,-30.00023 a 15,15 0 0 0 -14.9996,-14.9996 15,15 0 0 0 -15.00011,14.9996 c 10e-6,33.13705 26.8629,59.99993 59.99994,59.99995 z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" inkscape:connector-curvature="0" />  </g>    ',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-296.99985" cy="90.000092" r="30" transform="rotate(-90)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M -30.000114,206.99966 A 30,30 0 0 0 1.26e-4,236.9999 v 29.99971 0.0501 a 29.95,29.95 0 0 0 -29.95012,29.95011 29.95,29.95 0 0 0 29.95012,29.9501 29.95,29.95 0 0 0 29.95011,-29.9501 29.95,29.95 0 0 0 -0.002,-0.0522 l 0.0522,0.0522 59.99995,-59.99995 -0.0527,-0.0527 a 29.95,29.95 0 0 0 0.0527,0.003 29.95,29.95 0 0 0 29.949584,-29.95051 29.95,29.95 0 0 0 -29.949594,-29.94959 29.95,29.95 0 0 0 -29.95011,29.94959 29.95,29.95 0 0 0 0.002,0.0522 l -0.0522,-0.0522 H 30.000296 A 30,30 0 0 0 6.6e-5,176.99994 a 30,30 0 0 0 -30.00024,29.99972 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="251.99985" cy="0.0001246582" r="14.999998" transform="matrix(0,1,1,0,0,0)" />    <circle transform="matrix(0,1,1,0,0,0)" r="14.999998" cy="45.000126" cx="206.99985"  style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" />    <path  d="m 30.000126,296.99984 a 14.999999,14.999999 0 0 0 14.9996,15.00012 14.999999,14.999999 0 0 0 15.00012,-15.00012 c -1.3e-4,-16.56872 13.43151,-30.00036 30.00023,-30.00023 A 15,15 0 0 0 104.99968,252.00001 15,15 0 0 0 90.000076,236.9999 c -33.13705,1e-5 -59.99993,26.8629 -59.99995,59.99994 z" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" inkscape:connector-curvature="0" />  </g>',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="4.2131041e-09" cy="296.99997" r="30" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 90.000189,176.99976 A 30,30 0 0 0 59.999953,207 H 30.000236 29.950111 A 29.95,29.95 0 0 0 0,177.04989 29.95,29.95 0 0 0 -29.950111,207 29.95,29.95 0 0 0 0,236.95011 a 29.95,29.95 0 0 0 0.05219319,-0.002 L 0,237.00024 l 59.999953,59.99995 0.05271,-0.0527 a 29.95,29.95 0 0 0 -0.0026,0.0527 29.95,29.95 0 0 0 29.950171,29.94959 29.95,29.95 0 0 0 29.949586,-29.94959 29.95,29.95 0 0 0 -29.949586,-29.95011 29.95,29.95 0 0 0 -0.05219,0.002 l 0.05219,-0.0523 -30.135626,-30.13562 h 27.419514 a 30,30 0 0 0 2.716112,0.13591 A 30,30 0 0 0 119.99991,207 30,30 0 0 0 90.000189,176.99976 Z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-45" cy="207" r="14.999998" transform="scale(-1,1)" />    <path style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 29.666917,207 h 60.333082 v 60 H 53.988443 L 14.999999,220.02638 29.947526,207.05271 v 0"  inkscape:connector-curvature="0" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m 90.044631,236.95269 c -0.765175,0 -1.525352,0.0192 -2.283581,0.0476 H 0 A 15,15 0 0 0 -14.999601,252.00035 15,15 0 0 0 0,266.99995 c 16.56872,-1.3e-4 30.000366,13.43152 30.000236,30.00024 a 14.999999,14.999999 0 0 0 15.000118,15.00012 14.999999,14.999999 0 0 0 8.480618,-2.64739 14.999999,14.999999 0 0 0 0.107487,-0.077 14.999999,14.999999 0 0 0 1.015442,-0.77153 14.999999,14.999999 0 0 0 0.336931,-0.29611 14.999999,14.999999 0 0 0 0.698666,-0.6506 14.999999,14.999999 0 0 0 0.530199,-0.56948 14.999999,14.999999 0 0 0 0.412895,-0.47025 14.999999,14.999999 0 0 0 0.665592,-0.8754 14.999999,14.999999 0 0 0 0.178802,-0.2496 14.999999,14.999999 0 0 0 0.727604,-1.18649 14.999999,14.999999 0 0 0 0.01241,-0.0217 14.999999,14.999999 0 0 0 1.877404,-7.23211 c -1.24e-4,-16.00649 12.536048,-29.08364 28.325403,-29.9527 h 1.630391 v -0.047 c 0.01487,-2e-5 0.02958,-5.3e-4 0.04444,-5.3e-4 A 15,15 0 0 0 105.04424,251.95282 15,15 0 0 0 90.044638,236.9527 Z"  />  </g>',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="206.99991" cy="0.00015448242" r="30" transform="rotate(90)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="M 120.00006,297.00009 A 30,30 0 0 0 89.999815,266.99986 v -29.99972 -0.0501 a 29.95,29.95 0 0 0 29.950115,-29.95012 29.95,29.95 0 0 0 -29.950115,-29.95011 29.95,29.95 0 0 0 -29.95011,29.95012 29.95,29.95 0 0 0 0.002,0.0522 l -0.05213,-0.0522 -59.99995,59.99995 0.0527,0.0527 a 29.95,29.95 0 0 0 -0.0527,-0.003 29.95,29.95 0 0 0 -29.94959,29.95017 29.95,29.95 0 0 0 29.94959,29.94958 29.95,29.95 0 0 0 29.95011,-29.94958 29.95,29.95 0 0 0 -0.002,-0.0522 l 0.0523,0.0522 30.13562,-30.13563 v 27.41952 a 30,30 0 0 0 -0.13591,2.71611 30,30 0 0 0 30.00007,29.99967 30,30 0 0 0 30.000245,-29.99972 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-251.99989" cy="-89.999809" r="14.999998" transform="matrix(0,-1,-1,0,0,0)" />    <path style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 89.999815,236.66682 v 60.33308 h -60 v -36.01155 l 46.97362,-38.98845 12.97367,14.94753 v 0"  inkscape:connector-curvature="0" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m 60.047125,297.04454 c 0,-0.76518 -0.0192,-1.52536 -0.0476,-2.28358 v -87.76105 a 15,15 0 0 0 -15.00006,-14.99961 15,15 0 0 0 -14.9996,14.99961 c 1.3e-4,16.56872 -13.43152,30.00036 -30.00024,30.00023 a 14.999999,14.999999 0 0 0 -15.00012,15.00012 14.999999,14.999999 0 0 0 2.64739,8.48062 14.999999,14.999999 0 0 0 0.077,0.10748 14.999999,14.999999 0 0 0 0.77153,1.01545 14.999999,14.999999 0 0 0 0.29611,0.33693 14.999999,14.999999 0 0 0 0.6506,0.69866 14.999999,14.999999 0 0 0 0.56948,0.5302 14.999999,14.999999 0 0 0 0.47025,0.4129 14.999999,14.999999 0 0 0 0.8754,0.66559 14.999999,14.999999 0 0 0 0.2496,0.1788 14.999999,14.999999 0 0 0 1.18649,0.72761 14.999999,14.999999 0 0 0 0.0217,0.0124 14.999999,14.999999 0 0 0 7.23211,1.8774 c 16.00649,-1.2e-4 29.08364,12.53605 29.9527,28.3254 v 1.63039 h 0.047 c 2e-5,0.0149 5.3e-4,0.0296 5.3e-4,0.0444 a 15,15 0 0 0 14.9996,14.99961 15,15 0 0 0 15.00012,-14.99961 z"  />  </g>',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-89.99971" cy="-206.99954" r="30" transform="scale(-1)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m -4.77e-4,326.99977 a 30,30 0 0 0 30.00023,-30.00025 h 29.99972 0.0501 a 29.95,29.95 0 0 0 29.95012,29.95012 29.95,29.95 0 0 0 29.950107,-29.95012 29.95,29.95 0 0 0 -29.950117,-29.95011 29.95,29.95 0 0 0 -0.0522,0.002 l 0.0522,-0.0521 -59.99995,-59.99995 -0.0527,0.0527 a 29.95,29.95 0 0 0 0.003,-0.0527 29.95,29.95 0 0 0 -29.95017,-29.94959 29.95,29.95 0 0 0 -29.94958,29.94959 29.95,29.95 0 0 0 29.94958,29.95011 29.95,29.95 0 0 0 0.0522,-0.002 l -0.0522,0.0523 30.13563,30.13562 H 2.715973 a 30,30 0 0 0 -2.71611,-0.13591 30,30 0 0 0 -29.99967,30.00007 30,30 0 0 0 29.99972,30.00025 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="44.999718" cy="-296.99951" r="14.999998" transform="scale(1,-1)" />    <path style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="M 60.332793,296.99952 H -2.87e-4 v -60 h 36.01155 l 38.98845,46.97362 -14.94753,12.97367 v 0"  inkscape:connector-curvature="0" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m -0.044927,267.04683 c 0.76518,0 1.52536,-0.0192 2.28358,-0.0476 h 87.76105 a 15,15 0 0 0 14.999607,-15.00006 15,15 0 0 0 -14.999607,-14.9996 c -16.56872,1.3e-4 -30.00036,-13.43152 -30.00023,-30.00024 a 14.999999,14.999999 0 0 0 -15.00012,-15.00012 14.999999,14.999999 0 0 0 -8.48062,2.64739 14.999999,14.999999 0 0 0 -0.10748,0.077 14.999999,14.999999 0 0 0 -1.01545,0.77153 14.999999,14.999999 0 0 0 -0.33693,0.29611 14.999999,14.999999 0 0 0 -0.69866,0.6506 14.999999,14.999999 0 0 0 -0.5302,0.56948 14.999999,14.999999 0 0 0 -0.4129,0.47025 14.999999,14.999999 0 0 0 -0.66559,0.8754 14.999999,14.999999 0 0 0 -0.1788,0.2496 14.999999,14.999999 0 0 0 -0.72761,1.18649 14.999999,14.999999 0 0 0 -0.0124,0.0217 14.999999,14.999999 0 0 0 -1.8774,7.23211 c 1.2e-4,16.00649 -12.53605,29.08364 -28.3254,29.9527 h -1.63039 v 0.047 c -0.0149,2e-5 -0.0296,5.3e-4 -0.0444,5.3e-4 a 15,15 0 0 0 -14.99961,14.9996 15,15 0 0 0 14.99961,15.00012 z"  />  </g>',
    '<g inkscape:label="Layer 1" inkscape:groupmode="layer"  transform="translate(0,-207)">    <circle style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="-296.99942" cy="90.000076" r="30" transform="rotate(-90)" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m -30.000148,206.99924 a 30,30 0 0 0 30.00025,30.00023 v 29.99972 0.0501 a 29.95,29.95 0 0 0 -29.95012,29.95012 29.95,29.95 0 0 0 29.95012,29.95011 29.95,29.95 0 0 0 29.95011,-29.95012 29.95,29.95 0 0 0 -0.002,-0.0522 l 0.0521,0.0522 59.99995,-59.99995 -0.0527,-0.0527 a 29.95,29.95 0 0 0 0.0527,0.003 29.95,29.95 0 0 0 29.949588,-29.95017 29.95,29.95 0 0 0 -29.949588,-29.94958 29.95,29.95 0 0 0 -29.95011,29.94958 29.95,29.95 0 0 0 0.002,0.0522 l -0.0523,-0.0522 -30.13562,30.13563 v -27.41952 a 30,30 0 0 0 0.13591,-2.71611 30,30 0 0 0 -30.00007,-29.99967 30,30 0 0 0 -30.00025,29.99972 z"  />    <circle style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers"  cx="251.99944" cy="0.00010828125" r="14.999998" transform="matrix(0,1,1,0,0,0)" />    <path style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1" d="m 1.02e-4,267.33251 v -60.33308 h 60 v 36.01155 L 13.026482,281.99943 0.052812,267.0519 v 0"  inkscape:connector-curvature="0" />    <path inkscape:connector-curvature="0" style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:0.09999998;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:stroke fill markers" d="m 29.952792,206.95479 c 0,0.76518 0.0192,1.52536 0.0476,2.28358 v 87.76105 a 15,15 0 0 0 15.00006,14.99961 15,15 0 0 0 14.9996,-14.99961 c -1.3e-4,-16.56872 13.43152,-30.00036 30.00024,-30.00023 a 14.999999,14.999999 0 0 0 15.000118,-15.00012 14.999999,14.999999 0 0 0 -2.64739,-8.48062 14.999999,14.999999 0 0 0 -0.077,-0.10748 14.999999,14.999999 0 0 0 -0.77153,-1.01545 14.999999,14.999999 0 0 0 -0.29611,-0.33693 14.999999,14.999999 0 0 0 -0.6506,-0.69866 14.999999,14.999999 0 0 0 -0.569478,-0.5302 14.999999,14.999999 0 0 0 -0.47025,-0.4129 14.999999,14.999999 0 0 0 -0.8754,-0.66559 14.999999,14.999999 0 0 0 -0.2496,-0.1788 14.999999,14.999999 0 0 0 -1.18649,-0.72761 14.999999,14.999999 0 0 0 -0.0217,-0.0124 14.999999,14.999999 0 0 0 -7.23211,-1.8774 c -16.00649,1.2e-4 -29.08364,-12.53605 -29.9527,-28.3254 v -1.63039 h -0.047 c -2e-5,-0.0149 -5.3e-4,-0.0296 -5.3e-4,-0.0444 a 15,15 0 0 0 -14.9996,-14.99961 15,15 0 0 0 -15.00012,14.99961 z"  />  </g>',
]
var TILES_ACTIVE = [];

function piece(item, text){
	var scale = 4 * Math.pow(2, 1 - item.depth),
		x = item.x0 * text.width;
		y = item.y0 * text.width;

	var p = TILES_ACTIVE.random();
	if ( item.depth % 2 == 1 ){
		p = p.replace(/#ffffff/g, 'color2').replace(/#000000/g, 'color1').replace(/color2/g, text.color2).replace(/color1/g, text.color1);
	}else {
		p = p.replace(/#ffffff/g, 'color1').replace(/#000000/g, 'color2').replace(/color2/g, text.color2).replace(/color1/g, text.color1);
	}
	return '<g transform="translate(' + x + ', ' + y + ') scale(' + scale + ')">' + p + '</g>';
}

class QuadTree {
	constructor(root) {
		this.root = root;
	}

	all_children(really_all) {
		var k = this.root.all_children()
		if(really_all) {
			return k;
		}else {
			return k.filter(function(item){
				return item.enabled
			})
		}
	}

	random_divide(min_kids){
		while(true) {
			var kids = this.all_children(false);
			if(kids.length > min_kids){
				break;
			}

			kids.random().subdivide();
		}
	}
}

class QNode {
	constructor(x0, y0, width, height, children, enabled, depth) {
		this.x0 = x0;
		this.y0 = y0;
		this.width = width;
		this.height = height;
		this.children = children;
		this.enabled = enabled;
		this.depth = depth;
	}

	id() {
		return this.x0 + ',' + this.y0
	}

	subdivide(){
		var w_ = this.width / 2;
		var h_ = this.height / 2;

		var x1 = new QNode(this.x0, this.y0, w_, h_, [], true, this.depth + 1)
		var x2 = new QNode(this.x0, this.y0 + h_, w_, h_, [], true, this.depth + 1)
		var x3 = new QNode(this.x0 + w_, this.y0, w_, h_, [], true, this.depth + 1)
		var x4 = new QNode(this.x0 + w_, this.y0 + h_, w_, h_, [], true, this.depth + 1)

		this.children = [x1, x2, x3, x4];
		this.enabled = false;
	}

	all_children() {
		var kids = [];
		if(this.children.length == 0){
			return [this];
		}
		for(var i = 0; i < this.children.length; i++){
			var subkids = this.children[i].all_children()
			for( var j = 0; j < subkids.length; j++ ){
				kids.push(subkids[j]);
			}
		}
		return kids
	}
}




var sampleText = function() {
	this.width = width;
	this.divisions = 10;
	this.color1 = "#ffff33";
	this.color2 = "#3333ff";
	this.seed = 0;
	this.debug = false;

	this.randomDivide = function() {
		var k = q.all_children(false).length;
		q.random_divide(k + 10)
		render()
	}

	this.piece0 = true;
	this.piece1 = true;
	this.piece2 = false;
	this.piece3 = false;
	this.piece4 = false;
	this.piece5 = false;
	this.piece6 = false;
	this.piece7 = false;
	this.piece8 = false;
	this.piece9 = false;
	this.piece10 = false;
	this.piece11 = false;
	this.piece12 = false;
	this.piece13 = false;
	this.piece14 = false;
};


var root = new QNode(0, 0, 1, 1, [], true, 0);
var q = new QuadTree(root);

var text = new sampleText();
render();
var gui = new dat.GUI();
gui.addColor(text, 'color1').onChange(render);
gui.addColor(text, 'color2').onChange(render);
gui.add(text, 'seed', 1, 200).onChange(render);
gui.add(text, 'debug').onChange(render);
gui.add(text, 'randomDivide').onChange(render);
gui.add(text, 'piece0').onChange(render);
gui.add(text, 'piece1').onChange(render);
gui.add(text, 'piece2').onChange(render);
gui.add(text, 'piece3').onChange(render);
gui.add(text, 'piece4').onChange(render);
gui.add(text, 'piece5').onChange(render);
gui.add(text, 'piece6').onChange(render);
gui.add(text, 'piece7').onChange(render);
gui.add(text, 'piece8').onChange(render);
gui.add(text, 'piece9').onChange(render);
gui.add(text, 'piece10').onChange(render);
gui.add(text, 'piece11').onChange(render);
gui.add(text, 'piece12').onChange(render);
gui.add(text, 'piece13').onChange(render);
gui.add(text, 'piece14').onChange(render);

//gui.add(text, 'width', 0, 1000).onChange(render);
//gui.add(text, 'divisions', 1, 20).onChange(render);

document.getElementById("plot").addEventListener("click", function(evt){
	console.log(evt.target)
	q.all_children(false).forEach(function(item){
		if(item.id() == evt.target.id){
			console.log("hit!")
			item.subdivide();
			render()
		}
	})
})

document.getElementById("download").addEventListener("click", function(evt){
	var svgData = svg.outerHTML;
	var preface = '<?xml version="1.0" standalone="no"?>\r\n';
	var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
	var svgUrl = URL.createObjectURL(svgBlob);
	var downloadLink = document.createElement("a");
	downloadLink.href = svgUrl;
	downloadLink.download = "Testing.svg";
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
})

function render() {
	svg.style.width = text.width + "px";
	svg.style.height = text.width + "px";
	svg.color = text.color;
	svg.innerHTML = ""


	TILES_ACTIVE = [];
	for(var i = 0; i < TILES.length; i++){
		if(text['piece' + i]){
			TILES_ACTIVE.push(TILES[i])
		}
	}

	if(TILES_ACTIVE.length == 0){
		TILES_ACTIVE = TILES;
	}


	var kids = q.all_children(false);

	kids.sort(function(a, b) {
		return a.depth - b.depth;
	})
	kids.forEach(function(item, index){


		randomSetSeed(hashCode(text.seed + item.id()));

		var w = item.width * text.width,
			h = item.height * text.height,
			x = item.x0 * text.width,
			y = item.y0 * text.width,
			c = getRandomColor();

		svg.innerHTML += piece(item, text);
	})
	kids.forEach(function(item, index){
		randomSetSeed(hashCode(text.seed + item.id()));
		var w = item.width * text.width,
			h = item.height * text.height,
			x = item.x0 * text.width,
			y = item.y0 * text.width,
			c = getRandomColor() + ';fill-opacity:' + (text.debug ? '0.5' : '0');

		svg.innerHTML += '<rect width="' + w + '" height="' + w + '"   x="' + x + '"   y="' + y + '" id="' + item.id() + '" style="fill:' + c + '"/>';
	})
}
