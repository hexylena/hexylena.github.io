var scale = 5;
var container = $("#plots");
var table = container.append($('<table id="pt"></table>'));

for(var i = 0; i < scale; i++){
	row = $('#pt').append($('<tr id="r' + i + '"/>'))
	for(var j = 0; j < scale; j++){
		col = $('#r' + i).append('<td><div id="r' + i + 'c' + j + '" class="cell"></div></td>');
	}
}


var modules = [
	{
		img: '1.png',
		left: ['bl', 'bl', 'bl'],
		right: ['bl', 'br', 'br'],
		top: ['bl', 'bl', 'bl'],
		bottom: ['bl', 'br', 'br'],
	},
	{
		img: '2.png',
		left: ['bl', 'br', 'br'],
		right: ['bl', 'br', 'br'],
		top: ['bl', 'bl', 'bl'],
		bottom: ['br', 'br', 'br'],
	},
	{
		img: '3.png',
		left: ['bl', 'br', 'br'],
		right: ['bl', 'bl', 'bl'],
		top: ['bl', 'bl', 'bl'],
		bottom: ['br', 'br', 'bl'],
	},
	{
		img: '4.png',
		left: ['bl', 'bl', 'bl'],
		right: ['bl', 'bl', 'bl'],
		top: ['bl', 'bl', 'bl'],
		bottom: ['bl', 'bl', 'bl'],
	},
	{
		img: '5.png',
		left: ['bl', 'bl', 'bl'],
		right: ['br', 'br', 'br'],
		top: ['bl', 'br', 'br'],
		bottom: ['bl', 'br', 'br'],
	}
];
var slots = [];
for(var i = 0; i < scale; i++){
	slots.push([]);
	for(var j = 0; j < scale; j++){
		slots[i][j] = [];
		for(idx in modules){
			slots[i][j].push(idx);
		}
	}
}

function modMatch(modAside, modBside){
	return modAside.every(function(elem, idx){
		return elem === modBside[idx];
	})
}

function anyFailure(){
	for(var i = 0; i < scale; i++){
		for(var j = 0; j < scale; j++){
			if(slots[i][j].length === 0){
				return true;
			}
		}
	}
	return false;
}

function anyAmbiguous(){
	for(var i = 0; i < scale; i++){
		for(var j = 0; j < scale; j++){
			if(slots[i][j].length > 1){
				return true;
			}
		}
	}
	return false;
}

function constrain(){
	for(var i = 0; i < scale; i++){
		for(var j = 0; j < scale; j++){
			// For each module in our current slot we consider it potentially
			// valid. So let's remove all around it that this potentially valid
			// module invalidates.

			for(idx in slots[i][j]){
				mod = slots[i][j][idx];
				// Current module that we're looking at. It is considered valid
				// until proven otherwise.
				var current_mod = modules[mod];
				var discard_mod = false;

				// If it is on second row or greater
				if(i > 0 && j == 4){
					// Look at modules above it. if they are invalid, remove them.
					console.log(current_mod.top);
					console.log('  c', slots[i - 1][j]);
					possible_new_slots = slots[i - 1][j].filter(function(elem, idx){
						console.log('    ', elem, modules[elem].bottom);
						return modMatch(current_mod.top, modules[elem].bottom);
					});

					console.log(possible_new_slots);
					if(possible_new_slots.length == 0){
						// Then this piece is invalid as nothing can be placed above it.
						discard_mod = true;
					} else {
						// There were choices, so we're safe.
						slots[i - 1][j] = possible_new_slots;
					}
				}
			}
		}
	}
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}


function constrain(){
	var i_off = getRandomInt(scale);
	var j_off = getRandomInt(scale);

	

	for(var i = 0; i < scale; i++){
		for(var j = 0; j < scale; j++){
			// For each module in our current slot we consider it potentially
			// valid. So let's remove all around it that this potentially valid
			// module invalidates.

			for(idx in slots[i][j]){
				mod = slots[i][j][idx];
				// Current module that we're looking at. It is considered valid
				// until proven otherwise.
				var current_mod = modules[mod];
				var discard_mod = false;

				// If it is on second row or greater
				if(i > 0 && j == 4){
					// Look at modules above it. if they are invalid, remove them.
					console.log(current_mod.top);
					console.log('  c', slots[i - 1][j]);
					possible_new_slots = slots[i - 1][j].filter(function(elem, idx){
						console.log('    ', elem, modules[elem].bottom);
						return modMatch(current_mod.top, modules[elem].bottom);
					});

					console.log(possible_new_slots);
					if(possible_new_slots.length == 0){
						// Then this piece is invalid as nothing can be placed above it.
						discard_mod = true;
					} else {
						// There were choices, so we're safe.
						slots[i - 1][j] = possible_new_slots;
					}
				}
			}
		}
	}
}


function render(){
	for(var i = 0; i < scale; i++){
		for(var j = 0; j < scale; j++){
			images = [];
			for(idx in slots[i][j]){
				mod = slots[i][j][idx];

				images.push('<img src="/assets/img/w/' + modules[mod].img + '" class="mod"/>')
			}
			$('#r' + i + 'c' + j).html(images.join(''))
		}
	}
}

render();
