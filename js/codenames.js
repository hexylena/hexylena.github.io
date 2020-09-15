// Author: Helena Rasche (@hexylena)
// License: AGPLv3
var width = 700;
var input = document.getElementById("seed");
var card = document.getElementById("card");
var params = new URL(document.location).searchParams;

$(card).css({ height: $(card).width() + "px" });

const mapping = {
	0: ["black", "black"],
	1: ["black", "green"],
	2: ["black", "white"],
	3: ["green", "black"],
	4: ["green", "green"],
	5: ["green", "white"],
	6: ["white", "black"],
	7: ["white", "green"],
	8: ["white", "white"]
};
const pairs = [
	0, // black black
	1, // black green
	2, // black white
	3, // green black
	4, // green green
	4,
	4,
	5, // green white
	5,
	5,
	5,
	5,
	6, // white black
	7, // white green
	7,
	7,
	7,
	7,
	8, // white white
	8,
	8,
	8,
	8,
	8,
	8
];

function updateSeed() {
	if (input.value.length > 0) {
		render(hashCode(input.value), params.get("opponent") !== null);
	}
}

function render(hash, opponent) {
	// Copy the pairs array
	var p = [...pairs];
	// Shuffle it deterministically
	randomSetSeed(hash);
	shuffle(p);
	p.forEach((v, i) => {
		// Cell coordinates
		if (!opponent) {
			y = Math.floor(i / 5);
			x = i % 5;
		} else {
			y = 4 - Math.floor(i / 5);
			x = 4 - (i % 5);
		}

		document.getElementById(`${y}.${x}`).style.backgroundColor =
			mapping[v][opponent ? 1 : 0];

		//Debugging
		//document.getElementById(`${y}.${x}`).style.color = 'grey';
		//document.getElementById(`${y}.${x}`).textContent = v;
	});

	if (opponent) {
		document.getElementById("p2").style.display = "none";
	} else {
		const myUrlWithParams = new URL(
			"https://example.org/2020/09/15/codenames.html"
		);
		myUrlWithParams.searchParams.append("key", input.value);
		myUrlWithParams.searchParams.append("opponent", true);
		document.getElementById("p2").href = myUrlWithParams.href.substring(19);
	}
}

input.addEventListener("input", updateSeed);

if (params.get("key")) {
	input.value = params.get("key");
}

updateSeed();
