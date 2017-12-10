
// Adapt to viewport
var inter_level_spacing = 10;
var floors = getRandomInteger(2, 4);
var width = ($('article.post').width() - (floors * 20)) / floors;
var room_subdivisions = 8;
var room_size = width / room_subdivisions;
var bw = room_size;
var street_sides = getRandomInteger(1, 2);
var street_exits = getRandomInteger(1, street_sides);
var house_width = width - (street_sides == 2 ? bw : 0);
var vertical_subdivisions = getRandomInteger(room_subdivisions * 0.6, room_subdivisions * 1.6);
var horizontal_subdivisions = street_sides == 2 ? room_subdivisions - 1 : room_subdivisions
var height = (width / room_subdivisions) * vertical_subdivisions;
var stairwell_type = getRandomInteger(0, 1);
// If there are two roads, it's square (by original algorithm)
if(street_sides == 2){
	height = width;
	vertical_subdivisions = horizontal_subdivisions + 1;
}

external_doors = [];
// internal crap
pos_idx = getRandomInteger(0, 2);

for(var floor = 0; floor < floors; floor++){
	var svg = d3.select("#apartment").append('svg')
		.attr("width", width + 20)
		.attr("height", height);

	walkways = [
		[0, 0, width, bw]
	]

	if(street_sides == 2){
		walkways.push([width - bw, 0, bw, height]);
	}

	// Let's add some paths
	draw_rects('walkways', walkways, {'fill': 'grey', 'stroke': 'none'});
	draw_rects('house_outline', [[0, bw, width - (street_sides == 2 ? bw : 0), height - bw]], {'fill': '#eee', 'stroke': 'black'});

	// Entranceway
	room_subs = [];
	room_subdiv_x = house_width / room_subdivisions;
	room_subdiv_y = (height - bw) / room_subdivisions;
	for(var i = 0; i < horizontal_subdivisions; i++) {
		for(var j = 1; j < vertical_subdivisions; j++) {
			room_subs.push([
				i * room_size,
				j * room_size,
				room_size,
				room_size,
				{'fill': 'rgba(0, 0, 0, ' + getRandomArbitrary(0.0, 0.2) + ''}
			])
		}
	}
	draw_rects('rooms', room_subs, {'fill': 'rgba(0, 0, 0, 0.1)', 'stroke': 'rgba(0, 0, 0, 0.2)'});

	if(pos_idx == 0){
		pos = 0 * room_size
	} else if(pos_idx == 1) {
		pos = Math.floor(horizontal_subdivisions / 2) * room_size;
	} else {
		pos = (horizontal_subdivisions - 1) * room_size;
	}

	if(floor == 0){
		if(street_exits == 1 && street_sides == 2){
			// randomly choose a side.
			if(getRandomInteger(0, 1) == 0){
				external_doors.push([pos, bw - room_size / 3, room_size, room_size / 3, {'side': 'top'}])
			} else {
				external_doors.push([house_width - room_size / 3, bw + pos, room_size / 3, room_size, {'side': 'right'}]);
			}
		} else if (street_sides == 1){
			external_doors.push([pos, bw - room_size / 3, room_size, room_size / 3, {'side': 'top'}]);
		} else if (street_sides == 2){
			external_doors.push([pos, bw - room_size / 3, room_size, room_size / 3, {'side': 'top'}]);
			external_doors.push([house_width, bw + pos, room_size / 3, room_size, {'side': 'right'}]);
		}
	}

	// hallway
	halls = [];
	if (external_doors.length == 1){
		// draw a doorway to the back wall.
		if(external_doors[0][4].side == 'top'){
			halls.push([external_doors[0][0], bw, external_doors[0][2], height - room_size])
		} else {
			halls.push([0, external_doors[0][1], house_width, external_doors[0][3]])
		}
	} else {
		// draw a doorway to the back wall.
		halls.push([external_doors[0][0], bw, external_doors[0][2], height - bw])
		halls.push([0, external_doors[1][1], house_width, external_doors[1][3]])
	}

	draw_rects('halls', halls, {'fill': '#ccc', 'stroke': '#ccc'});
	if(floor == 0){
	draw_rects('external_doors', external_doors, {'fill': 'red', 'stroke': 'black'});
	}

	// Pick a stairwell position.
	if(street_exits == 1){
		if(pos_idx == 0){
			stairwell = [
				[room_size             , bw             , room_size , room_size , {'fill': 'rgb(180 , 180 , 255)'}] ,
				[room_size + room_size , bw             , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[room_size             , bw + room_size , room_size , room_size , {'fill': 'rgb(0   , 0   , 255)'}] ,
				[room_size + room_size , bw + room_size , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
			]
		} else if(pos_idx == 1){
			stairwell = [
				[(4 * room_size) + room_size             , bw             , room_size , room_size , {'fill': 'rgb(180 , 180 , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw             , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[(4 * room_size) + room_size             , bw + room_size , room_size , room_size , {'fill': 'rgb(0   , 0   , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw + room_size , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
			]
		} else if(pos_idx == 2){
			stairwell = [
				[(4 * room_size) + room_size             , bw             , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw             , room_size , room_size , {'fill': 'rgb(180 , 180 , 255)'}] ,
				[(4 * room_size) + room_size             , bw + room_size , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw + room_size , room_size , room_size , {'fill': 'rgb(0   , 0   , 255)'}] ,
			]
		}
	} else if(street_exits == 2){
		if(pos_idx == 0){
			stairwell = [
				[room_size             , bw + (1 * room_size) , room_size , room_size , {'fill': 'rgb(180 , 180 , 255)'}] ,
				[room_size + room_size , bw + (1 * room_size) , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[room_size             , bw + (2 * room_size) , room_size , room_size , {'fill': 'rgb(0   , 0   , 255)'}] ,
				[room_size + room_size , bw + (2 * room_size) , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
			]
		} else if(pos_idx == 1){
			stairwell = [
				[(4 * room_size) + room_size             , bw             , room_size , room_size , {'fill': 'rgb(180 , 180 , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw             , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[(4 * room_size) + room_size             , bw + room_size , room_size , room_size , {'fill': 'rgb(0   , 0   , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw + room_size , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
			]
		} else if(pos_idx == 2){
			stairwell = [
				[(4 * room_size) + room_size             , bw             , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw             , room_size , room_size , {'fill': 'rgb(180 , 180 , 255)'}] ,
				[(4 * room_size) + room_size             , bw + room_size , room_size , room_size , {'fill': 'rgb(90  , 90  , 255)'}] ,
				[(4 * room_size) + room_size + room_size , bw + room_size , room_size , room_size , {'fill': 'rgb(0   , 0   , 255)'}] ,
			]
		}
	}
	draw_rects('stairwell', stairwell, {'fill': 'blue', 'stroke': 'black'})
}
