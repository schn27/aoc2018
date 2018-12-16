"use strict";

function calc() {
	const inputParts = input.split("\n\n\n\n");
	const tests = inputParts[0].split("\n\n").map(c => c.split("\n").map(l => l.match(/\d+/g).map(Number)));
	const program = inputParts[1].split("\n").map(l => l.match(/\d+/g).map(Number));
	
	const opcodes = [
		addr, addi, 
		mulr, muli, 
		banr, bani, 
		borr, bori, 
		setr, seti, 
		gtir, gtri, gtrr, 
		eqir, eqri, eqrr];

	const results = tests.map(t => ({
		code: t[1][0], 
		candidates: opcodes.filter(o => doOpcode(o, t[1].slice(1), t[0]).every((r, i) => r == t[2][i]))
	}));

	const part1 = results.filter(r => r.candidates.length >= 3).length;

	let opcodeMap = opcodes.map(o => null);

	while (opcodeMap.indexOf(null) >= 0) {
		results.filter(r => r.candidates.length == 1)
			.forEach(r => opcodeMap[r.code] = r.candidates[0]);

		results.forEach(r => r.candidates = r.candidates.filter(o => opcodeMap.indexOf(o) < 0));
	}

	let regs = [0, 0, 0, 0];
	program.forEach(line => regs = doOpcode(opcodeMap[line[0]], line.slice(1), regs));

	const part2 = regs[0];
	return `${part1} ${part2}`;
}

const addr = (r, a, b) => r[a] + r[b];
const addi = (r, a, b) => r[a] + b;
const mulr = (r, a, b) => r[a] * r[b];
const muli = (r, a, b) => r[a] * b;
const banr = (r, a, b) => r[a] & r[b];
const bani = (r, a, b) => r[a] & b;
const borr = (r, a, b) => r[a] | r[b];
const bori = (r, a, b) => r[a] | b;
const setr = (r, a, b) => r[a];
const seti = (r, a, b) => a;
const gtir = (r, a, b) => a > r[b] ? 1 : 0;
const gtri = (r, a, b) => r[a] > b ? 1 : 0;
const gtrr = (r, a, b) => r[a] > r[b] ? 1 : 0;
const eqir = (r, a, b) => a == r[b] ? 1 : 0;
const eqri = (r, a, b) => r[a] == b ? 1 : 0;
const eqrr = (r, a, b) => r[a] == r[b] ? 1 : 0;

function doOpcode(opcode, args, regs) {
	let res = regs.slice();
	res[args[2]] = opcode(regs, args[0], args[1]);
	return res;
}

const input = `Before: [1, 3, 1, 3]
14 0 3 0
After:  [0, 3, 1, 3]

Before: [0, 0, 2, 1]
11 0 1 1
After:  [0, 1, 2, 1]

Before: [2, 1, 2, 1]
0 0 3 3
After:  [2, 1, 2, 3]

Before: [0, 2, 3, 2]
4 1 1 1
After:  [0, 4, 3, 2]

Before: [2, 3, 2, 1]
6 1 2 0
After:  [1, 3, 2, 1]

Before: [2, 3, 0, 2]
6 1 0 2
After:  [2, 3, 1, 2]

Before: [0, 0, 3, 0]
11 0 1 0
After:  [1, 0, 3, 0]

Before: [1, 3, 1, 2]
8 1 3 3
After:  [1, 3, 1, 1]

Before: [1, 1, 1, 2]
15 1 0 0
After:  [1, 1, 1, 2]

Before: [1, 1, 3, 3]
15 1 0 0
After:  [1, 1, 3, 3]

Before: [2, 0, 3, 1]
9 3 2 1
After:  [2, 3, 3, 1]

Before: [0, 1, 2, 3]
2 1 2 0
After:  [3, 1, 2, 3]

Before: [0, 3, 2, 3]
6 1 2 2
After:  [0, 3, 1, 3]

Before: [0, 0, 2, 1]
11 0 1 2
After:  [0, 0, 1, 1]

Before: [3, 3, 1, 3]
12 0 0 2
After:  [3, 3, 9, 3]

Before: [3, 2, 3, 1]
9 3 2 1
After:  [3, 3, 3, 1]

Before: [1, 3, 3, 1]
2 0 2 2
After:  [1, 3, 3, 1]

Before: [0, 0, 3, 1]
5 0 0 3
After:  [0, 0, 3, 0]

Before: [1, 3, 2, 0]
6 1 2 3
After:  [1, 3, 2, 1]

Before: [0, 0, 2, 2]
4 2 3 0
After:  [4, 0, 2, 2]

Before: [2, 3, 0, 2]
8 1 3 1
After:  [2, 1, 0, 2]

Before: [1, 0, 2, 3]
3 0 3 0
After:  [3, 0, 2, 3]

Before: [2, 3, 3, 1]
12 0 2 1
After:  [2, 6, 3, 1]

Before: [1, 2, 3, 3]
3 0 3 2
After:  [1, 2, 3, 3]

Before: [1, 3, 2, 2]
1 2 0 1
After:  [1, 3, 2, 2]

Before: [2, 0, 3, 0]
13 1 0 3
After:  [2, 0, 3, 1]

Before: [1, 1, 0, 3]
14 0 3 3
After:  [1, 1, 0, 0]

Before: [1, 2, 3, 0]
4 1 1 3
After:  [1, 2, 3, 4]

Before: [0, 1, 3, 2]
9 3 1 3
After:  [0, 1, 3, 3]

Before: [0, 3, 3, 1]
9 3 2 1
After:  [0, 3, 3, 1]

Before: [1, 1, 3, 0]
15 1 0 3
After:  [1, 1, 3, 1]

Before: [0, 1, 2, 1]
7 1 0 3
After:  [0, 1, 2, 1]

Before: [0, 0, 2, 0]
11 0 1 3
After:  [0, 0, 2, 1]

Before: [1, 2, 3, 3]
14 0 3 0
After:  [0, 2, 3, 3]

Before: [2, 1, 1, 2]
1 1 0 3
After:  [2, 1, 1, 3]

Before: [3, 3, 1, 2]
8 1 3 3
After:  [3, 3, 1, 1]

Before: [0, 1, 1, 2]
5 0 0 1
After:  [0, 0, 1, 2]

Before: [3, 2, 1, 1]
0 1 3 0
After:  [3, 2, 1, 1]

Before: [1, 1, 1, 2]
3 2 3 1
After:  [1, 3, 1, 2]

Before: [0, 0, 1, 3]
5 0 0 3
After:  [0, 0, 1, 0]

Before: [1, 0, 3, 0]
10 1 0 0
After:  [1, 0, 3, 0]

Before: [1, 3, 3, 3]
14 0 3 2
After:  [1, 3, 0, 3]

Before: [2, 0, 3, 1]
13 1 0 2
After:  [2, 0, 1, 1]

Before: [2, 1, 2, 2]
9 3 1 0
After:  [3, 1, 2, 2]

Before: [0, 0, 3, 3]
11 0 1 3
After:  [0, 0, 3, 1]

Before: [0, 0, 2, 1]
9 3 2 1
After:  [0, 3, 2, 1]

Before: [1, 1, 2, 0]
15 1 0 1
After:  [1, 1, 2, 0]

Before: [0, 1, 1, 1]
7 1 0 2
After:  [0, 1, 1, 1]

Before: [3, 0, 1, 2]
13 1 0 0
After:  [1, 0, 1, 2]

Before: [1, 1, 0, 3]
14 0 3 1
After:  [1, 0, 0, 3]

Before: [1, 1, 1, 3]
3 1 3 1
After:  [1, 3, 1, 3]

Before: [3, 2, 1, 0]
1 2 1 3
After:  [3, 2, 1, 3]

Before: [1, 3, 2, 3]
1 2 0 3
After:  [1, 3, 2, 3]

Before: [1, 2, 0, 1]
0 1 3 0
After:  [3, 2, 0, 1]

Before: [1, 1, 3, 2]
15 1 0 1
After:  [1, 1, 3, 2]

Before: [0, 1, 0, 2]
7 1 0 2
After:  [0, 1, 1, 2]

Before: [3, 3, 1, 2]
8 1 3 0
After:  [1, 3, 1, 2]

Before: [2, 3, 1, 2]
6 1 0 2
After:  [2, 3, 1, 2]

Before: [1, 1, 3, 2]
15 1 0 3
After:  [1, 1, 3, 1]

Before: [1, 2, 1, 1]
4 1 1 0
After:  [4, 2, 1, 1]

Before: [1, 1, 2, 2]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [3, 0, 0, 2]
4 3 3 0
After:  [4, 0, 0, 2]

Before: [2, 0, 3, 3]
1 1 0 3
After:  [2, 0, 3, 2]

Before: [2, 3, 2, 1]
6 1 0 3
After:  [2, 3, 2, 1]

Before: [0, 0, 3, 0]
5 0 0 2
After:  [0, 0, 0, 0]

Before: [0, 1, 3, 1]
5 0 0 2
After:  [0, 1, 0, 1]

Before: [1, 3, 2, 2]
6 1 2 2
After:  [1, 3, 1, 2]

Before: [0, 3, 3, 2]
12 3 1 2
After:  [0, 3, 6, 2]

Before: [3, 3, 1, 0]
12 0 0 2
After:  [3, 3, 9, 0]

Before: [2, 3, 2, 0]
6 1 2 2
After:  [2, 3, 1, 0]

Before: [0, 0, 0, 2]
11 0 1 0
After:  [1, 0, 0, 2]

Before: [0, 0, 3, 1]
5 0 0 0
After:  [0, 0, 3, 1]

Before: [1, 2, 0, 1]
0 1 3 1
After:  [1, 3, 0, 1]

Before: [1, 0, 1, 3]
14 0 3 3
After:  [1, 0, 1, 0]

Before: [1, 0, 3, 2]
10 1 0 2
After:  [1, 0, 1, 2]

Before: [0, 2, 2, 0]
5 0 0 3
After:  [0, 2, 2, 0]

Before: [1, 2, 2, 2]
4 2 3 0
After:  [4, 2, 2, 2]

Before: [2, 2, 1, 1]
4 0 0 0
After:  [4, 2, 1, 1]

Before: [1, 1, 2, 3]
3 0 3 0
After:  [3, 1, 2, 3]

Before: [1, 1, 2, 2]
3 1 3 3
After:  [1, 1, 2, 3]

Before: [1, 1, 0, 3]
15 1 0 0
After:  [1, 1, 0, 3]

Before: [2, 2, 1, 3]
14 0 3 3
After:  [2, 2, 1, 0]

Before: [3, 3, 0, 0]
12 0 1 1
After:  [3, 9, 0, 0]

Before: [1, 3, 3, 3]
14 0 3 0
After:  [0, 3, 3, 3]

Before: [3, 3, 2, 2]
6 1 2 2
After:  [3, 3, 1, 2]

Before: [2, 1, 0, 3]
14 0 3 3
After:  [2, 1, 0, 0]

Before: [0, 3, 3, 1]
5 0 0 2
After:  [0, 3, 0, 1]

Before: [3, 3, 3, 2]
8 1 3 0
After:  [1, 3, 3, 2]

Before: [2, 1, 2, 2]
1 1 0 3
After:  [2, 1, 2, 3]

Before: [1, 2, 1, 2]
3 2 3 2
After:  [1, 2, 3, 2]

Before: [0, 1, 2, 3]
5 0 0 2
After:  [0, 1, 0, 3]

Before: [3, 0, 0, 3]
13 1 0 3
After:  [3, 0, 0, 1]

Before: [2, 3, 1, 1]
6 1 0 2
After:  [2, 3, 1, 1]

Before: [1, 0, 3, 0]
10 1 0 1
After:  [1, 1, 3, 0]

Before: [3, 1, 2, 3]
3 1 3 3
After:  [3, 1, 2, 3]

Before: [1, 1, 2, 2]
15 1 0 1
After:  [1, 1, 2, 2]

Before: [0, 2, 0, 0]
1 0 1 3
After:  [0, 2, 0, 2]

Before: [2, 0, 3, 3]
2 1 3 0
After:  [3, 0, 3, 3]

Before: [3, 1, 3, 1]
9 3 2 3
After:  [3, 1, 3, 3]

Before: [2, 3, 0, 2]
12 1 0 0
After:  [6, 3, 0, 2]

Before: [2, 3, 2, 1]
0 0 3 2
After:  [2, 3, 3, 1]

Before: [1, 0, 1, 3]
3 2 3 3
After:  [1, 0, 1, 3]

Before: [0, 3, 0, 2]
8 1 3 1
After:  [0, 1, 0, 2]

Before: [0, 1, 3, 1]
1 0 2 2
After:  [0, 1, 3, 1]

Before: [0, 1, 1, 2]
9 3 1 3
After:  [0, 1, 1, 3]

Before: [0, 0, 3, 3]
2 1 3 1
After:  [0, 3, 3, 3]

Before: [2, 3, 3, 0]
6 1 0 0
After:  [1, 3, 3, 0]

Before: [0, 1, 3, 2]
7 1 0 0
After:  [1, 1, 3, 2]

Before: [1, 0, 3, 3]
14 0 3 3
After:  [1, 0, 3, 0]

Before: [1, 1, 1, 1]
15 1 0 2
After:  [1, 1, 1, 1]

Before: [2, 0, 3, 1]
0 0 3 0
After:  [3, 0, 3, 1]

Before: [2, 2, 1, 0]
1 2 1 2
After:  [2, 2, 3, 0]

Before: [2, 1, 0, 1]
0 0 3 2
After:  [2, 1, 3, 1]

Before: [1, 3, 0, 2]
8 1 3 3
After:  [1, 3, 0, 1]

Before: [1, 0, 1, 2]
10 1 0 0
After:  [1, 0, 1, 2]

Before: [1, 2, 2, 1]
0 1 3 2
After:  [1, 2, 3, 1]

Before: [3, 1, 1, 3]
3 1 3 1
After:  [3, 3, 1, 3]

Before: [1, 0, 3, 1]
10 1 0 1
After:  [1, 1, 3, 1]

Before: [1, 0, 2, 2]
2 1 2 2
After:  [1, 0, 2, 2]

Before: [1, 0, 1, 3]
14 0 3 0
After:  [0, 0, 1, 3]

Before: [1, 3, 3, 2]
8 1 3 1
After:  [1, 1, 3, 2]

Before: [1, 0, 1, 2]
10 1 0 2
After:  [1, 0, 1, 2]

Before: [2, 3, 2, 0]
6 1 0 1
After:  [2, 1, 2, 0]

Before: [2, 3, 2, 2]
6 1 0 2
After:  [2, 3, 1, 2]

Before: [2, 0, 0, 1]
13 1 0 0
After:  [1, 0, 0, 1]

Before: [2, 2, 1, 0]
4 0 0 1
After:  [2, 4, 1, 0]

Before: [1, 0, 2, 3]
2 1 2 2
After:  [1, 0, 2, 3]

Before: [0, 1, 0, 3]
7 1 0 0
After:  [1, 1, 0, 3]

Before: [3, 0, 3, 2]
13 1 0 3
After:  [3, 0, 3, 1]

Before: [1, 0, 0, 1]
10 1 0 2
After:  [1, 0, 1, 1]

Before: [0, 0, 0, 0]
11 0 1 0
After:  [1, 0, 0, 0]

Before: [3, 2, 1, 0]
1 2 0 0
After:  [3, 2, 1, 0]

Before: [3, 0, 2, 1]
0 2 3 0
After:  [3, 0, 2, 1]

Before: [0, 0, 3, 1]
9 3 2 0
After:  [3, 0, 3, 1]

Before: [1, 1, 0, 2]
3 1 3 1
After:  [1, 3, 0, 2]

Before: [1, 2, 3, 1]
13 1 2 0
After:  [1, 2, 3, 1]

Before: [0, 0, 3, 1]
5 0 0 1
After:  [0, 0, 3, 1]

Before: [0, 1, 3, 2]
5 0 0 1
After:  [0, 0, 3, 2]

Before: [0, 2, 1, 1]
0 1 3 3
After:  [0, 2, 1, 3]

Before: [0, 1, 0, 0]
7 1 0 0
After:  [1, 1, 0, 0]

Before: [3, 0, 1, 2]
13 1 0 1
After:  [3, 1, 1, 2]

Before: [3, 3, 2, 2]
6 1 2 3
After:  [3, 3, 2, 1]

Before: [3, 0, 1, 2]
3 2 3 1
After:  [3, 3, 1, 2]

Before: [0, 1, 3, 1]
7 1 0 0
After:  [1, 1, 3, 1]

Before: [2, 0, 2, 3]
1 1 0 3
After:  [2, 0, 2, 2]

Before: [0, 3, 3, 1]
9 3 2 2
After:  [0, 3, 3, 1]

Before: [1, 0, 0, 2]
10 1 0 0
After:  [1, 0, 0, 2]

Before: [2, 3, 0, 2]
8 1 3 3
After:  [2, 3, 0, 1]

Before: [1, 1, 3, 1]
15 1 0 1
After:  [1, 1, 3, 1]

Before: [1, 1, 2, 3]
15 1 0 1
After:  [1, 1, 2, 3]

Before: [3, 1, 1, 3]
1 2 0 0
After:  [3, 1, 1, 3]

Before: [2, 1, 1, 1]
1 1 0 3
After:  [2, 1, 1, 3]

Before: [2, 0, 1, 1]
0 0 3 2
After:  [2, 0, 3, 1]

Before: [2, 0, 2, 0]
4 2 0 2
After:  [2, 0, 4, 0]

Before: [3, 0, 1, 2]
13 1 0 2
After:  [3, 0, 1, 2]

Before: [1, 0, 1, 3]
14 0 3 1
After:  [1, 0, 1, 3]

Before: [1, 3, 3, 2]
2 0 2 1
After:  [1, 3, 3, 2]

Before: [1, 0, 2, 3]
2 1 3 1
After:  [1, 3, 2, 3]

Before: [3, 2, 3, 2]
4 3 1 2
After:  [3, 2, 4, 2]

Before: [0, 3, 0, 2]
8 1 3 3
After:  [0, 3, 0, 1]

Before: [1, 0, 0, 3]
10 1 0 2
After:  [1, 0, 1, 3]

Before: [0, 1, 3, 2]
7 1 0 2
After:  [0, 1, 1, 2]

Before: [0, 0, 2, 1]
0 2 3 0
After:  [3, 0, 2, 1]

Before: [1, 0, 1, 3]
3 0 3 2
After:  [1, 0, 3, 3]

Before: [2, 3, 2, 2]
6 1 2 0
After:  [1, 3, 2, 2]

Before: [1, 1, 0, 3]
15 1 0 1
After:  [1, 1, 0, 3]

Before: [0, 0, 3, 0]
5 0 0 3
After:  [0, 0, 3, 0]

Before: [1, 1, 1, 2]
9 3 1 3
After:  [1, 1, 1, 3]

Before: [2, 2, 0, 3]
4 0 0 1
After:  [2, 4, 0, 3]

Before: [2, 3, 3, 0]
12 2 0 3
After:  [2, 3, 3, 6]

Before: [1, 3, 2, 1]
12 1 1 1
After:  [1, 9, 2, 1]

Before: [1, 2, 3, 2]
13 1 2 2
After:  [1, 2, 1, 2]

Before: [1, 2, 3, 2]
3 0 3 3
After:  [1, 2, 3, 3]

Before: [3, 3, 0, 2]
8 1 3 3
After:  [3, 3, 0, 1]

Before: [2, 3, 0, 1]
4 0 0 3
After:  [2, 3, 0, 4]

Before: [2, 2, 0, 3]
14 0 3 1
After:  [2, 0, 0, 3]

Before: [2, 0, 1, 1]
13 1 0 0
After:  [1, 0, 1, 1]

Before: [2, 3, 2, 3]
6 1 2 3
After:  [2, 3, 2, 1]

Before: [3, 0, 0, 0]
13 1 0 1
After:  [3, 1, 0, 0]

Before: [0, 3, 3, 3]
5 0 0 3
After:  [0, 3, 3, 0]

Before: [0, 3, 2, 1]
6 1 2 3
After:  [0, 3, 2, 1]

Before: [0, 0, 2, 2]
5 0 0 3
After:  [0, 0, 2, 0]

Before: [0, 1, 0, 3]
7 1 0 3
After:  [0, 1, 0, 1]

Before: [0, 2, 3, 1]
5 0 0 3
After:  [0, 2, 3, 0]

Before: [1, 2, 0, 2]
12 0 3 1
After:  [1, 2, 0, 2]

Before: [2, 3, 3, 1]
6 1 0 3
After:  [2, 3, 3, 1]

Before: [0, 2, 0, 0]
5 0 0 1
After:  [0, 0, 0, 0]

Before: [1, 3, 0, 2]
3 0 3 0
After:  [3, 3, 0, 2]

Before: [0, 1, 3, 3]
5 0 0 3
After:  [0, 1, 3, 0]

Before: [0, 0, 1, 0]
11 0 1 3
After:  [0, 0, 1, 1]

Before: [3, 0, 3, 1]
1 1 0 0
After:  [3, 0, 3, 1]

Before: [3, 0, 2, 3]
2 1 2 3
After:  [3, 0, 2, 2]

Before: [1, 1, 3, 0]
15 1 0 1
After:  [1, 1, 3, 0]

Before: [2, 1, 3, 2]
4 0 0 3
After:  [2, 1, 3, 4]

Before: [0, 0, 2, 1]
5 0 0 2
After:  [0, 0, 0, 1]

Before: [2, 0, 3, 3]
14 0 3 1
After:  [2, 0, 3, 3]

Before: [3, 1, 3, 2]
9 3 1 1
After:  [3, 3, 3, 2]

Before: [2, 3, 0, 2]
8 1 3 0
After:  [1, 3, 0, 2]

Before: [3, 2, 0, 1]
12 0 0 3
After:  [3, 2, 0, 9]

Before: [3, 0, 0, 3]
2 2 3 1
After:  [3, 3, 0, 3]

Before: [3, 0, 3, 1]
9 3 2 2
After:  [3, 0, 3, 1]

Before: [3, 2, 0, 2]
12 0 0 2
After:  [3, 2, 9, 2]

Before: [2, 3, 2, 1]
6 1 2 3
After:  [2, 3, 2, 1]

Before: [1, 2, 1, 2]
4 1 1 0
After:  [4, 2, 1, 2]

Before: [0, 3, 1, 3]
1 2 1 0
After:  [3, 3, 1, 3]

Before: [2, 2, 2, 0]
2 1 2 3
After:  [2, 2, 2, 4]

Before: [0, 1, 3, 1]
5 0 0 0
After:  [0, 1, 3, 1]

Before: [3, 3, 2, 2]
8 1 3 0
After:  [1, 3, 2, 2]

Before: [1, 3, 0, 2]
1 2 1 2
After:  [1, 3, 3, 2]

Before: [1, 0, 1, 0]
10 1 0 3
After:  [1, 0, 1, 1]

Before: [0, 0, 0, 3]
11 0 1 3
After:  [0, 0, 0, 1]

Before: [1, 1, 0, 3]
15 1 0 3
After:  [1, 1, 0, 1]

Before: [0, 1, 3, 2]
3 1 3 2
After:  [0, 1, 3, 2]

Before: [0, 0, 1, 0]
5 0 0 2
After:  [0, 0, 0, 0]

Before: [1, 0, 2, 2]
10 1 0 2
After:  [1, 0, 1, 2]

Before: [1, 3, 2, 3]
14 0 3 1
After:  [1, 0, 2, 3]

Before: [2, 2, 3, 0]
13 1 2 3
After:  [2, 2, 3, 1]

Before: [1, 0, 1, 3]
10 1 0 3
After:  [1, 0, 1, 1]

Before: [0, 2, 3, 0]
13 1 2 1
After:  [0, 1, 3, 0]

Before: [1, 2, 1, 2]
4 3 1 0
After:  [4, 2, 1, 2]

Before: [1, 0, 2, 0]
2 0 2 2
After:  [1, 0, 3, 0]

Before: [0, 1, 0, 2]
7 1 0 0
After:  [1, 1, 0, 2]

Before: [1, 2, 2, 3]
2 2 2 3
After:  [1, 2, 2, 4]

Before: [1, 1, 1, 1]
15 1 0 1
After:  [1, 1, 1, 1]

Before: [2, 1, 2, 0]
2 2 1 0
After:  [3, 1, 2, 0]

Before: [1, 1, 3, 1]
15 1 0 2
After:  [1, 1, 1, 1]

Before: [2, 3, 1, 3]
1 2 1 1
After:  [2, 3, 1, 3]

Before: [0, 1, 1, 0]
7 1 0 0
After:  [1, 1, 1, 0]

Before: [0, 1, 1, 1]
1 0 3 2
After:  [0, 1, 1, 1]

Before: [1, 3, 3, 2]
8 1 3 3
After:  [1, 3, 3, 1]

Before: [0, 1, 3, 3]
7 1 0 0
After:  [1, 1, 3, 3]

Before: [1, 1, 0, 2]
15 1 0 3
After:  [1, 1, 0, 1]

Before: [1, 3, 2, 1]
9 3 2 0
After:  [3, 3, 2, 1]

Before: [1, 1, 1, 3]
15 1 0 3
After:  [1, 1, 1, 1]

Before: [2, 0, 0, 1]
0 0 3 1
After:  [2, 3, 0, 1]

Before: [2, 2, 2, 1]
0 0 3 1
After:  [2, 3, 2, 1]

Before: [1, 2, 2, 1]
0 2 3 2
After:  [1, 2, 3, 1]

Before: [1, 3, 2, 1]
2 2 2 2
After:  [1, 3, 4, 1]

Before: [0, 1, 2, 0]
7 1 0 1
After:  [0, 1, 2, 0]

Before: [3, 1, 2, 1]
0 2 3 3
After:  [3, 1, 2, 3]

Before: [0, 0, 0, 3]
11 0 1 0
After:  [1, 0, 0, 3]

Before: [2, 1, 2, 3]
4 2 0 3
After:  [2, 1, 2, 4]

Before: [0, 1, 1, 3]
7 1 0 3
After:  [0, 1, 1, 1]

Before: [3, 3, 0, 2]
8 1 3 2
After:  [3, 3, 1, 2]

Before: [0, 1, 1, 2]
2 0 1 1
After:  [0, 1, 1, 2]

Before: [1, 1, 3, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [1, 1, 0, 3]
14 0 3 0
After:  [0, 1, 0, 3]

Before: [0, 1, 2, 1]
7 1 0 2
After:  [0, 1, 1, 1]

Before: [0, 3, 0, 2]
4 3 3 0
After:  [4, 3, 0, 2]

Before: [2, 0, 2, 1]
0 0 3 1
After:  [2, 3, 2, 1]

Before: [3, 3, 1, 2]
12 0 0 3
After:  [3, 3, 1, 9]

Before: [3, 3, 2, 2]
8 1 3 3
After:  [3, 3, 2, 1]

Before: [1, 3, 0, 3]
12 3 1 0
After:  [9, 3, 0, 3]

Before: [1, 2, 3, 3]
13 1 2 0
After:  [1, 2, 3, 3]

Before: [3, 3, 3, 0]
12 2 2 0
After:  [9, 3, 3, 0]

Before: [2, 0, 2, 1]
9 3 2 2
After:  [2, 0, 3, 1]

Before: [1, 2, 2, 2]
3 0 3 2
After:  [1, 2, 3, 2]

Before: [1, 0, 0, 1]
10 1 0 3
After:  [1, 0, 0, 1]

Before: [0, 1, 2, 1]
0 2 3 2
After:  [0, 1, 3, 1]

Before: [1, 0, 2, 2]
2 1 2 1
After:  [1, 2, 2, 2]

Before: [1, 0, 2, 1]
0 2 3 0
After:  [3, 0, 2, 1]

Before: [0, 0, 1, 2]
11 0 1 0
After:  [1, 0, 1, 2]

Before: [1, 1, 3, 3]
14 0 3 1
After:  [1, 0, 3, 3]

Before: [2, 1, 3, 0]
1 3 0 0
After:  [2, 1, 3, 0]

Before: [1, 3, 1, 3]
1 2 1 2
After:  [1, 3, 3, 3]

Before: [3, 1, 2, 3]
1 1 0 1
After:  [3, 3, 2, 3]

Before: [0, 1, 1, 3]
7 1 0 0
After:  [1, 1, 1, 3]

Before: [0, 1, 2, 1]
7 1 0 0
After:  [1, 1, 2, 1]

Before: [1, 1, 1, 0]
15 1 0 2
After:  [1, 1, 1, 0]

Before: [2, 2, 0, 1]
0 1 3 1
After:  [2, 3, 0, 1]

Before: [3, 0, 3, 0]
12 2 2 2
After:  [3, 0, 9, 0]

Before: [2, 1, 3, 3]
14 0 3 3
After:  [2, 1, 3, 0]

Before: [3, 3, 2, 0]
12 0 1 1
After:  [3, 9, 2, 0]

Before: [1, 1, 0, 3]
15 1 0 2
After:  [1, 1, 1, 3]

Before: [1, 1, 0, 0]
15 1 0 3
After:  [1, 1, 0, 1]

Before: [0, 2, 2, 3]
12 3 1 2
After:  [0, 2, 6, 3]

Before: [1, 1, 3, 1]
9 3 2 0
After:  [3, 1, 3, 1]

Before: [1, 2, 3, 1]
13 1 2 2
After:  [1, 2, 1, 1]

Before: [2, 0, 2, 3]
13 1 0 1
After:  [2, 1, 2, 3]

Before: [0, 2, 1, 0]
5 0 0 2
After:  [0, 2, 0, 0]

Before: [0, 1, 0, 1]
7 1 0 3
After:  [0, 1, 0, 1]

Before: [0, 1, 1, 2]
7 1 0 1
After:  [0, 1, 1, 2]

Before: [2, 1, 0, 2]
3 1 3 0
After:  [3, 1, 0, 2]

Before: [2, 1, 0, 1]
0 0 3 0
After:  [3, 1, 0, 1]

Before: [1, 1, 1, 2]
12 0 3 0
After:  [2, 1, 1, 2]

Before: [0, 3, 2, 2]
6 1 2 1
After:  [0, 1, 2, 2]

Before: [2, 1, 2, 2]
4 3 0 2
After:  [2, 1, 4, 2]

Before: [1, 3, 1, 2]
8 1 3 2
After:  [1, 3, 1, 2]

Before: [2, 1, 0, 2]
4 0 3 1
After:  [2, 4, 0, 2]

Before: [0, 1, 2, 3]
5 0 0 1
After:  [0, 0, 2, 3]

Before: [1, 1, 3, 3]
15 1 0 1
After:  [1, 1, 3, 3]

Before: [2, 1, 3, 1]
9 3 2 1
After:  [2, 3, 3, 1]

Before: [2, 3, 2, 0]
6 1 2 3
After:  [2, 3, 2, 1]

Before: [3, 2, 1, 3]
3 2 3 2
After:  [3, 2, 3, 3]

Before: [2, 3, 2, 0]
6 1 0 0
After:  [1, 3, 2, 0]

Before: [2, 3, 1, 1]
6 1 0 0
After:  [1, 3, 1, 1]

Before: [0, 1, 1, 3]
3 2 3 3
After:  [0, 1, 1, 3]

Before: [0, 2, 3, 2]
5 0 0 3
After:  [0, 2, 3, 0]

Before: [2, 2, 3, 1]
0 1 3 3
After:  [2, 2, 3, 3]

Before: [0, 2, 2, 1]
0 1 3 3
After:  [0, 2, 2, 3]

Before: [1, 2, 3, 1]
0 1 3 0
After:  [3, 2, 3, 1]

Before: [1, 3, 2, 1]
9 3 2 2
After:  [1, 3, 3, 1]

Before: [1, 0, 3, 2]
3 0 3 2
After:  [1, 0, 3, 2]

Before: [2, 1, 2, 1]
0 0 3 0
After:  [3, 1, 2, 1]

Before: [2, 3, 2, 2]
8 1 3 0
After:  [1, 3, 2, 2]

Before: [0, 1, 2, 3]
7 1 0 1
After:  [0, 1, 2, 3]

Before: [2, 1, 1, 2]
3 1 3 3
After:  [2, 1, 1, 3]

Before: [2, 1, 0, 3]
14 0 3 0
After:  [0, 1, 0, 3]

Before: [3, 2, 3, 1]
0 1 3 2
After:  [3, 2, 3, 1]

Before: [2, 2, 3, 3]
14 0 3 2
After:  [2, 2, 0, 3]

Before: [1, 1, 2, 2]
9 3 1 1
After:  [1, 3, 2, 2]

Before: [0, 1, 3, 1]
7 1 0 3
After:  [0, 1, 3, 1]

Before: [1, 0, 3, 0]
10 1 0 2
After:  [1, 0, 1, 0]

Before: [1, 3, 3, 3]
14 0 3 1
After:  [1, 0, 3, 3]

Before: [0, 2, 3, 1]
9 3 2 2
After:  [0, 2, 3, 1]

Before: [2, 3, 3, 3]
6 1 0 1
After:  [2, 1, 3, 3]

Before: [3, 1, 0, 0]
1 1 0 0
After:  [3, 1, 0, 0]

Before: [1, 3, 0, 2]
8 1 3 2
After:  [1, 3, 1, 2]

Before: [3, 3, 2, 2]
8 1 3 2
After:  [3, 3, 1, 2]

Before: [1, 3, 1, 2]
8 1 3 0
After:  [1, 3, 1, 2]

Before: [0, 0, 2, 0]
11 0 1 0
After:  [1, 0, 2, 0]

Before: [1, 1, 0, 1]
15 1 0 0
After:  [1, 1, 0, 1]

Before: [1, 2, 3, 1]
13 1 2 3
After:  [1, 2, 3, 1]

Before: [3, 0, 3, 1]
13 1 0 2
After:  [3, 0, 1, 1]

Before: [2, 0, 2, 3]
14 0 3 0
After:  [0, 0, 2, 3]

Before: [3, 3, 3, 2]
8 1 3 3
After:  [3, 3, 3, 1]

Before: [2, 3, 1, 0]
6 1 0 1
After:  [2, 1, 1, 0]

Before: [1, 1, 2, 3]
14 0 3 2
After:  [1, 1, 0, 3]

Before: [2, 3, 1, 3]
14 0 3 0
After:  [0, 3, 1, 3]

Before: [3, 1, 2, 2]
9 3 1 1
After:  [3, 3, 2, 2]

Before: [0, 0, 0, 2]
11 0 1 3
After:  [0, 0, 0, 1]

Before: [1, 1, 0, 2]
9 3 1 0
After:  [3, 1, 0, 2]

Before: [0, 0, 3, 2]
11 0 1 1
After:  [0, 1, 3, 2]

Before: [2, 2, 1, 3]
1 2 1 0
After:  [3, 2, 1, 3]

Before: [1, 1, 2, 1]
2 0 2 0
After:  [3, 1, 2, 1]

Before: [0, 1, 2, 2]
7 1 0 2
After:  [0, 1, 1, 2]

Before: [0, 1, 1, 0]
1 0 2 1
After:  [0, 1, 1, 0]

Before: [0, 0, 1, 0]
11 0 1 1
After:  [0, 1, 1, 0]

Before: [2, 1, 1, 3]
4 0 0 3
After:  [2, 1, 1, 4]

Before: [3, 3, 2, 2]
12 2 0 3
After:  [3, 3, 2, 6]

Before: [1, 0, 3, 1]
10 1 0 2
After:  [1, 0, 1, 1]

Before: [1, 1, 3, 3]
3 1 3 2
After:  [1, 1, 3, 3]

Before: [1, 2, 0, 3]
3 0 3 2
After:  [1, 2, 3, 3]

Before: [0, 1, 3, 3]
7 1 0 2
After:  [0, 1, 1, 3]

Before: [3, 3, 3, 0]
12 2 1 3
After:  [3, 3, 3, 9]

Before: [3, 3, 0, 2]
8 1 3 0
After:  [1, 3, 0, 2]

Before: [2, 1, 3, 2]
2 1 2 3
After:  [2, 1, 3, 3]

Before: [2, 3, 2, 1]
9 3 2 2
After:  [2, 3, 3, 1]

Before: [1, 1, 1, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [3, 3, 1, 1]
12 1 0 1
After:  [3, 9, 1, 1]

Before: [2, 3, 2, 2]
6 1 2 2
After:  [2, 3, 1, 2]

Before: [1, 1, 3, 3]
15 1 0 3
After:  [1, 1, 3, 1]

Before: [2, 2, 2, 1]
9 3 2 0
After:  [3, 2, 2, 1]

Before: [3, 3, 3, 2]
8 1 3 2
After:  [3, 3, 1, 2]

Before: [2, 1, 1, 2]
3 1 3 1
After:  [2, 3, 1, 2]

Before: [0, 0, 0, 3]
11 0 1 1
After:  [0, 1, 0, 3]

Before: [3, 2, 3, 2]
13 1 2 3
After:  [3, 2, 3, 1]

Before: [1, 3, 2, 1]
6 1 2 2
After:  [1, 3, 1, 1]

Before: [3, 2, 3, 1]
9 3 2 2
After:  [3, 2, 3, 1]

Before: [0, 0, 2, 2]
11 0 1 1
After:  [0, 1, 2, 2]

Before: [1, 1, 1, 2]
15 1 0 3
After:  [1, 1, 1, 1]

Before: [1, 0, 0, 0]
10 1 0 0
After:  [1, 0, 0, 0]

Before: [0, 1, 1, 1]
5 0 0 2
After:  [0, 1, 0, 1]

Before: [0, 0, 0, 2]
5 0 0 3
After:  [0, 0, 0, 0]

Before: [0, 0, 0, 2]
11 0 1 2
After:  [0, 0, 1, 2]

Before: [0, 1, 1, 2]
7 1 0 0
After:  [1, 1, 1, 2]

Before: [1, 2, 0, 2]
4 3 3 0
After:  [4, 2, 0, 2]

Before: [2, 3, 3, 1]
12 0 2 3
After:  [2, 3, 3, 6]

Before: [2, 2, 2, 0]
2 0 2 1
After:  [2, 4, 2, 0]

Before: [0, 0, 3, 1]
11 0 1 3
After:  [0, 0, 3, 1]

Before: [3, 3, 1, 2]
8 1 3 1
After:  [3, 1, 1, 2]

Before: [1, 2, 2, 1]
9 3 2 0
After:  [3, 2, 2, 1]

Before: [0, 3, 1, 2]
8 1 3 0
After:  [1, 3, 1, 2]

Before: [1, 2, 0, 3]
14 0 3 3
After:  [1, 2, 0, 0]

Before: [0, 0, 0, 1]
11 0 1 3
After:  [0, 0, 0, 1]

Before: [2, 3, 0, 1]
12 3 0 1
After:  [2, 2, 0, 1]

Before: [2, 3, 1, 3]
6 1 0 0
After:  [1, 3, 1, 3]

Before: [2, 1, 2, 2]
1 1 0 1
After:  [2, 3, 2, 2]

Before: [3, 3, 0, 2]
8 1 3 1
After:  [3, 1, 0, 2]

Before: [2, 3, 2, 3]
6 1 0 1
After:  [2, 1, 2, 3]

Before: [0, 3, 2, 1]
9 3 2 3
After:  [0, 3, 2, 3]

Before: [0, 3, 0, 2]
5 0 0 3
After:  [0, 3, 0, 0]

Before: [0, 2, 3, 2]
13 1 2 3
After:  [0, 2, 3, 1]

Before: [0, 1, 0, 0]
7 1 0 1
After:  [0, 1, 0, 0]

Before: [2, 3, 2, 3]
12 1 0 2
After:  [2, 3, 6, 3]

Before: [0, 1, 3, 1]
7 1 0 2
After:  [0, 1, 1, 1]

Before: [2, 3, 3, 2]
12 3 2 1
After:  [2, 6, 3, 2]

Before: [2, 3, 3, 1]
9 3 2 0
After:  [3, 3, 3, 1]

Before: [2, 1, 2, 1]
0 2 3 0
After:  [3, 1, 2, 1]

Before: [2, 0, 1, 1]
0 0 3 0
After:  [3, 0, 1, 1]

Before: [0, 1, 2, 3]
7 1 0 2
After:  [0, 1, 1, 3]

Before: [0, 0, 1, 2]
3 2 3 1
After:  [0, 3, 1, 2]

Before: [2, 0, 3, 1]
13 1 0 0
After:  [1, 0, 3, 1]

Before: [2, 3, 2, 2]
8 1 3 1
After:  [2, 1, 2, 2]

Before: [2, 3, 1, 2]
4 3 3 0
After:  [4, 3, 1, 2]

Before: [2, 0, 1, 1]
0 0 3 3
After:  [2, 0, 1, 3]

Before: [0, 3, 0, 0]
5 0 0 1
After:  [0, 0, 0, 0]

Before: [1, 1, 0, 2]
15 1 0 1
After:  [1, 1, 0, 2]

Before: [1, 3, 1, 3]
3 2 3 3
After:  [1, 3, 1, 3]

Before: [0, 0, 2, 1]
5 0 0 3
After:  [0, 0, 2, 0]

Before: [2, 3, 1, 1]
6 1 0 1
After:  [2, 1, 1, 1]

Before: [3, 3, 2, 2]
8 1 3 1
After:  [3, 1, 2, 2]

Before: [1, 0, 0, 2]
10 1 0 1
After:  [1, 1, 0, 2]

Before: [2, 1, 0, 3]
3 1 3 0
After:  [3, 1, 0, 3]

Before: [2, 0, 1, 3]
14 0 3 3
After:  [2, 0, 1, 0]

Before: [0, 1, 0, 0]
7 1 0 2
After:  [0, 1, 1, 0]

Before: [2, 1, 3, 2]
12 2 0 3
After:  [2, 1, 3, 6]

Before: [2, 1, 3, 2]
4 3 0 2
After:  [2, 1, 4, 2]

Before: [0, 0, 1, 3]
11 0 1 1
After:  [0, 1, 1, 3]

Before: [1, 1, 1, 3]
15 1 0 1
After:  [1, 1, 1, 3]

Before: [0, 1, 2, 1]
1 0 3 3
After:  [0, 1, 2, 1]

Before: [2, 3, 3, 2]
8 1 3 1
After:  [2, 1, 3, 2]

Before: [0, 3, 3, 2]
8 1 3 1
After:  [0, 1, 3, 2]

Before: [1, 0, 1, 3]
14 0 3 2
After:  [1, 0, 0, 3]

Before: [3, 0, 2, 3]
12 3 0 0
After:  [9, 0, 2, 3]

Before: [0, 2, 2, 0]
5 0 0 2
After:  [0, 2, 0, 0]

Before: [0, 1, 1, 1]
1 0 2 3
After:  [0, 1, 1, 1]

Before: [2, 0, 2, 3]
2 1 3 3
After:  [2, 0, 2, 3]

Before: [1, 2, 3, 3]
13 1 2 2
After:  [1, 2, 1, 3]

Before: [0, 1, 0, 1]
5 0 0 2
After:  [0, 1, 0, 1]

Before: [1, 1, 0, 0]
15 1 0 0
After:  [1, 1, 0, 0]

Before: [0, 1, 3, 0]
7 1 0 0
After:  [1, 1, 3, 0]

Before: [1, 0, 2, 0]
10 1 0 0
After:  [1, 0, 2, 0]

Before: [1, 0, 0, 3]
10 1 0 3
After:  [1, 0, 0, 1]

Before: [2, 3, 1, 2]
8 1 3 1
After:  [2, 1, 1, 2]

Before: [1, 2, 2, 2]
3 0 3 0
After:  [3, 2, 2, 2]

Before: [1, 3, 2, 0]
6 1 2 1
After:  [1, 1, 2, 0]

Before: [1, 0, 3, 1]
10 1 0 3
After:  [1, 0, 3, 1]

Before: [0, 1, 2, 0]
7 1 0 3
After:  [0, 1, 2, 1]

Before: [2, 0, 1, 0]
13 1 0 0
After:  [1, 0, 1, 0]

Before: [1, 0, 0, 3]
14 0 3 3
After:  [1, 0, 0, 0]

Before: [0, 1, 3, 3]
3 1 3 3
After:  [0, 1, 3, 3]

Before: [3, 2, 2, 2]
4 2 3 1
After:  [3, 4, 2, 2]

Before: [1, 0, 2, 0]
10 1 0 3
After:  [1, 0, 2, 1]

Before: [0, 0, 1, 0]
11 0 1 0
After:  [1, 0, 1, 0]

Before: [0, 1, 0, 1]
7 1 0 1
After:  [0, 1, 0, 1]

Before: [0, 3, 1, 0]
12 1 1 2
After:  [0, 3, 9, 0]

Before: [0, 1, 1, 1]
7 1 0 3
After:  [0, 1, 1, 1]

Before: [1, 0, 2, 0]
10 1 0 2
After:  [1, 0, 1, 0]

Before: [0, 1, 3, 3]
5 0 0 2
After:  [0, 1, 0, 3]

Before: [1, 1, 2, 1]
2 1 2 3
After:  [1, 1, 2, 3]

Before: [0, 0, 0, 0]
11 0 1 2
After:  [0, 0, 1, 0]

Before: [1, 1, 2, 0]
15 1 0 0
After:  [1, 1, 2, 0]

Before: [1, 0, 1, 3]
10 1 0 2
After:  [1, 0, 1, 3]

Before: [2, 3, 0, 0]
6 1 0 1
After:  [2, 1, 0, 0]

Before: [0, 0, 0, 3]
11 0 1 2
After:  [0, 0, 1, 3]

Before: [3, 2, 3, 1]
12 2 0 1
After:  [3, 9, 3, 1]

Before: [1, 2, 1, 0]
4 1 1 0
After:  [4, 2, 1, 0]

Before: [1, 0, 3, 3]
14 0 3 1
After:  [1, 0, 3, 3]

Before: [0, 1, 0, 1]
7 1 0 0
After:  [1, 1, 0, 1]

Before: [1, 3, 2, 2]
8 1 3 2
After:  [1, 3, 1, 2]

Before: [0, 2, 1, 0]
5 0 0 0
After:  [0, 2, 1, 0]

Before: [1, 3, 2, 1]
9 3 2 1
After:  [1, 3, 2, 1]

Before: [1, 1, 1, 1]
15 1 0 0
After:  [1, 1, 1, 1]

Before: [2, 2, 2, 1]
0 0 3 0
After:  [3, 2, 2, 1]

Before: [1, 3, 2, 2]
6 1 2 1
After:  [1, 1, 2, 2]

Before: [0, 1, 1, 0]
7 1 0 1
After:  [0, 1, 1, 0]

Before: [1, 0, 0, 1]
10 1 0 0
After:  [1, 0, 0, 1]

Before: [1, 1, 0, 2]
9 3 1 1
After:  [1, 3, 0, 2]

Before: [2, 0, 3, 2]
13 1 0 2
After:  [2, 0, 1, 2]

Before: [0, 2, 0, 3]
5 0 0 0
After:  [0, 2, 0, 3]

Before: [2, 0, 2, 0]
2 0 2 1
After:  [2, 4, 2, 0]

Before: [1, 1, 1, 0]
15 1 0 0
After:  [1, 1, 1, 0]

Before: [2, 0, 2, 3]
14 0 3 1
After:  [2, 0, 2, 3]

Before: [0, 1, 1, 1]
7 1 0 0
After:  [1, 1, 1, 1]

Before: [1, 3, 2, 3]
6 1 2 2
After:  [1, 3, 1, 3]

Before: [1, 3, 0, 2]
8 1 3 0
After:  [1, 3, 0, 2]

Before: [1, 3, 1, 2]
8 1 3 1
After:  [1, 1, 1, 2]

Before: [1, 0, 2, 3]
10 1 0 1
After:  [1, 1, 2, 3]

Before: [1, 0, 0, 2]
10 1 0 2
After:  [1, 0, 1, 2]

Before: [2, 2, 1, 1]
0 0 3 3
After:  [2, 2, 1, 3]

Before: [0, 3, 3, 3]
5 0 0 1
After:  [0, 0, 3, 3]

Before: [0, 3, 2, 2]
8 1 3 2
After:  [0, 3, 1, 2]

Before: [0, 1, 0, 3]
7 1 0 1
After:  [0, 1, 0, 3]

Before: [2, 2, 3, 3]
4 1 0 3
After:  [2, 2, 3, 4]

Before: [2, 0, 3, 1]
12 3 0 0
After:  [2, 0, 3, 1]

Before: [1, 1, 0, 1]
15 1 0 3
After:  [1, 1, 0, 1]

Before: [0, 1, 3, 0]
7 1 0 1
After:  [0, 1, 3, 0]

Before: [1, 2, 2, 3]
2 0 2 0
After:  [3, 2, 2, 3]

Before: [0, 2, 1, 2]
3 2 3 0
After:  [3, 2, 1, 2]

Before: [0, 3, 3, 2]
5 0 0 2
After:  [0, 3, 0, 2]

Before: [2, 1, 0, 1]
0 0 3 3
After:  [2, 1, 0, 3]

Before: [2, 3, 0, 3]
14 0 3 3
After:  [2, 3, 0, 0]

Before: [0, 1, 2, 3]
7 1 0 0
After:  [1, 1, 2, 3]

Before: [0, 2, 1, 1]
5 0 0 3
After:  [0, 2, 1, 0]

Before: [1, 1, 0, 2]
3 0 3 2
After:  [1, 1, 3, 2]

Before: [2, 3, 1, 1]
6 1 0 3
After:  [2, 3, 1, 1]

Before: [0, 1, 3, 0]
12 2 2 3
After:  [0, 1, 3, 9]

Before: [1, 0, 0, 0]
10 1 0 3
After:  [1, 0, 0, 1]

Before: [2, 1, 2, 3]
2 2 1 1
After:  [2, 3, 2, 3]

Before: [2, 3, 3, 2]
8 1 3 3
After:  [2, 3, 3, 1]

Before: [0, 1, 0, 3]
5 0 0 1
After:  [0, 0, 0, 3]

Before: [3, 2, 0, 0]
1 3 1 0
After:  [2, 2, 0, 0]

Before: [0, 3, 0, 2]
8 1 3 2
After:  [0, 3, 1, 2]

Before: [0, 1, 3, 3]
7 1 0 1
After:  [0, 1, 3, 3]

Before: [0, 0, 0, 0]
5 0 0 0
After:  [0, 0, 0, 0]

Before: [2, 2, 0, 0]
4 0 1 2
After:  [2, 2, 4, 0]

Before: [2, 1, 3, 1]
9 3 2 0
After:  [3, 1, 3, 1]

Before: [0, 3, 0, 2]
8 1 3 0
After:  [1, 3, 0, 2]

Before: [1, 3, 2, 1]
6 1 2 3
After:  [1, 3, 2, 1]

Before: [3, 0, 2, 1]
13 1 0 3
After:  [3, 0, 2, 1]

Before: [0, 3, 2, 2]
5 0 0 1
After:  [0, 0, 2, 2]

Before: [1, 3, 2, 3]
6 1 2 1
After:  [1, 1, 2, 3]

Before: [1, 0, 0, 3]
10 1 0 1
After:  [1, 1, 0, 3]

Before: [0, 1, 2, 0]
7 1 0 0
After:  [1, 1, 2, 0]

Before: [3, 3, 3, 1]
9 3 2 1
After:  [3, 3, 3, 1]

Before: [3, 3, 3, 1]
9 3 2 3
After:  [3, 3, 3, 3]

Before: [0, 2, 1, 3]
5 0 0 0
After:  [0, 2, 1, 3]

Before: [3, 2, 2, 2]
12 3 0 2
After:  [3, 2, 6, 2]

Before: [2, 3, 2, 2]
8 1 3 3
After:  [2, 3, 2, 1]

Before: [2, 3, 1, 3]
14 0 3 3
After:  [2, 3, 1, 0]

Before: [2, 3, 3, 1]
0 0 3 0
After:  [3, 3, 3, 1]

Before: [3, 3, 2, 1]
9 3 2 3
After:  [3, 3, 2, 3]

Before: [2, 3, 1, 1]
1 2 0 1
After:  [2, 3, 1, 1]

Before: [2, 2, 2, 1]
9 3 2 3
After:  [2, 2, 2, 3]

Before: [0, 0, 2, 0]
11 0 1 1
After:  [0, 1, 2, 0]

Before: [2, 1, 2, 3]
3 1 3 3
After:  [2, 1, 2, 3]

Before: [1, 1, 3, 3]
15 1 0 2
After:  [1, 1, 1, 3]

Before: [0, 1, 2, 3]
7 1 0 3
After:  [0, 1, 2, 1]

Before: [0, 1, 2, 2]
7 1 0 0
After:  [1, 1, 2, 2]

Before: [1, 2, 1, 1]
4 1 1 3
After:  [1, 2, 1, 4]

Before: [0, 3, 1, 2]
8 1 3 1
After:  [0, 1, 1, 2]

Before: [2, 0, 2, 1]
9 3 2 0
After:  [3, 0, 2, 1]

Before: [3, 1, 1, 3]
3 2 3 2
After:  [3, 1, 3, 3]

Before: [0, 3, 0, 1]
5 0 0 1
After:  [0, 0, 0, 1]

Before: [1, 1, 2, 2]
15 1 0 0
After:  [1, 1, 2, 2]

Before: [1, 1, 2, 1]
15 1 0 0
After:  [1, 1, 2, 1]

Before: [1, 0, 3, 2]
10 1 0 3
After:  [1, 0, 3, 1]

Before: [0, 2, 2, 0]
2 0 2 0
After:  [2, 2, 2, 0]

Before: [0, 3, 2, 2]
8 1 3 1
After:  [0, 1, 2, 2]

Before: [2, 3, 3, 0]
12 2 1 1
After:  [2, 9, 3, 0]

Before: [0, 3, 2, 2]
6 1 2 3
After:  [0, 3, 2, 1]

Before: [2, 2, 0, 1]
0 1 3 0
After:  [3, 2, 0, 1]

Before: [2, 0, 2, 0]
2 2 2 2
After:  [2, 0, 4, 0]

Before: [3, 2, 2, 1]
0 1 3 0
After:  [3, 2, 2, 1]

Before: [0, 1, 0, 2]
9 3 1 3
After:  [0, 1, 0, 3]

Before: [0, 0, 3, 3]
11 0 1 1
After:  [0, 1, 3, 3]

Before: [0, 0, 2, 3]
11 0 1 3
After:  [0, 0, 2, 1]

Before: [0, 1, 3, 0]
5 0 0 3
After:  [0, 1, 3, 0]

Before: [0, 1, 0, 1]
7 1 0 2
After:  [0, 1, 1, 1]

Before: [1, 0, 3, 3]
10 1 0 1
After:  [1, 1, 3, 3]

Before: [0, 0, 0, 1]
11 0 1 1
After:  [0, 1, 0, 1]

Before: [0, 0, 1, 0]
5 0 0 0
After:  [0, 0, 1, 0]

Before: [1, 3, 0, 2]
8 1 3 1
After:  [1, 1, 0, 2]

Before: [1, 0, 2, 1]
10 1 0 1
After:  [1, 1, 2, 1]

Before: [2, 0, 2, 2]
4 3 0 3
After:  [2, 0, 2, 4]

Before: [2, 3, 1, 2]
8 1 3 2
After:  [2, 3, 1, 2]

Before: [0, 2, 2, 1]
4 2 1 0
After:  [4, 2, 2, 1]

Before: [0, 3, 3, 2]
8 1 3 3
After:  [0, 3, 3, 1]

Before: [2, 0, 3, 2]
13 1 0 1
After:  [2, 1, 3, 2]

Before: [2, 3, 0, 0]
6 1 0 3
After:  [2, 3, 0, 1]

Before: [1, 2, 3, 3]
12 2 2 2
After:  [1, 2, 9, 3]

Before: [0, 2, 3, 0]
1 3 1 0
After:  [2, 2, 3, 0]

Before: [0, 1, 0, 2]
7 1 0 1
After:  [0, 1, 0, 2]

Before: [3, 1, 1, 3]
3 2 3 1
After:  [3, 3, 1, 3]

Before: [0, 1, 1, 2]
7 1 0 2
After:  [0, 1, 1, 2]

Before: [2, 2, 1, 1]
1 0 2 0
After:  [3, 2, 1, 1]

Before: [0, 0, 0, 0]
5 0 0 2
After:  [0, 0, 0, 0]

Before: [3, 0, 3, 1]
9 3 2 1
After:  [3, 3, 3, 1]

Before: [2, 2, 3, 3]
13 1 2 3
After:  [2, 2, 3, 1]

Before: [1, 0, 2, 2]
10 1 0 1
After:  [1, 1, 2, 2]

Before: [1, 2, 2, 0]
1 1 0 2
After:  [1, 2, 3, 0]

Before: [2, 0, 3, 3]
12 2 2 3
After:  [2, 0, 3, 9]

Before: [1, 1, 2, 0]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [2, 2, 1, 1]
0 0 3 2
After:  [2, 2, 3, 1]

Before: [1, 0, 1, 2]
10 1 0 3
After:  [1, 0, 1, 1]

Before: [1, 3, 3, 2]
8 1 3 0
After:  [1, 3, 3, 2]

Before: [0, 2, 1, 2]
1 1 2 1
After:  [0, 3, 1, 2]

Before: [0, 0, 3, 1]
11 0 1 2
After:  [0, 0, 1, 1]

Before: [2, 1, 1, 2]
9 3 1 3
After:  [2, 1, 1, 3]

Before: [0, 2, 3, 0]
13 1 2 0
After:  [1, 2, 3, 0]

Before: [1, 2, 1, 1]
0 1 3 0
After:  [3, 2, 1, 1]

Before: [0, 1, 2, 0]
7 1 0 2
After:  [0, 1, 1, 0]

Before: [2, 3, 0, 3]
6 1 0 0
After:  [1, 3, 0, 3]

Before: [3, 0, 3, 0]
12 2 0 3
After:  [3, 0, 3, 9]

Before: [0, 3, 2, 3]
5 0 0 1
After:  [0, 0, 2, 3]

Before: [0, 3, 3, 2]
5 0 0 0
After:  [0, 3, 3, 2]

Before: [1, 1, 1, 0]
15 1 0 1
After:  [1, 1, 1, 0]

Before: [1, 1, 2, 2]
3 0 3 1
After:  [1, 3, 2, 2]

Before: [2, 2, 1, 0]
1 2 0 2
After:  [2, 2, 3, 0]

Before: [0, 0, 0, 1]
5 0 0 2
After:  [0, 0, 0, 1]

Before: [0, 1, 3, 0]
7 1 0 3
After:  [0, 1, 3, 1]

Before: [2, 0, 0, 3]
13 1 0 3
After:  [2, 0, 0, 1]

Before: [0, 1, 1, 0]
7 1 0 2
After:  [0, 1, 1, 0]

Before: [0, 1, 2, 2]
2 3 2 1
After:  [0, 4, 2, 2]

Before: [3, 1, 2, 1]
2 2 1 0
After:  [3, 1, 2, 1]

Before: [3, 0, 2, 2]
2 3 2 2
After:  [3, 0, 4, 2]

Before: [1, 0, 0, 3]
3 0 3 2
After:  [1, 0, 3, 3]

Before: [2, 2, 3, 3]
14 0 3 0
After:  [0, 2, 3, 3]

Before: [2, 2, 2, 1]
0 0 3 2
After:  [2, 2, 3, 1]

Before: [2, 3, 0, 1]
0 0 3 2
After:  [2, 3, 3, 1]

Before: [0, 0, 1, 3]
11 0 1 3
After:  [0, 0, 1, 1]

Before: [3, 2, 2, 1]
4 1 1 0
After:  [4, 2, 2, 1]

Before: [0, 2, 1, 1]
1 2 1 2
After:  [0, 2, 3, 1]

Before: [0, 1, 3, 1]
7 1 0 1
After:  [0, 1, 3, 1]

Before: [2, 0, 0, 2]
13 1 0 3
After:  [2, 0, 0, 1]

Before: [1, 1, 2, 1]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [0, 3, 2, 2]
6 1 2 2
After:  [0, 3, 1, 2]

Before: [3, 1, 3, 1]
1 1 0 1
After:  [3, 3, 3, 1]

Before: [0, 3, 2, 2]
8 1 3 3
After:  [0, 3, 2, 1]

Before: [1, 1, 0, 2]
15 1 0 0
After:  [1, 1, 0, 2]

Before: [0, 1, 1, 3]
7 1 0 1
After:  [0, 1, 1, 3]

Before: [2, 1, 1, 2]
1 0 2 1
After:  [2, 3, 1, 2]

Before: [1, 1, 1, 3]
15 1 0 0
After:  [1, 1, 1, 3]

Before: [2, 0, 0, 3]
13 1 0 1
After:  [2, 1, 0, 3]

Before: [1, 0, 1, 1]
10 1 0 2
After:  [1, 0, 1, 1]

Before: [2, 0, 2, 1]
13 1 0 2
After:  [2, 0, 1, 1]

Before: [0, 0, 0, 1]
11 0 1 0
After:  [1, 0, 0, 1]

Before: [0, 2, 0, 3]
5 0 0 1
After:  [0, 0, 0, 3]

Before: [0, 3, 2, 0]
6 1 2 1
After:  [0, 1, 2, 0]

Before: [0, 3, 2, 3]
5 0 0 0
After:  [0, 3, 2, 3]

Before: [2, 3, 2, 1]
6 1 0 0
After:  [1, 3, 2, 1]

Before: [0, 1, 2, 2]
7 1 0 1
After:  [0, 1, 2, 2]

Before: [1, 3, 2, 1]
1 0 1 0
After:  [3, 3, 2, 1]

Before: [0, 0, 1, 1]
11 0 1 3
After:  [0, 0, 1, 1]

Before: [3, 1, 2, 3]
2 1 2 0
After:  [3, 1, 2, 3]

Before: [3, 3, 2, 3]
6 1 2 3
After:  [3, 3, 2, 1]

Before: [0, 0, 1, 0]
11 0 1 2
After:  [0, 0, 1, 0]

Before: [0, 1, 0, 3]
7 1 0 2
After:  [0, 1, 1, 3]

Before: [1, 0, 2, 3]
10 1 0 2
After:  [1, 0, 1, 3]

Before: [1, 2, 0, 2]
1 0 1 0
After:  [3, 2, 0, 2]

Before: [0, 2, 1, 1]
0 1 3 0
After:  [3, 2, 1, 1]

Before: [1, 2, 0, 3]
2 2 3 1
After:  [1, 3, 0, 3]

Before: [0, 2, 2, 1]
0 2 3 0
After:  [3, 2, 2, 1]

Before: [0, 1, 1, 1]
7 1 0 1
After:  [0, 1, 1, 1]

Before: [1, 0, 2, 3]
10 1 0 3
After:  [1, 0, 2, 1]

Before: [0, 2, 3, 3]
4 1 1 1
After:  [0, 4, 3, 3]

Before: [0, 0, 2, 2]
4 2 3 3
After:  [0, 0, 2, 4]

Before: [0, 0, 3, 3]
5 0 0 3
After:  [0, 0, 3, 0]

Before: [0, 0, 3, 0]
11 0 1 1
After:  [0, 1, 3, 0]

Before: [1, 1, 1, 2]
15 1 0 1
After:  [1, 1, 1, 2]

Before: [1, 1, 1, 1]
15 1 0 3
After:  [1, 1, 1, 1]

Before: [3, 2, 3, 2]
4 1 3 1
After:  [3, 4, 3, 2]

Before: [2, 1, 1, 1]
0 0 3 3
After:  [2, 1, 1, 3]

Before: [0, 2, 3, 1]
9 3 2 0
After:  [3, 2, 3, 1]

Before: [1, 2, 3, 0]
1 0 1 1
After:  [1, 3, 3, 0]

Before: [1, 0, 2, 2]
10 1 0 0
After:  [1, 0, 2, 2]

Before: [3, 2, 2, 2]
4 3 3 3
After:  [3, 2, 2, 4]

Before: [0, 0, 0, 1]
11 0 1 2
After:  [0, 0, 1, 1]

Before: [1, 2, 3, 1]
9 3 2 2
After:  [1, 2, 3, 1]

Before: [2, 3, 3, 1]
9 3 2 1
After:  [2, 3, 3, 1]

Before: [1, 1, 0, 0]
15 1 0 2
After:  [1, 1, 1, 0]

Before: [0, 0, 3, 3]
11 0 1 0
After:  [1, 0, 3, 3]

Before: [0, 0, 3, 1]
5 0 0 2
After:  [0, 0, 0, 1]

Before: [3, 2, 0, 2]
4 3 3 1
After:  [3, 4, 0, 2]

Before: [0, 1, 2, 1]
2 0 2 3
After:  [0, 1, 2, 2]

Before: [1, 0, 0, 2]
10 1 0 3
After:  [1, 0, 0, 1]

Before: [3, 3, 3, 1]
9 3 2 0
After:  [3, 3, 3, 1]

Before: [1, 1, 2, 1]
9 3 2 1
After:  [1, 3, 2, 1]

Before: [0, 0, 1, 0]
5 0 0 1
After:  [0, 0, 1, 0]

Before: [0, 3, 2, 1]
9 3 2 1
After:  [0, 3, 2, 1]

Before: [0, 1, 1, 3]
5 0 0 0
After:  [0, 1, 1, 3]

Before: [1, 0, 1, 2]
10 1 0 1
After:  [1, 1, 1, 2]

Before: [3, 3, 1, 2]
8 1 3 2
After:  [3, 3, 1, 2]

Before: [0, 3, 3, 2]
8 1 3 0
After:  [1, 3, 3, 2]

Before: [2, 1, 2, 1]
2 1 2 2
After:  [2, 1, 3, 1]

Before: [3, 2, 3, 3]
13 1 2 3
After:  [3, 2, 3, 1]

Before: [0, 0, 3, 2]
11 0 1 3
After:  [0, 0, 3, 1]

Before: [1, 0, 2, 2]
10 1 0 3
After:  [1, 0, 2, 1]

Before: [3, 1, 1, 2]
9 3 1 3
After:  [3, 1, 1, 3]

Before: [0, 0, 2, 3]
11 0 1 1
After:  [0, 1, 2, 3]

Before: [3, 0, 1, 3]
13 1 0 3
After:  [3, 0, 1, 1]

Before: [0, 2, 1, 1]
0 1 3 2
After:  [0, 2, 3, 1]

Before: [1, 2, 2, 2]
3 0 3 1
After:  [1, 3, 2, 2]

Before: [0, 0, 1, 3]
11 0 1 2
After:  [0, 0, 1, 3]

Before: [1, 1, 1, 2]
3 0 3 0
After:  [3, 1, 1, 2]

Before: [2, 2, 3, 1]
4 0 0 1
After:  [2, 4, 3, 1]

Before: [0, 1, 3, 3]
12 2 2 2
After:  [0, 1, 9, 3]

Before: [2, 1, 1, 1]
0 0 3 2
After:  [2, 1, 3, 1]

Before: [1, 1, 2, 3]
15 1 0 3
After:  [1, 1, 2, 1]

Before: [0, 0, 0, 2]
5 0 0 1
After:  [0, 0, 0, 2]

Before: [2, 0, 3, 0]
1 1 0 0
After:  [2, 0, 3, 0]

Before: [1, 2, 3, 0]
1 0 1 0
After:  [3, 2, 3, 0]

Before: [0, 3, 1, 2]
8 1 3 2
After:  [0, 3, 1, 2]

Before: [3, 0, 2, 1]
13 1 0 2
After:  [3, 0, 1, 1]

Before: [1, 3, 2, 2]
8 1 3 0
After:  [1, 3, 2, 2]

Before: [1, 2, 0, 2]
4 3 1 2
After:  [1, 2, 4, 2]

Before: [1, 2, 1, 2]
3 0 3 3
After:  [1, 2, 1, 3]

Before: [2, 0, 1, 1]
13 1 0 2
After:  [2, 0, 1, 1]

Before: [1, 3, 2, 2]
8 1 3 3
After:  [1, 3, 2, 1]

Before: [1, 1, 0, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [3, 3, 3, 3]
12 2 0 0
After:  [9, 3, 3, 3]

Before: [0, 0, 1, 1]
11 0 1 2
After:  [0, 0, 1, 1]

Before: [2, 1, 1, 3]
14 0 3 1
After:  [2, 0, 1, 3]

Before: [0, 1, 1, 0]
7 1 0 3
After:  [0, 1, 1, 1]

Before: [2, 3, 1, 2]
4 3 3 3
After:  [2, 3, 1, 4]

Before: [0, 1, 3, 3]
1 0 2 3
After:  [0, 1, 3, 3]

Before: [1, 1, 2, 1]
15 1 0 1
After:  [1, 1, 2, 1]

Before: [0, 1, 3, 2]
7 1 0 3
After:  [0, 1, 3, 1]

Before: [2, 1, 1, 1]
12 3 0 3
After:  [2, 1, 1, 2]

Before: [1, 2, 2, 1]
0 1 3 3
After:  [1, 2, 2, 3]

Before: [3, 2, 3, 2]
13 1 2 1
After:  [3, 1, 3, 2]

Before: [0, 3, 2, 0]
6 1 2 2
After:  [0, 3, 1, 0]

Before: [2, 1, 0, 2]
12 1 0 3
After:  [2, 1, 0, 2]

Before: [3, 3, 3, 2]
12 2 0 0
After:  [9, 3, 3, 2]

Before: [0, 0, 0, 0]
11 0 1 3
After:  [0, 0, 0, 1]

Before: [0, 0, 3, 2]
11 0 1 2
After:  [0, 0, 1, 2]

Before: [0, 0, 1, 2]
1 1 3 2
After:  [0, 0, 2, 2]

Before: [2, 3, 0, 1]
6 1 0 1
After:  [2, 1, 0, 1]

Before: [2, 2, 2, 3]
14 0 3 3
After:  [2, 2, 2, 0]

Before: [0, 3, 2, 1]
0 2 3 2
After:  [0, 3, 3, 1]

Before: [2, 2, 2, 0]
2 3 2 2
After:  [2, 2, 2, 0]

Before: [3, 0, 2, 1]
0 2 3 1
After:  [3, 3, 2, 1]

Before: [1, 2, 1, 3]
14 0 3 3
After:  [1, 2, 1, 0]

Before: [3, 0, 3, 1]
13 1 0 1
After:  [3, 1, 3, 1]

Before: [3, 3, 0, 2]
4 3 3 0
After:  [4, 3, 0, 2]

Before: [0, 0, 1, 1]
11 0 1 0
After:  [1, 0, 1, 1]

Before: [1, 1, 1, 2]
9 3 1 2
After:  [1, 1, 3, 2]

Before: [2, 0, 3, 3]
14 0 3 0
After:  [0, 0, 3, 3]

Before: [1, 0, 3, 1]
10 1 0 0
After:  [1, 0, 3, 1]

Before: [1, 1, 3, 1]
15 1 0 0
After:  [1, 1, 3, 1]

Before: [2, 3, 3, 2]
12 2 2 3
After:  [2, 3, 3, 9]

Before: [0, 1, 3, 2]
7 1 0 1
After:  [0, 1, 3, 2]

Before: [2, 2, 0, 3]
14 0 3 2
After:  [2, 2, 0, 3]

Before: [0, 0, 0, 0]
11 0 1 1
After:  [0, 1, 0, 0]

Before: [0, 2, 1, 1]
1 0 2 2
After:  [0, 2, 1, 1]

Before: [0, 1, 0, 0]
7 1 0 3
After:  [0, 1, 0, 1]

Before: [1, 1, 0, 1]
15 1 0 1
After:  [1, 1, 0, 1]

Before: [0, 2, 0, 0]
4 1 1 0
After:  [4, 2, 0, 0]

Before: [2, 3, 2, 0]
6 1 0 3
After:  [2, 3, 2, 1]

Before: [1, 1, 1, 3]
15 1 0 2
After:  [1, 1, 1, 3]

Before: [2, 3, 3, 1]
6 1 0 2
After:  [2, 3, 1, 1]

Before: [0, 3, 2, 0]
2 0 2 2
After:  [0, 3, 2, 0]

Before: [0, 0, 1, 2]
11 0 1 1
After:  [0, 1, 1, 2]

Before: [1, 1, 2, 2]
15 1 0 2
After:  [1, 1, 1, 2]

Before: [3, 1, 0, 2]
1 2 0 2
After:  [3, 1, 3, 2]

Before: [0, 3, 1, 2]
8 1 3 3
After:  [0, 3, 1, 1]

Before: [1, 3, 3, 2]
8 1 3 2
After:  [1, 3, 1, 2]

Before: [2, 1, 2, 2]
2 0 1 0
After:  [3, 1, 2, 2]

Before: [1, 3, 3, 1]
2 0 2 3
After:  [1, 3, 3, 3]

Before: [1, 1, 2, 2]
9 3 1 3
After:  [1, 1, 2, 3]

Before: [2, 2, 3, 2]
13 1 2 3
After:  [2, 2, 3, 1]

Before: [1, 1, 0, 0]
15 1 0 1
After:  [1, 1, 0, 0]

Before: [0, 2, 2, 1]
5 0 0 2
After:  [0, 2, 0, 1]

Before: [2, 0, 1, 3]
14 0 3 2
After:  [2, 0, 0, 3]

Before: [2, 3, 2, 2]
8 1 3 2
After:  [2, 3, 1, 2]

Before: [1, 0, 3, 0]
10 1 0 3
After:  [1, 0, 3, 1]

Before: [1, 0, 3, 3]
10 1 0 0
After:  [1, 0, 3, 3]

Before: [2, 2, 3, 0]
4 1 1 0
After:  [4, 2, 3, 0]

Before: [1, 3, 2, 1]
6 1 2 0
After:  [1, 3, 2, 1]

Before: [1, 1, 3, 0]
15 1 0 0
After:  [1, 1, 3, 0]

Before: [1, 2, 2, 3]
2 2 2 1
After:  [1, 4, 2, 3]

Before: [2, 3, 0, 3]
14 0 3 0
After:  [0, 3, 0, 3]

Before: [2, 3, 2, 0]
6 1 0 2
After:  [2, 3, 1, 0]

Before: [1, 1, 3, 3]
3 0 3 0
After:  [3, 1, 3, 3]

Before: [2, 1, 3, 3]
14 0 3 1
After:  [2, 0, 3, 3]

Before: [0, 2, 2, 1]
4 1 1 1
After:  [0, 4, 2, 1]

Before: [1, 0, 0, 1]
10 1 0 1
After:  [1, 1, 0, 1]

Before: [2, 3, 0, 2]
6 1 0 0
After:  [1, 3, 0, 2]

Before: [0, 2, 2, 1]
0 2 3 2
After:  [0, 2, 3, 1]

Before: [0, 0, 2, 2]
11 0 1 3
After:  [0, 0, 2, 1]

Before: [0, 3, 2, 2]
6 1 2 0
After:  [1, 3, 2, 2]

Before: [0, 0, 3, 0]
11 0 1 3
After:  [0, 0, 3, 1]

Before: [0, 1, 1, 2]
3 1 3 3
After:  [0, 1, 1, 3]

Before: [2, 3, 3, 3]
14 0 3 2
After:  [2, 3, 0, 3]

Before: [1, 2, 3, 3]
14 0 3 3
After:  [1, 2, 3, 0]

Before: [0, 0, 2, 1]
11 0 1 3
After:  [0, 0, 2, 1]

Before: [1, 3, 2, 0]
6 1 2 2
After:  [1, 3, 1, 0]

Before: [2, 0, 1, 3]
14 0 3 0
After:  [0, 0, 1, 3]

Before: [2, 3, 3, 1]
6 1 0 0
After:  [1, 3, 3, 1]

Before: [0, 0, 3, 0]
11 0 1 2
After:  [0, 0, 1, 0]

Before: [0, 3, 3, 2]
8 1 3 2
After:  [0, 3, 1, 2]

Before: [1, 0, 3, 2]
10 1 0 1
After:  [1, 1, 3, 2]

Before: [1, 0, 1, 0]
10 1 0 0
After:  [1, 0, 1, 0]

Before: [0, 3, 3, 3]
12 3 1 0
After:  [9, 3, 3, 3]

Before: [1, 0, 0, 0]
10 1 0 2
After:  [1, 0, 1, 0]

Before: [2, 2, 1, 1]
0 1 3 1
After:  [2, 3, 1, 1]

Before: [1, 3, 1, 2]
3 2 3 3
After:  [1, 3, 1, 3]

Before: [2, 3, 2, 1]
0 2 3 3
After:  [2, 3, 2, 3]

Before: [1, 2, 2, 2]
4 1 1 1
After:  [1, 4, 2, 2]

Before: [1, 1, 3, 2]
3 1 3 2
After:  [1, 1, 3, 2]

Before: [1, 0, 2, 1]
10 1 0 3
After:  [1, 0, 2, 1]

Before: [2, 1, 3, 2]
12 1 0 0
After:  [2, 1, 3, 2]

Before: [2, 3, 3, 2]
8 1 3 0
After:  [1, 3, 3, 2]

Before: [1, 0, 1, 3]
10 1 0 0
After:  [1, 0, 1, 3]

Before: [1, 1, 0, 1]
15 1 0 2
After:  [1, 1, 1, 1]

Before: [1, 3, 3, 2]
3 0 3 2
After:  [1, 3, 3, 2]

Before: [2, 1, 2, 0]
2 0 1 3
After:  [2, 1, 2, 3]

Before: [2, 0, 0, 3]
14 0 3 2
After:  [2, 0, 0, 3]

Before: [1, 1, 1, 0]
15 1 0 3
After:  [1, 1, 1, 1]

Before: [1, 2, 0, 3]
14 0 3 2
After:  [1, 2, 0, 3]



9 2 0 0
9 3 0 2
9 1 0 3
12 3 0 2
3 2 1 2
3 2 3 2
4 2 1 1
7 1 3 3
9 1 3 0
9 2 0 2
9 2 3 1
7 0 2 0
3 0 3 0
4 3 0 3
9 3 2 2
3 1 0 0
2 0 2 0
1 0 2 2
3 2 2 2
3 2 1 2
4 3 2 3
7 3 0 1
9 0 0 3
9 1 2 0
9 2 1 2
7 0 2 2
3 2 1 2
3 2 3 2
4 1 2 1
7 1 1 2
9 3 1 1
9 2 0 3
2 0 1 1
3 1 2 1
4 2 1 2
7 2 0 3
9 3 0 0
9 2 0 2
9 3 2 1
1 2 0 2
3 2 3 2
3 2 1 2
4 3 2 3
7 3 0 2
9 3 3 3
9 0 2 0
9 2 1 1
15 3 1 0
3 0 3 0
4 2 0 2
7 2 0 0
9 0 1 3
9 3 3 2
9 0 1 1
10 3 2 1
3 1 2 1
4 1 0 0
9 0 2 1
10 3 2 2
3 2 2 2
4 2 0 0
7 0 0 1
9 2 0 3
9 2 2 2
9 3 2 0
6 2 0 2
3 2 3 2
3 2 2 2
4 2 1 1
7 1 0 0
9 0 1 1
3 2 0 2
2 2 0 2
9 1 3 3
3 3 2 1
3 1 2 1
4 1 0 0
7 0 0 1
3 2 0 0
2 0 3 0
3 3 2 3
3 3 1 3
4 1 3 1
7 1 1 2
9 2 1 3
9 1 1 1
9 1 3 0
4 1 0 3
3 3 1 3
4 3 2 2
7 2 0 1
9 1 2 3
9 2 1 2
3 2 0 0
2 0 2 0
8 0 3 2
3 2 1 2
3 2 3 2
4 1 2 1
9 0 2 3
9 3 3 2
13 0 2 3
3 3 2 3
4 1 3 1
7 1 3 0
9 2 0 1
9 0 2 3
1 1 2 2
3 2 3 2
4 0 2 0
7 0 2 1
3 3 0 0
2 0 2 0
9 2 3 3
9 1 0 2
11 0 3 2
3 2 3 2
4 2 1 1
7 1 3 3
9 2 0 2
9 3 2 0
9 2 0 1
1 2 0 2
3 2 3 2
4 3 2 3
3 1 0 0
2 0 1 0
9 0 3 2
3 0 2 0
3 0 1 0
4 0 3 3
7 3 2 1
9 3 2 0
9 2 0 2
3 1 0 3
2 3 0 3
6 2 0 3
3 3 2 3
4 3 1 1
7 1 3 2
9 0 1 1
3 0 0 3
2 3 1 3
9 2 1 0
8 0 3 0
3 0 3 0
4 2 0 2
7 2 2 0
3 2 0 2
2 2 3 2
9 3 0 3
9 1 3 1
5 3 2 2
3 2 2 2
4 0 2 0
7 0 2 3
9 2 2 0
9 0 3 2
3 1 2 2
3 2 2 2
4 2 3 3
7 3 2 0
9 2 3 2
9 3 3 1
9 0 2 3
14 3 2 3
3 3 2 3
4 3 0 0
7 0 3 2
9 2 0 1
9 2 2 3
9 2 3 0
11 0 3 1
3 1 1 1
4 1 2 2
7 2 3 0
9 2 1 1
9 0 0 2
9 0 3 3
0 1 3 3
3 3 2 3
4 3 0 0
3 1 0 1
2 1 1 1
9 2 0 2
9 0 1 3
14 3 2 3
3 3 3 3
3 3 1 3
4 0 3 0
7 0 3 1
9 2 1 0
9 1 0 2
9 2 2 3
0 0 3 3
3 3 1 3
3 3 1 3
4 3 1 1
7 1 1 0
9 0 0 3
9 2 1 2
9 3 2 1
14 3 2 1
3 1 1 1
3 1 1 1
4 1 0 0
7 0 0 1
9 0 3 2
3 0 0 3
2 3 2 3
9 1 2 0
10 2 3 2
3 2 1 2
4 1 2 1
7 1 3 3
3 1 0 1
2 1 1 1
9 0 2 2
3 1 2 0
3 0 3 0
4 0 3 3
7 3 1 0
9 1 0 3
3 3 2 3
3 3 3 3
4 0 3 0
9 1 2 3
9 1 3 2
3 2 0 1
2 1 0 1
2 3 1 3
3 3 1 3
4 0 3 0
9 1 1 1
9 2 2 3
12 1 3 1
3 1 2 1
4 0 1 0
7 0 0 3
9 1 3 1
9 0 1 2
3 3 0 0
2 0 2 0
12 1 0 1
3 1 2 1
4 1 3 3
7 3 2 2
9 0 2 3
9 0 0 1
0 0 3 3
3 3 2 3
4 2 3 2
7 2 0 1
3 3 0 3
2 3 3 3
3 1 0 0
2 0 1 0
9 2 3 2
7 0 2 3
3 3 1 3
3 3 1 3
4 3 1 1
7 1 3 0
9 2 1 3
9 3 2 1
6 2 1 2
3 2 3 2
3 2 2 2
4 0 2 0
7 0 0 2
9 0 2 3
9 2 2 0
9 1 3 1
0 0 3 0
3 0 1 0
4 2 0 2
7 2 1 0
3 2 0 1
2 1 0 1
9 2 0 2
14 3 2 3
3 3 1 3
4 0 3 0
7 0 2 3
9 2 2 1
9 3 2 2
9 0 1 0
9 2 0 2
3 2 2 2
4 3 2 3
7 3 2 2
9 0 2 1
3 1 0 3
2 3 2 3
9 1 0 0
12 0 3 3
3 3 3 3
4 2 3 2
7 2 0 3
9 2 3 2
7 0 2 2
3 2 3 2
4 2 3 3
9 1 3 1
3 1 0 2
2 2 0 2
3 3 0 0
2 0 3 0
9 2 1 1
3 1 1 1
4 3 1 3
7 3 1 1
9 2 3 2
9 2 2 3
9 2 1 0
11 0 3 3
3 3 1 3
3 3 1 3
4 1 3 1
7 1 0 3
9 3 1 2
9 3 2 1
6 0 1 0
3 0 2 0
4 0 3 3
9 1 3 1
9 3 3 0
9 0 3 2
3 1 2 2
3 2 1 2
3 2 2 2
4 3 2 3
7 3 3 2
9 3 1 1
9 2 0 0
9 3 0 3
6 0 1 3
3 3 3 3
4 2 3 2
7 2 2 3
9 2 3 1
3 1 0 2
2 2 3 2
9 3 3 0
1 1 0 2
3 2 1 2
4 3 2 3
7 3 3 1
9 2 0 3
9 0 3 2
9 0 2 0
10 2 3 0
3 0 2 0
4 0 1 1
9 3 2 2
9 2 3 0
0 0 3 2
3 2 2 2
4 2 1 1
7 1 2 2
3 3 0 1
2 1 3 1
9 1 1 3
12 3 0 3
3 3 2 3
3 3 1 3
4 3 2 2
7 2 1 3
9 3 3 0
3 1 0 1
2 1 2 1
9 2 3 2
6 2 0 2
3 2 1 2
4 2 3 3
9 3 0 1
9 0 3 2
13 2 0 1
3 1 3 1
4 1 3 3
7 3 1 1
3 2 0 2
2 2 3 2
9 2 2 0
9 2 0 3
1 0 2 2
3 2 2 2
3 2 1 2
4 1 2 1
7 1 3 2
3 2 0 1
2 1 2 1
11 0 3 0
3 0 1 0
4 2 0 2
7 2 2 0
9 3 2 3
9 3 3 2
9 0 3 1
5 3 2 3
3 3 1 3
3 3 2 3
4 0 3 0
7 0 0 3
9 0 0 2
9 3 0 1
9 3 1 0
13 2 0 2
3 2 2 2
4 3 2 3
7 3 3 2
9 1 0 3
9 2 3 1
9 2 2 0
8 0 3 3
3 3 1 3
4 2 3 2
7 2 3 1
9 1 1 3
3 2 0 0
2 0 3 0
3 0 0 2
2 2 0 2
13 2 0 3
3 3 1 3
4 3 1 1
9 0 2 0
9 0 0 3
3 1 0 2
2 2 3 2
10 3 2 3
3 3 1 3
3 3 2 3
4 1 3 1
7 1 1 2
9 1 1 1
3 2 0 3
2 3 1 3
3 2 0 0
2 0 2 0
12 3 0 0
3 0 3 0
4 2 0 2
7 2 3 3
9 3 0 0
9 0 0 2
5 0 2 1
3 1 2 1
3 1 3 1
4 3 1 3
9 1 2 0
9 0 3 1
3 3 0 2
2 2 3 2
4 0 0 0
3 0 3 0
4 3 0 3
7 3 0 1
9 0 3 2
9 0 1 3
3 0 0 0
2 0 0 0
9 3 2 3
3 3 3 3
3 3 1 3
4 1 3 1
7 1 2 0
3 2 0 3
2 3 3 3
9 1 2 1
3 1 2 1
3 1 3 1
4 0 1 0
9 0 2 1
9 0 3 3
9 3 2 2
9 3 1 2
3 2 3 2
4 0 2 0
7 0 1 1
9 3 3 0
9 0 0 2
9 3 3 3
5 0 2 0
3 0 1 0
4 1 0 1
7 1 2 0
9 0 2 1
9 2 2 2
9 0 0 3
14 3 2 1
3 1 1 1
3 1 3 1
4 1 0 0
7 0 1 1
9 2 2 0
9 0 0 2
0 0 3 2
3 2 2 2
4 1 2 1
7 1 0 3
9 2 1 2
3 2 0 0
2 0 3 0
9 0 0 1
6 2 0 0
3 0 2 0
3 0 2 0
4 0 3 3
3 0 0 0
2 0 3 0
9 3 3 1
6 2 0 2
3 2 3 2
4 3 2 3
7 3 0 1
9 2 0 3
3 2 0 2
2 2 0 2
10 2 3 3
3 3 1 3
4 1 3 1
7 1 1 2
9 2 3 3
9 0 0 0
3 1 0 1
2 1 1 1
12 1 3 1
3 1 1 1
4 1 2 2
9 2 1 0
9 1 2 1
9 3 1 3
15 3 0 1
3 1 1 1
4 2 1 2
7 2 3 3
3 1 0 0
2 0 0 0
3 3 0 2
2 2 3 2
9 3 0 1
9 2 1 2
3 2 2 2
3 2 1 2
4 2 3 3
7 3 3 2
9 2 2 3
3 1 0 0
2 0 2 0
11 0 3 3
3 3 2 3
4 2 3 2
7 2 3 3
9 2 0 1
9 2 3 2
9 1 2 0
7 0 2 1
3 1 3 1
4 3 1 3
7 3 1 0
9 3 0 2
9 0 2 3
3 2 0 1
2 1 1 1
3 1 2 1
3 1 2 1
4 0 1 0
7 0 0 3
9 2 0 2
3 2 0 1
2 1 2 1
9 3 2 0
1 1 0 0
3 0 3 0
4 3 0 3
7 3 0 2
9 2 0 0
9 2 3 3
9 1 1 1
11 0 3 1
3 1 3 1
4 2 1 2
7 2 1 1
9 2 3 2
11 0 3 0
3 0 1 0
4 1 0 1
9 3 1 2
3 3 0 0
2 0 2 0
11 0 3 2
3 2 3 2
4 1 2 1
9 2 0 2
9 1 3 3
9 3 1 0
1 2 0 0
3 0 2 0
3 0 3 0
4 1 0 1
7 1 1 2
9 2 1 0
3 0 0 1
2 1 1 1
12 1 0 0
3 0 1 0
3 0 3 0
4 2 0 2
9 0 1 1
9 2 3 0
9 2 2 3
11 0 3 1
3 1 3 1
3 1 3 1
4 1 2 2
3 3 0 1
2 1 2 1
9 1 0 3
12 3 0 3
3 3 3 3
4 2 3 2
7 2 1 1
9 0 0 2
9 2 1 3
10 2 3 2
3 2 2 2
4 1 2 1
7 1 0 3
9 3 1 1
9 3 1 2
13 0 2 1
3 1 2 1
3 1 1 1
4 1 3 3
7 3 3 1
9 2 3 2
9 3 3 3
15 3 0 0
3 0 2 0
4 0 1 1
7 1 3 3
3 0 0 2
2 2 0 2
9 3 1 1
9 1 1 0
9 2 0 1
3 1 1 1
4 1 3 3
7 3 3 2
9 1 3 3
9 2 1 1
4 0 3 0
3 0 3 0
4 2 0 2
7 2 3 1
9 2 3 2
9 1 3 0
9 2 0 3
12 0 3 3
3 3 1 3
3 3 1 3
4 3 1 1
7 1 0 0
9 3 0 1
3 2 0 2
2 2 3 2
9 1 1 3
2 3 1 2
3 2 2 2
4 2 0 0
7 0 1 2
3 3 0 0
2 0 2 0
8 0 3 3
3 3 1 3
4 2 3 2
7 2 0 3
9 2 0 2
9 1 1 1
9 1 1 0
7 0 2 2
3 2 3 2
3 2 3 2
4 2 3 3
7 3 3 2
9 2 3 3
9 2 3 0
12 1 0 0
3 0 1 0
4 0 2 2
7 2 0 1
9 2 2 0
9 0 1 2
11 0 3 2
3 2 2 2
4 1 2 1
9 2 2 2
9 3 1 0
3 1 0 3
2 3 0 3
14 3 2 0
3 0 1 0
3 0 2 0
4 0 1 1
7 1 0 0
3 3 0 2
2 2 1 2
9 3 0 3
9 2 0 1
5 3 2 2
3 2 3 2
3 2 2 2
4 0 2 0
7 0 3 3
9 1 1 0
9 3 1 2
1 1 2 0
3 0 2 0
4 0 3 3
7 3 0 2
9 1 3 1
9 0 3 3
9 2 3 0
9 3 0 3
3 3 1 3
3 3 3 3
4 3 2 2
7 2 1 0
3 3 0 3
2 3 0 3
9 2 2 2
9 2 2 1
14 3 2 2
3 2 1 2
4 0 2 0
9 1 1 3
9 1 2 1
3 3 0 2
2 2 3 2
3 3 2 1
3 1 3 1
4 1 0 0
7 0 3 3
9 3 3 1
9 2 1 0
9 2 3 2
6 2 1 1
3 1 3 1
4 1 3 3
7 3 0 0
9 0 0 1
3 0 0 3
2 3 1 3
2 3 1 1
3 1 3 1
3 1 3 1
4 1 0 0
7 0 3 1
9 1 1 0
9 3 3 3
9 0 0 2
3 0 2 0
3 0 2 0
3 0 1 0
4 0 1 1
7 1 3 0
9 2 2 1
9 2 3 2
9 1 3 2
3 2 2 2
4 2 0 0
9 1 0 1
9 0 1 3
9 2 0 2
0 2 3 1
3 1 1 1
3 1 1 1
4 1 0 0
9 3 0 1
3 2 0 2
2 2 3 2
10 3 2 3
3 3 2 3
4 0 3 0
7 0 2 3
3 3 0 2
2 2 2 2
9 2 2 0
6 2 1 2
3 2 1 2
4 2 3 3
7 3 0 1
3 1 0 3
2 3 2 3
9 1 3 0
9 0 3 2
4 0 0 3
3 3 2 3
4 1 3 1
7 1 3 3
9 3 1 0
9 1 0 1
9 2 0 2
3 2 2 2
4 2 3 3
9 2 3 2
9 0 1 1
3 3 0 0
2 0 1 0
4 0 0 0
3 0 2 0
4 3 0 3
7 3 3 1
3 3 0 0
2 0 1 0
9 2 1 3
7 0 2 2
3 2 1 2
4 1 2 1
7 1 1 3
9 3 1 1
3 1 0 0
2 0 2 0
9 0 0 2
6 0 1 0
3 0 2 0
4 0 3 3
7 3 0 1
3 1 0 2
2 2 3 2
9 3 0 3
9 0 1 0
9 2 3 3
3 3 1 3
4 3 1 1
7 1 0 3
9 0 0 2
9 1 2 0
9 2 2 1
4 0 0 0
3 0 2 0
3 0 3 0
4 0 3 3
7 3 1 2
9 1 0 3
9 0 0 1
9 2 1 0
8 0 3 1
3 1 3 1
4 1 2 2
7 2 3 1
9 3 0 0
9 1 3 2
5 0 2 2
3 2 2 2
3 2 2 2
4 2 1 1
9 2 1 0
9 1 2 2
12 3 0 2
3 2 2 2
4 1 2 1
9 3 0 2
8 0 3 3
3 3 2 3
4 1 3 1
7 1 2 2
9 1 2 1
9 2 0 3
11 0 3 0
3 0 3 0
3 0 3 0
4 2 0 2
9 2 0 0
9 3 2 1
11 0 3 0
3 0 2 0
4 0 2 2
7 2 2 3
9 2 0 0
9 0 3 1
9 3 3 2
13 0 2 2
3 2 3 2
4 2 3 3
7 3 3 1
9 2 1 2
3 2 0 3
2 3 1 3
4 3 3 2
3 2 1 2
3 2 3 2
4 1 2 1
7 1 0 2
9 0 1 1
9 0 2 3
9 1 3 0
9 3 1 0
3 0 1 0
4 2 0 2
7 2 3 3
9 3 0 1
9 1 3 0
9 3 3 2
2 0 1 2
3 2 1 2
4 2 3 3
9 0 2 2
9 3 3 0
5 1 2 1
3 1 3 1
4 1 3 3
7 3 3 2
9 1 3 1
9 1 0 3
4 1 3 1
3 1 3 1
4 1 2 2
7 2 3 0
3 2 0 2
2 2 3 2
9 0 0 3
9 2 0 1
1 1 2 1
3 1 3 1
4 1 0 0
7 0 2 2
9 1 2 3
3 1 0 0
2 0 2 0
9 3 3 1
6 0 1 3
3 3 2 3
4 2 3 2
7 2 3 0
3 1 0 3
2 3 0 3
9 2 1 1
3 3 0 2
2 2 3 2
10 3 2 2
3 2 3 2
4 0 2 0
7 0 3 2
9 2 0 3
9 2 0 0
9 3 0 1
15 1 3 1
3 1 1 1
4 1 2 2
7 2 3 0
9 2 1 2
9 2 2 1
0 2 3 3
3 3 1 3
4 3 0 0
7 0 0 3
9 3 0 1
9 1 3 0
9 1 0 2
4 0 0 1
3 1 3 1
3 1 3 1
4 1 3 3
7 3 3 0`;
