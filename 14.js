"use strict";

function calc() {
	const number = +input;

	let recipes = ["3", "7"];
	let e1 = 0;
	let e2 = 1;

	let part1 = [];
	let part2 = null

	while (part2 == null && recipes.length < 30000000) {
		let sum = +recipes[e1] + +recipes[e2];
		recipes.push(...sum.toString().split(""));

		if (recipes.length > number && recipes.length < number + 10) {
			part1.push(...sum.toString().split(""));
		}

		const index = recipes.slice(-input.length - 1).join("").indexOf(input);

		if (index >= 0) {
			part2 = recipes.length - input.length - 1 + index;
		}

		e1 = (e1 + +recipes[e1] + 1) % recipes.length;
		e2 = (e2 + +recipes[e2] + 1) % recipes.length;
	}

	return part1.join("") + " " + part2;
}

const input = `540561`;