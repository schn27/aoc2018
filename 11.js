"use strict";

function calc() {
	const serial = +input;
	const w = 300;
	const h = 300;

	const f = getField(w, h, serial);

	let maxTotal = -100000;
	let part1 = [];
	let part2 = [];

	for (let size = 1; size <= w; ++size) {
		let sizeMaxTotal = -10000;

		for (let y = 1; y <= h - size + 1; ++y) {
			for (let x = 1; x <= w - size + 1; ++x) {
				const total = getTotal(f, x, y, size);

				if (total > sizeMaxTotal) {
					sizeMaxTotal = total;
				}

				if (total > maxTotal) {
					maxTotal = total;

					if (size == 3) {
						part1 = [x, y];
					}

					part2 = [x, y, size];
				}
			}
		}

		if (size > 3 && sizeMaxTotal < 0) {
			break;	// early exit
		}
	}

	return part1 + " " + part2;
}

function getField(w, h, serial) {
	let res = {data: [], w : w};

	for (let y = 1; y <= h; ++y) {
		for (let x = 1; x <= w; ++x) {
			res.data.push((Math.floor(((x + 10) * y + serial) * (x + 10) / 100) % 10) - 5);
		}
	}

	return res;
}

function getLevel(f, x, y) {
	return f.data[(y - 1) * f.w + (x - 1)];
}

function getTotal(f, x, y, size) {
	let total = 0;

	for (let yy = y; yy < y + size; ++yy) {
		for (let xx = x; xx < x + size; ++xx) {
			total += getLevel(f, xx, yy);
		}
	}	

	return total;
}

const input = `9221`;
