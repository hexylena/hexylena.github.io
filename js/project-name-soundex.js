function projectname() {
	var config = {
		pattern: document.getElementById('pattern').value.split(''),
		count: parseInt(document.getElementById('count').value),
		seed: document.getElementById('seed').value,
		hashed_seed: hashCode(document.getElementById('seed').value),
		duplicate_chance: parseFloat(document.getElementById('dupe').value) / 1000,
	}
	randomSetSeed(config.hashed_seed);

	console.log(config);

	// If there are too few letters in the word to assign three numbers,
	// append zeros until there are three numbers. If there are four or
	// more numbers, retain only the first three.
	//
	// thus, remove any 0s
	let p2 = config.pattern.filter(p => p !== '0');

	// If two or more letters with the same number are adjacent in the
	// original name (before step 1), only retain the first letter; also
	// two letters with the same number separated by 'h', 'w' or 'y' are
	// coded as a single number, whereas such letters separated by a vowel
	// are coded twice. This rule also applies to the first letter.
	//
	// thus randomly duplicate some letters
	let p3 = [p2[0]];
	for (let i = 1; i < p2.length; i++) {
		if(random() < config.duplicate_chance){
			// Duplicate
			p3.push(p2[i]);
			p3.push(p2[i]);
		// } else if(random() < 0.1){
		// 	// Separate by h or w or y
		// 	p3.push(p2[i]);
		} else {
			p3.push(p2[i]);
		}
	}

	// Replace consonants with digits as follows (after the first letter):
	//     b, f, p, v → 1
	//     c, g, j, k, q, s, x, z → 2
	//     d, t → 3
	//     l → 4
	//     m, n → 5
	//     r → 6
	//
	// Retain the first letter of the name and drop all other occurrences
	// of a, e, i, o, u, y, h, w.
	
	let vowels = [
		'a', 'e', 'i', 'o', 'u', 'y', 'h', 'w',
		'a', 'e', 'i', 'o', 'u', 'y', 'h', 'w',
		'a', 'e', 'i', 'o', 'u', 'y', 'h', 'w',
		'a', 'e', 'i', 'o', 'u', 'y', 'h', 'w',
		'a', 'e', 'i', 'o', 'u', 'y', 'h', 'w',
		'ae', 'ai', 'ao', 'au', 'ay', 
		'ea', 'ee', 'ei', 'eo', 'eu', 'ey',
		'ii', 'io', 'iu', 'iy',
		'oa', 'oe', 'oi', 'oo', 'ou', 'oy',
	];
	var outputs = [];
	for (var j = 0; j < config.count; j++) {
		let res = p3[0]; // take starting letter
		res += vowels.random()

		for (let i = 1; i < p3.length; i++) {
			console.log(p3[i]);

			if (p3[i] == '1'){
				res += ['b', 'f', 'p', 'v'].random()
			} else if (p3[i] == '2'){
				res += ['c', 'g', 'j', 'k', 'q', 's', 'x', 'z'].random()
			} else if (p3[i] == '3'){
				res += ['d', 't'].random()
			} else if (p3[i] == '4'){
				res += 'l'
			} else if (p3[i] == '5'){
				res += ['m', 'n'].random()
			} else if (p3[i] == '6'){
				res += 'r'
			}

			if(random() < 0.8){
				res += vowels.random()
			}
			console.log(res);

		}
		outputs.push(res);
	}
	document.getElementById('results').innerHTML = outputs.map(function (output) {
		return '<li>' + output + '</li>';
	}).join('')
}

function randomizeSoundex() {
	let code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').random();
	for(let i = 0; i < 3; i++){
		code += Math.floor(random() * 10);
	}
	document.getElementById('pattern').value = code;
	projectname();
}

// Onload
projectname();

[...document.getElementsByTagName("input")].forEach(function (input) {
	input.addEventListener("input", projectname);
});

