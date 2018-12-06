"use strict";

function calc() {
	const coords = input.split("\n").map(e => e.match(/\d+/g).map(Number));

	const w = Math.max(...coords.map(c => c[0])) + 1;
	const h = Math.max(...coords.map(c => c[1])) + 1;

	let infPoints = coords.map(c => 0);
	
	let m = new Array(h);
	for (let y = 0; y < h; ++y) {
		m[y] = new Array(w);
		for (let x = 0; x < w; ++x) {
			const distances = coords.map(c => Math.abs(c[0] - x) + Math.abs(c[1] - y));
			const minDistance = Math.min(...distances);
			const point = distances.filter(d => d == minDistance).length > 1 ? -1 : distances.indexOf(minDistance);
			
			m[y][x] = point;

			if ((point != -1) && (x == 0 || y == 0 || x == w - 1 || y == h - 1)) {
				infPoints[point] = 1;
			}
		}
	}

	return Math.max(...coords.map((c, i) => m.reduce((a, r) => a + r.filter(e => e == i).length, 0))
		.filter((e, i) => infPoints[i] != 1));
}

const test = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;

const input = `353, 177
233, 332
178, 231
351, 221
309, 151
105, 289
91, 236
321, 206
156, 146
94, 82
81, 114
182, 122
81, 153
319, 312
334, 212
275, 93
224, 355
347, 94
209, 65
118, 172
113, 122
182, 320
191, 178
99, 70
260, 184
266, 119
177, 178
313, 209
61, 285
155, 218
354, 198
274, 53
225, 138
228, 342
187, 165
226, 262
143, 150
124, 159
325, 210
163, 176
326, 91
170, 193
84, 265
199, 248
107, 356
45, 340
277, 173
286, 44
242, 150
120, 230`;
