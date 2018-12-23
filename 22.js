"use strict";

function calc() {
	const [depth, targetX, targetY] = test.match(/\d+/g).map(Number);
	const target = [targetX, targetY];

	const cave = getCave(depth, target, [target[0], target[1]]);
	
	const part1 = getRisk(cave, target);
	const part2 = findPath(cave, target);

	return `${part1} ${part2}`;
}

function getCave(depth, target, enlarge) {
	const cave = [];

	for (let y = 0; y <= target[1] + enlarge[1]; ++y) {
		cave[y] = [];
		for (let x = 0; x <= target[0] + enlarge[0]; ++x) {
			cave[y][x] = {type: 0, geoIndex: 0, erosionLevel: 0};
			cave[y][x].geoIndex = (() => {
				if ((x == 0 && y == 0) || (x == target[0] && y == target[1])) {
					return 0;
				} else if (y == 0) {
					return x * 16807; 
				} else if (x == 0) {
					return y * 48271;
				} else {
					return cave[y][x - 1].erosionLevel * cave[y - 1][x].erosionLevel;
				}
			})();
			cave[y][x].erosionLevel = (cave[y][x].geoIndex + depth) % 20183;
			cave[y][x].type = cave[y][x].erosionLevel % 3;
		}
	}

	return cave;	
}

function getRisk(cave, target) {
	let risk = 0;
	
	for (let y = 0; y <= target[1]; ++y) {
		for (let x = 0; x <= target[0]; ++x) {
			risk += cave[y][x].type;
		}
	}

	return risk;
}

function findPath(cave, target) {
}

const test = `depth: 510
target: 10,10`;

const input = `depth: 11991
target: 6,797`;
