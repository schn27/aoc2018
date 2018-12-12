"use strict";

function calc() {
	const lines = input.split("\n");
	let state = lines[0].match(/[#\.]/g);

	const rules = lines.slice(2).reduce((a, e) => {
		const tokens = e.split(" => ");
		a[tokens[0]] = tokens[1];
		return a;
	}, []);

	const getValue = s => Object.keys(s).map(Number).reduce((a, e) => a + e, 0);

	const genPart1 = 20;
	let part1 = null;

	const gen1 = 1000;
	const gen2 = 5000;
	let gen1Value = null;

	for (let gen = 0; gen < gen2; ++gen) {
		if (gen == genPart1) {
			part1 = getValue(state);
		}

		if (gen == gen1) {
			gen1Value = getValue(state);
		}

		state = nextGen(state, rules);
	}

	const part2 = gen1Value + (getValue(state) - gen1Value) / (gen2 - gen1) * (50000000000 - gen1);

	return part1 + " " + part2;
}

function nextGen(state, rules) {
	const keys = Object.keys(state).map(Number);
	const min = Math.min(...keys);
	const max = Math.max(...keys);
	const next = [];

	for (let k = min - 2; k <= max + 2; ++k) {
		const group = [state[k - 2] || ".", state[k - 1] || ".", state[k] || ".", state[k + 1] || ".", state[k + 2] || "."].join("");
		if (rules[group] == "#") {
			next[k] = "#";
		}
	}

	return next;
}

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
