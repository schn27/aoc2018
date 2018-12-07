"use strict";

function calc() {
	return getPart1(createGraph(input)) + " " + getPart2(createGraph(input), 5, 60);
}

function createGraph(input) {
	let o = {};

	input.split("\n").map(e => e.match(/[A-Z]\s/g).map(e => e[0])).forEach(e => {
		o[e[0]] = o[e[0]] || {ready: false, prev: []};
		o[e[1]] = o[e[1]] || {ready: false, prev: []};
		o[e[1]].prev[e[0]] = 1;
	});	

	return o;
}

function getPart1(o) {
	let seq = [];
	let finished = false;

	const keys = Object.keys(o).sort();

	while (!finished) {
		let found = false;

		for (let i = 0; i < keys.length && !found; ++i) {
			const k = keys[i];

			if (!o[k].ready && Object.keys(o[k].prev).reduce((a, e) => a & o[e].ready, true)) {
				o[k].ready = true;
				seq.push(k);
				found = true;
			}
		}

		finished = seq.length == Object.keys(o).length;
	}

	return seq.join("");
}

function getPart2(o, w, t0) {
	let finished = false;

	const keys = Object.keys(o).sort();
	const workers = new Array(w);

	for (let i = 0; i < workers.length; ++i) {
		workers[i] = {time: 0, key: null};
	}

	let t = 0;

	for (; !finished; ++t) {
		workers.filter(w => w.time > 0).forEach(w => {
			if (--w.time == 0) {
				o[w.key].ready = true;
			}
		});

		workers.filter(w => w.time == 0).forEach(w => {
			let found = false;

			for (let i = 0; i < keys.length && !found; ++i) {
				const k = keys[i];

				if (!o[k].ready 
						&& workers.filter(w => w.time > 0).map(w => w.key).indexOf(k) < 0 
						&& Object.keys(o[k].prev).reduce((a, e) => a & o[e].ready, true)) {
					w.key = k;
					w.time = t0 + k.charCodeAt(0) - "A".charCodeAt(0) + 1;
					found = true;
				}
			}
		});

		finished = workers.filter(w => w.time > 0).length == 0;
	}

	return t - 1;
}

const input = `Step A must be finished before step I can begin.
Step M must be finished before step Q can begin.
Step B must be finished before step S can begin.
Step G must be finished before step N can begin.
Step Y must be finished before step R can begin.
Step E must be finished before step H can begin.
Step K must be finished before step L can begin.
Step H must be finished before step Z can begin.
Step C must be finished before step P can begin.
Step W must be finished before step U can begin.
Step V must be finished before step L can begin.
Step O must be finished before step N can begin.
Step U must be finished before step I can begin.
Step D must be finished before step P can begin.
Step Q must be finished before step L can begin.
Step F must be finished before step Z can begin.
Step L must be finished before step N can begin.
Step P must be finished before step S can begin.
Step I must be finished before step S can begin.
Step S must be finished before step R can begin.
Step T must be finished before step N can begin.
Step N must be finished before step X can begin.
Step Z must be finished before step J can begin.
Step R must be finished before step J can begin.
Step J must be finished before step X can begin.
Step E must be finished before step I can begin.
Step T must be finished before step R can begin.
Step I must be finished before step N can begin.
Step K must be finished before step C can begin.
Step B must be finished before step D can begin.
Step K must be finished before step T can begin.
Step E must be finished before step P can begin.
Step F must be finished before step I can begin.
Step O must be finished before step U can begin.
Step I must be finished before step J can begin.
Step S must be finished before step Z can begin.
Step L must be finished before step J can begin.
Step F must be finished before step T can begin.
Step F must be finished before step P can begin.
Step I must be finished before step T can begin.
Step G must be finished before step S can begin.
Step V must be finished before step U can begin.
Step F must be finished before step R can begin.
Step L must be finished before step R can begin.
Step Y must be finished before step D can begin.
Step M must be finished before step E can begin.
Step U must be finished before step L can begin.
Step C must be finished before step D can begin.
Step W must be finished before step N can begin.
Step S must be finished before step N can begin.
Step O must be finished before step S can begin.
Step B must be finished before step T can begin.
Step V must be finished before step T can begin.
Step S must be finished before step X can begin.
Step V must be finished before step P can begin.
Step F must be finished before step L can begin.
Step P must be finished before step R can begin.
Step D must be finished before step N can begin.
Step C must be finished before step L can begin.
Step O must be finished before step Q can begin.
Step N must be finished before step Z can begin.
Step Y must be finished before step L can begin.
Step B must be finished before step K can begin.
Step P must be finished before step Z can begin.
Step V must be finished before step Z can begin.
Step U must be finished before step J can begin.
Step Q must be finished before step S can begin.
Step H must be finished before step F can begin.
Step E must be finished before step O can begin.
Step D must be finished before step F can begin.
Step D must be finished before step X can begin.
Step L must be finished before step S can begin.
Step Z must be finished before step R can begin.
Step K must be finished before step X can begin.
Step M must be finished before step V can begin.
Step A must be finished before step M can begin.
Step B must be finished before step W can begin.
Step A must be finished before step P can begin.
Step W must be finished before step Q can begin.
Step R must be finished before step X can begin.
Step M must be finished before step H can begin.
Step F must be finished before step S can begin.
Step K must be finished before step Q can begin.
Step Y must be finished before step Q can begin.
Step W must be finished before step S can begin.
Step Q must be finished before step T can begin.
Step K must be finished before step H can begin.
Step K must be finished before step D can begin.
Step E must be finished before step T can begin.
Step Y must be finished before step E can begin.
Step A must be finished before step O can begin.
Step G must be finished before step E can begin.
Step C must be finished before step O can begin.
Step G must be finished before step H can begin.
Step Y must be finished before step I can begin.
Step V must be finished before step S can begin.
Step B must be finished before step R can begin.
Step B must be finished before step X can begin.
Step V must be finished before step I can begin.
Step N must be finished before step J can begin.
Step H must be finished before step I can begin.`;
