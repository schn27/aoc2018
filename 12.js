"use strict";

function calc() {
	const lines = input.split("\n");
	const initial = lines[0].match(/[#\.]/g);

	const rules = lines.slice(2).reduce((a, e) => {
		const tokens = e.split(" => ");
		a[tokens[0]] = tokens[1];
		return a;
	}, []);

	let state = initial.slice();
	
	const getPart1 = 20;
	let part1 = null;

	const gen1 = 1000;
	const gen2 = 5000;
	let valueGen1 = null;

	for (let i = 0; i < gen2; ++i) {
		if (i == getPart1) {
			part1 = Object.keys(state).map(Number).reduce((a, e) => a + e, 0);
		}

		if (i == gen1) {
			valueGen1 = Object.keys(state).map(Number).reduce((a, e) => a + e, 0);
		}

		state = nextGen(state, rules);
	}

	let valueGen2 = Object.keys(state).map(Number).reduce((a, e) => a + e, 0);
	let part2 = valueGen1 + (valueGen2 - valueGen1) / (gen2 - gen1) * (50000000000 - gen1);

	return part1 + " " + part2;
}

function nextGen(state, rules) {
	let next = [];

	let keys = Object.keys(state).map(Number);
	let min = Math.min(...keys);
	let max = Math.max(...keys);

	for (let k = min - 2; k <= max + 2; ++k) {
		const pent = [state[k - 2] || ".", state[k - 1] || ".", state[k] || ".", state[k + 1] || ".", state[k + 2] || "."].join("");
		if (rules[pent] == "#") {
			next[k] = "#";
		}
	}

	return next;
}

const test = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

const input = `initial state: ###..#...####.#..###.....####.######.....##.#####.##.##..###....#....##...##...##.#..###..#.#...#..#

.###. => .
..#.. => .
.#### => .
.##.. => #
#.#.# => .
..#.# => #
#.##. => #
#...# => #
..... => .
##..# => #
.#.#. => .
..##. => #
##.#. => .
###.. => .
.#... => #
..### => .
#..## => .
...#. => .
###.# => #
.##.# => .
.#.## => .
....# => .
##### => .
#.#.. => #
...## => #
#.... => .
#.### => #
##... => #
.#..# => .
####. => .
#..#. => #
##.## => #`;
