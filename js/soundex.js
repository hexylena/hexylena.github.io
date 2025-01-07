const encoding = {
	'A': 0, 'E': 0, 'I': 0, 'O': 0, 'U': 0, 'H': 0, 'W': 0, 'Y': 0,
	'B': 1, 'F': 1, 'P': 1, 'V': 1,
	'C': 2, 'G': 2, 'J': 2, 'K': 2, 'Q': 2, 'S': 2, 'X': 2, 'Z': 2,
	'D': 3, 'T': 3,
	'L': 4,
	'M': 5, 'N': 5,
	'R': 6
};

const decoding = {
	0: 'AEIOUAEIOUAEIOUHWY',
	1: 'BFPV',
	2: 'CGJKQSXZ',
	3: 'DT',
	4: 'L',
	5: 'MN',
	6: 'R'
};

function soundex(name) {
	// Discard all non-letter characters from surname: dashes, spaces, apostrophes, and so on.
	let arr = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
	let first = arr[0];
	arr = arr.map((letter) => {
		return encoding[letter];
	});

	// Remove duplicates
	let last = "";
	arr = arr.map((letter) => {
		if (letter !== last) {
			last = letter;
			return letter;
		} else {
			last = letter;
			return null;
		}
	}).filter((letter) => {
		return letter !== null;
	});

	arr[0] = first;
	arr = arr.filter((letter) => {
		return letter !== 0;
	});
	return arr.slice(0, 4).join('').padEnd(4, '0');
}

function reverseSoundex(opts){
	// cannot unstrip 0s, so, we can add them randomly, maybe
	let arr = opts.pattern.split('');
	arr = arr.map((letter, i) => {
		if(i === 0){
			if(encoding[letter] === 0 && !(letter == 'H' || letter == 'W' || letter == 'Y')){
				return letter
			} else {
				return [letter, '0'];
			}
		}
		if (random() < 0.1 && opts.zero) {
			return [letter, '0'];
		} else {
			return letter;
		}
	}).flatten();
	console.log(arr);

	// cannot uncollapse, so we can duplicate them randomly
	let dupe_chance = parseFloat(opts.duplicate) / 1000;
	arr = arr.map((letter) => {
		if (random() < dupe_chance){
			return [letter, letter];
		}
		return letter;
	}).flatten();

	// un-encode
	arr = arr.map((letter) => {
		let i = parseInt(letter);
		if (isNaN(i)) {
			return letter;
		}
		return decoding[i].split('').random();
	});
	return arr.join('');
}
