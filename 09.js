"use strict";

function calc() {
	const [players, lastMarble] = input.match(/\d+/g);

	let circle = {value: 0, prev: null, next: null};
	circle.prev = circle.next = circle;

	let scores = [];
	
	for (let i = 0; i < players; ++i) {
		scores.push(0);
	}

	let part1 = null;

	for (let marble = 1; marble < lastMarble * 100; ++marble) {
		if ((marble % 23) != 0) {
			let m0 = circle.next.next;
			let m = {value: marble, prev: m0.prev, next: m0};
			m0.prev.next = m;
			m0.prev = m;
			circle = m;
		} else {
			let m0 = circle.prev.prev.prev.prev.prev.prev.prev;
			m0.prev.next = m0.next;
			m0.next.prev = m0.prev;
			circle = m0.next;

			scores[(marble - 1) % players] += marble + m0.value;
		}

		if (marble == lastMarble) {
			part1 = Math.max(...scores);
		}
	}

	const part2 = Math.max(...scores);

	return part1 + " " + part2;
}

const input = `463 players; last marble is worth 71787 points`;
