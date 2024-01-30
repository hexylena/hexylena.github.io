function projectname() {
	var config = {
		consonants: document.getElementById('consonants').value.split(''),
		vowels: document.getElementById('vowels').value.split(''),
		pattern: document.getElementById('pattern').value.split(''),
		count: parseInt(document.getElementById('count').value),
		seed: document.getElementById('seed').value,
		hashed_seed: hashCode(document.getElementById('seed').value),
	}
	randomSetSeed(config.hashed_seed);

	console.log(config);

	var outputs = [];
	for (var j = 0; j < config.count; j++) {
		var output = "";
		for (var i = 0; i < config.pattern.length; i++) {
			if (config.pattern[i] == 'c') {
				output += config.consonants.random();
			} else if (config.pattern[i] == 'v') {
				output += config.vowels.random();
			}
		}
		console.log(output);
		outputs.push(output);
	}
	document.getElementById('results').innerHTML = outputs.map(function (output) {
		return '<li>' + output + '</li>';
	}).join('')
}

// Onload
projectname();

[...document.getElementsByTagName("input")].forEach(function (input) {
	input.addEventListener("input", projectname);
});
