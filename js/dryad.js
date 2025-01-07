const dryad_x = ['ABC', 'DEF', 'GHJ', 'KI', 'MN', 'PQR', 'ST', 'UV', 'WX', 'YZ'];
const dryad_y = ['ABCDEF', 'GHIJKL', 'MNOPQR', 'STUVWXY'];
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXY'.split('');
const nato = ['ALPHA','BRAVO','CHARLIE','DELTA','ECHO','FOXTROT','GOLF','HOTEL','INDIA','JULIETT','KILO','LIMA','MIKE','NOVEMBER','OSCAR','PAPA','QUEBEC','ROMEO','SIERRA','TANGO','UNIFORM','VICTOR','WHISKEY','XRAY','YANKEE','ZULU']

function toNato(letter) {
	return nato[letter.charCodeAt(0) - 65];
}

function fromNato(nato) {
	return nato[0];
}

function generateSheet(){
	let table = {};

	for (let i = 0; i < dryad_y.length; i++) {
		for (let j = 0; j < dryad_y[i].length; j++) {
			let row = {};
			let alpha2 = alpha.slice().shuffle();
			
			let o = 0;
			for (let k = 0; k < dryad_x.length; k++){
				let len = k == 0 ? 4 : dryad_x[k].length;
				let lets = alpha2.slice(o, o + len)
				// Keyed by numeric index
				row[k] = lets;
				o += len;
			}

			let row_key = dryad_y[i][j]
			table[row_key] = row;
			let nato_row = nato[row_key.charCodeAt(0) - 65]
			table[nato_row] = row;
			table[nato_row.slice(0, 1)] = row;
		}
	}
	return table;
}

function buildTable(table, sheet){
	table.innerHTML = "";

	for (let i = 0; i < dryad_y.length; i++) {
		// Add a header
		let row = table.insertRow();
		row.innerHTML = ["", ...dryad_x].map((g, i) => {
			return i === 1 ? `<td>&nbsp;${g}</td>` : `<td>${g}</td>`
		}).join("");
		row.classList.add('header');

		row = table.insertRow();
		row.innerHTML = "<td></td>" + dryad_x.map((_, i) => `<td>${i}</td>`).join("");
		row.classList.add('header2');

		// Row contents
		for (let j = 0; j < dryad_y[i].length; j++) {
			row = table.insertRow();
			row.insertCell().innerHTML = dryad_y[i][j];

			for(let k = 0; k < dryad_x.length; k++){
				row.insertCell().innerText = sheet[dryad_y[i][j]][k].join("");
			}
		}
	}
}

function authFindIndex(row, needle){
	let n = needle.slice(0, 1).toUpperCase();
	for (let i = 0; i <= 9; i++) {
		for (let j = 0; j < row[i].length; j++) {
			if(row[i][j] == n){
				return [i, j];
			}
		}
	}
}
function authAdvance(col, subcol){
	col_width = col == 0 ? 4 : dryad_x[col].length;
	if (subcol + 1 > col_width - 1){
		if (col + 1 > 9){
			return [0, 0];
		}
		return [col + 1, 0];
	}
	return [col, subcol + 1];
}

function authenticate(sheet, first, second, off_v, off_h){
	let [col, subcol] = authFindIndex(sheet[first], second);
	let row = first.slice(0, 1).charCodeAt(0) - 65;

	// below
	row += off_v;
	// wrap around
	row = row % 25;

	// right
	if (off_h > 0){
		for(let i = 0; i < off_h; i++){
			[col, subcol] = authAdvance(col, subcol);
		}
	}
	return sheet[nato[row]][col][subcol];
}

function obtainSetLetter(sheet, a, b){
	a = a.slice(0, 1);
	b = b.slice(0, 1);

	let [col, subcol] = authFindIndex(sheet[a], b);
	let row = a.charCodeAt(0) - 65;
	let sl = authenticate(sheet, a, b, 0, 1);

	return [a, b, sl];
}

function generateSetLetter(sheet, avoid) {
	a = alpha.random();
	b = alpha.random();
	[a, b, sl] = obtainSetLetter(sheet, a, b);

	for(let i = 0; i < 10; i++){
		if (avoid !== sl){
			return [a, b, sl]
		}
		// retry.
		a = alpha.random();
		b = alpha.random();
		[a, b, sl] = obtainSetLetter(sheet, a, b);
	}
};

function encrypt_num(sheet, first, second) {
    let [_a, _b, sl] = obtainSetLetter(sheet, first, second)

    // numeric encryption
    let plain = document.getElementById("plaintext_num").value;
    let encrypted = "";

    let set_row = sheet[sl];
    let used = [];
    plain.split('').map(x => parseInt(x)).forEach((digit) => {
        // pick a letter from the set row with that number.
        let choices = set_row[digit].slice();

        // Remove used values.
        choices = choices.filter((choice) => {
            return !used.includes(choice);
        });

        choices.shuffle();

        if (choices.length > 0  && used.length < 15){
            let choice = choices[0];
            used.push(choice);
            encrypted += choice;
        } else {
            // TODO: RESET STATE
            [first, second, sl] = generateSetLetter(sheet, sl);
            used = [];
            set_row = sheet[sl];
            let choices = set_row[digit].slice();
            choices.shuffle();
            used.push(choices[0]);
            encrypted += `<br/>(SET ${first} ${second}) `;
            encrypted += choices[0];
        }

    });

    return [
        `${sl} ${toNato(sl)}`,
        encrypted
    ];
}

function encrypt_text(sheet, first, second) {
    let [_a, _b, sl] = obtainSetLetter(sheet, first, second)

    // numeric encryption
    let plain = document.getElementById("plaintext_txt").value;
    let encrypted = "";

    let set_row = sheet[sl];
    let used = [];
    plain.split('').forEach((c) => {
	if(used.includes(c) || used.length >= 15){
		used = [];
		[first, second, sl] = generateSetLetter(sheet, sl);
		set_row = sheet[sl];

		encrypted += `<br/>(SET ${first} ${second}) `;
	}
	console.log(toNato(first), toNato(second), sl, 'enc', c)

	// pick letter below
	let choice = belowSorted(sheet, sl, c);
	used.push(c);
	encrypted += choice;

    });

    return [
        `${sl} ${toNato(sl)}`,
        encrypted
    ];
}

// this could be static?
function letterFindIndex(needle){
	return {
		'A': [0, 1],
		'B': [0, 2],
		'C': [0, 3],
		'D': [1, 0],
		'E': [1, 1],
		'F': [1, 2],
		'G': [2, 0],
		'H': [2, 1],
		'J': [2, 2],
		'K': [3, 0],
		'I': [3, 1],
		'M': [4, 0],
		'N': [4, 1],
		'P': [5, 0],
		'Q': [5, 1],
		'R': [5, 2],
		'S': [6, 0],
		'T': [6, 1],
		'U': [7, 0],
		'V': [7, 1],
		'W': [8, 0],
		'X': [8, 1],
		'Y': [9, 0],
		'Z': [9, 1],
	}[needle];
}

function belowSorted(sheet, sl, c){
	let [col, subcol] = letterFindIndex(c);

	// we've got our col/subcol now, yay. Let's find the letter at the
	// intersection of that and our sl
	return sheet[sl][col][subcol];
};
