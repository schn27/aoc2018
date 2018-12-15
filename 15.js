"use strict";

function calc() {
	let units0 = [];

	const map = input.split("\n").map((l, y) => l.split("").map((c, x) => {
		if (c == "G" || c == "E") {
			units0.push({type: c, x: x, y: y, hp: 200, a: 3});
			return ".";
		} else {
			return c;
		}
	}));

	let part1 = null;
	let part2 = null;

	for (let a = 3; part2 == null; ++a) {
		let units = [];
		units0.forEach(u => units.push({...u}));
		units.forEach(u => {
			if (u.type == "E") {
				u.a = a;
			}
		});

		let move = 0;
		let noEnemy = false;

		for (; ; ++move) {
			units.sort((a, b) => a.y != b.y ? a.y - b.y : a.x - b.x).forEach(u => {
				if (!noEnemy && u.hp > 0) {
					noEnemy = !doMove(u, units, map) && 
						(units.filter(u => u.hp > 0 && u.type == "G").length == 0 || 
							units.filter(u => u.hp > 0 && u.type == "E").length == 0);
				}
			});

			if (noEnemy) {
				break;
			}
		}

		printState(map, units);
		console.log(a + " " + move);

		if (part1 == null) {
			part1 = move * units.filter(u => u.hp > 0).reduce((a, u) => a + u.hp, 0);
		}

		if (units.filter(u => u.hp > 0 && u.type == "E").length == units0.filter(u => u.hp > 0 && u.type == "E").length) {
			part2 = move * units.filter(u => u.hp > 0).reduce((a, u) => a + u.hp, 0);
		}
	}

	return `${part1} ${part2}`;
}

function doMove(unit, units, map) {
	const enemyType = unit.type == "G" ? "E" : "G";

	const enemies = units.filter(u => u.type == enemyType && u.hp > 0);

	if (doAttack(unit, enemies)) {
		return true;
	}

	let move = undefined;
	let distance = undefined;
	const moves = [[0, -1], [-1, 0], [1, 0], [0, 1]];

	const localMap = getLocalMap(map, units.filter(u => u.hp > 0 && u !== unit));

	let targetPoints = [];
	enemies.forEach(e => moves.forEach(m => {
		const x = e.x + m[0];
		const y = e.y + m[1];
		if (localMap[y][x] == ".") {
			targetPoints.push({x: x, y: y});
		}
	}));

	targetPoints.sort((a, b) => a.y != b.y ? a.y - b.y : a.x - b.x).forEach(e => {
		if (localMap[e.y][e.x] != ".") {
			return;
		}

		let wave = [];

		for (let y = 0; y < localMap.length; ++y) {
			wave.push(new Array(localMap[y].length));
		}

		wave[e.y][e.x] = 0;

		let step;

		for (step = 1; wave[unit.y][unit.x] == undefined; ++step) {
			let moved = false;

			for (let y = 0; y < wave.length; ++y) {
				for (let x = 0; x < wave[y].length; ++x) {
					if (wave[y][x] == step - 1) {
						moves.forEach(move => {
							if ((localMap[y + move[1]][x + move[0]] == ".") && (wave[y + move[1]][x + move[0]] == undefined)) {
								wave[y + move[1]][x + move[0]] = step;
								moved = true;
							}						
						});
					}
				}
			}

			if (!moved) {
				return;
			}
		}

		--step;

		if (distance == undefined || step < distance) {
			distance = step;
			for (let i = 0; i < moves.length; ++i) {
				if (wave[unit.y + moves[i][1]][unit.x + moves[i][0]] == step - 1) {
					move = moves[i];
					break;
				}
			}
		}
	});

	if (move != undefined) {
		unit.x += move[0];
		unit.y += move[1];
	}

	return doAttack(unit, enemies);
}

function doAttack(unit, enemies) {
	let attacked = false;

	const targets = enemies.filter(e => ((Math.abs(e.x - unit.x) == 1) && (e.y == unit.y)) || ((Math.abs(e.y - unit.y) == 1) && (e.x == unit.x)))
		.sort((a, b) => (a.hp != b.hp) ? (a.hp - b.hp) : ((a.y != b.y) ? (a.y - b.y) : (a.x - b.x)));

	if (targets.length > 0) {
		targets[0].hp -= unit.a;
		attacked = true;
	}

	return attacked;
}

function getLocalMap(map, units) {
	let res = [];

	for (let y = 0; y < map.length; ++y) {
		res.push(map[y].slice());
	}

	units.forEach(u => res[u.y][u.x] = u.type);

	return res;
}

function printState(map, units) {
	let fullMap = getLocalMap(map, units.filter(u => u.hp > 0));
	fullMap.forEach(row => console.log(row.join("")));
	units.forEach(u => console.log(`${u.type} ${u.x} ${u.y} ${u.hp}`));
}

const test = `#######
#.G...#
#...EG#
#.#.#G#
#..G#E#
#.....#
#######`;

const test2 = `#######
#G..#E#
#E#E.E#
#G.##.#
#...#E#
#...E.#
#######`;

const test3 = `#######
#E..EG#
#.#G.E#
#E.##E#
#G..#.#
#..E#.#
#######`;

const test4 = `#########
#G......#
#.E.#...#
#..##..G#
#...##..#
#...#...#
#.G...G.#
#.....G.#
#########`;

const input = `################################
######..#######.################
######...######..#.#############
######...#####.....#############
#####....###G......#############
#####.#G..#..GG..##########..#.#
#######G..G.G.....##..###......#
######....G...........#.....####
#######.G......G........##..####
######..#..G.......E...........#
######..G................E..E..#
####.............E..........#..#
#####.........#####........##..#
########.....#######.......#####
########..G.#########......#####
#######.....#########....#######
#######G....#########..G...##.##
#.#.....GG..#########E##...#..##
#.#....G....#########.##...#...#
#....##......#######..###..##E.#
####G.........#####...####....##
####..G...............######..##
####....#.....##############.###
#..#..###......#################
#..#..###......#################
#.....#####....#################
###########.E.E.################
###########.E...################
###########.E..#################
#############.##################
#############.##################
################################`;