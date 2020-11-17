"use strict";

function calc() {
	const [depth, targetX, targetY] = input.match(/\d+/g).map(Number);
	const target = {x: targetX, y: targetY};

	const cave = new Cave(depth, target);
	
	const part1 = getRisk(cave, target);
	const part2 = findPath(cave, target);

	return `${part1} ${part2}`;
}

const [ROCKY, WET, NARROW] = [0, 1, 2];
const [TORCH, GEAR, NEITHER] = [0, 1, 2];
const MOVE_TIME = 1;
const CHANGE_TIME = 7;

function Cave(depth, target) {
	const erosionLevel = {};
	const cave = {};

	this.get = (x, y) => {
		const v = cave[getKey(x, y)];
		return v !== undefined ? v : calcCave(x, y);
	};

	function getKey(x, y) {
		return [x, y].join(";");
	}

	function calcCave(x, y) {
		const key = getKey(x, y);
		cave[key] = getErosionLevel(x, y) % 3;
		return cave[key];
	}

	function getErosionLevel(x, y) {
		const v = erosionLevel[getKey(x, y)];
		return v !== undefined ? v : calcErosionLevel(x, y);
	}

	function calcErosionLevel(x, y) {
		let geoIndex = undefined;

		if ((x == 0 && y == 0) || (x == target.x && y == target.y)) {
			geoIndex = 0;
		} else if (y == 0) {
			geoIndex = x * 16807; 
		} else if (x == 0) {
			geoIndex = y * 48271;
		} else {
			geoIndex = getErosionLevel(x - 1, y) * getErosionLevel(x, y - 1);
		}

		const key = getKey(x, y);
		erosionLevel[key] = (geoIndex + depth) % 20183;
		return erosionLevel[key];
	}
}

function getRisk(cave, target) {
	let risk = 0;
	
	for (let y = 0; y <= target.y; ++y) {
		for (let x = 0; x <= target.x; ++x) {
			risk += cave.get(x, y);
		}
	}

	return risk;
}

function findPath(cave, target) {
	let time = Infinity;

	const history = new History();

	let queue = [{
		x: 0,
		y: 0,
		equipment: TORCH,
		time: 0,
	}];

	while (queue.length > 0) {
		const state = queue.shift();

		if ((state.x == target.x) && (state.y == target.y)) {
			time = Math.min(state.time, time);
		} else {
			let moves = getMoves(cave, target, state);
			moves = moves.filter(m => m.time < history.getTime(m));
			moves.forEach(m => history.setTime(m));
			queue.push(...moves);

			queue = queue.filter(m => m.time <= history.getTime(m) && (m.time + getDist(m, target)) <= time);
			queue.sort((a, b) => (a.time + getDist(a, target)) - (b.time + getDist(b, target)));
		}
	}

	return time;
}

function getDist(a, b) {
	return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function History() {
	const history = {};
	history["0;0;0"] = 0;

	this.getTime = (move) => {
		const v = history[getKey(move)];
		return v !== undefined ? v : Infinity;
	}

	this.setTime = (move) => history[getKey(move)] = move.time;

	this.log = () => console.log(history);

	function getKey(move) {
		return [move.x, move.y, move.equipment].join(";");
	}
}

function getMoves(cave, target, state) {
	const coords = [
		{x: state.x + 1, y: state.y}, 
		{x: state.x - 1, y: state.y}, 
		{x: state.x, y: state.y + 1},
		{x: state.x, y: state.y - 1}
	];
	
	let moves = coords.filter(c => c.x >= 0 && c.y >= 0).map(c => {
		const validEquipment = getEquipment(state.equipment, cave.get(c.x, c.y), cave.get(state.x, state.y));

		return {
			x: c.x, 
			y: c.y, 
			equipment: validEquipment,
			time: state.time + MOVE_TIME 
			                 + getEquipmentTime(validEquipment, state.equipment) 
			                 + getFinalTorchTime(validEquipment, c, target)
		};
	});

	return moves;
}

function getEquipment(current, place1, place2) {
	if (place1 == place2) {
		return current;
	}

	if ((place1 == ROCKY && place2 == WET) || (place1 == WET && place2 == ROCKY)) {
		return GEAR;
	}

	if ((place1 == ROCKY && place2 == NARROW) || (place1 == NARROW && place2 == ROCKY)) {
		return TORCH;
	}

	return NEITHER;
}

function getEquipmentTime(validEquipment, currentEquipment) {
	return (validEquipment != currentEquipment) ? CHANGE_TIME : 0;
}

function getFinalTorchTime(validEquipment, coords, target) {
	return ((coords.x == target.x) && (coords.y == target.y) && (validEquipment	 != TORCH)) ? CHANGE_TIME : 0;
}

const input = `depth: 11991
target: 6,797`;
