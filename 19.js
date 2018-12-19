"use strict";

function calc() {
	let program = input.split("\n").map(l => ({
		opcode: l.split(" ")[0],
		args: l.match(/\d+/g).map(Number)
	}));

	const ip = program[0].args[0];
	program = program.slice(1);	

	console.log(program.map((instr, i) => printOpcode(i, instr.opcode, instr.args, ip)).join("\n"));

	const breakPoint = 1;

	const part1 = sumFactorsOf(Math.max(...runToBreakPoint(program, [0, 0, 0, 0, 0, 0], ip, breakPoint)));
	const part2 = sumFactorsOf(Math.max(...runToBreakPoint(program, [1, 0, 0, 0, 0, 0], ip, breakPoint)));

	return `${part1} ${part2}`;
}

function runToBreakPoint(program, regs, ip, breakPoint) {
	do {
		const instr = program[regs[ip]];
		regs = doOpcode(instr.opcode, instr.args, regs);
		regs[ip] += 1;

		if (regs[ip] == breakPoint) {
			break;
		}

	} while (regs[ip] < program.length);

	return regs;
}

function sumFactorsOf(x) {
	let factors = [];
	for (let i = 1; i <= x; ++i) {
		if (x % i == 0) {
			factors.push(i);
		}
	}
	return factors.reduce((a, e) => a + e, 0);
}

function doOpcode(opcode, args, regs) {
	const opcodes = {
		addr: (r, a, b) => r[a] + r[b],
		addi: (r, a, b) => r[a] + b,
		mulr: (r, a, b) => r[a] * r[b],
		muli: (r, a, b) => r[a] * b,
		banr: (r, a, b) => r[a] & r[b],
		bani: (r, a, b) => r[a] & b,
		borr: (r, a, b) => r[a] | r[b],
		bori: (r, a, b) => r[a] | b,
		setr: (r, a, b) => r[a],
		seti: (r, a, b) => a,
		gtir: (r, a, b) => a > r[b] ? 1 : 0,
		gtri: (r, a, b) => r[a] > b ? 1 : 0,
		gtrr: (r, a, b) => r[a] > r[b] ? 1 : 0,
		eqir: (r, a, b) => a == r[b] ? 1 : 0,
		eqri: (r, a, b) => r[a] == b ? 1 : 0,
		eqrr: (r, a, b) => r[a] == r[b] ? 1 : 0
	};
	
	let res = regs.slice();
	res[args[2]] = opcodes[opcode](regs, args[0], args[1]);
	return res;
}

function printOpcode(i, opcode, args, ip) {
	const opcodes = {
		addr: (a, b) => `r${a} + r${b}`,
		addi: (a, b) => `r${a} + ${b}`,
		mulr: (a, b) => `r${a} * r${b}`,
		muli: (a, b) => `r${a} * ${b}`,
		banr: (a, b) => `r${a} & r${b}`,
		bani: (a, b) => `r${a} & ${b}`,
		borr: (a, b) => `r${a} | r${b}`,
		bori: (a, b) => `r${a} | ${b}`,
		setr: (a, b) => `r${a}`,
		seti: (a, b) => `${a}`,
		gtir: (a, b) => `${a} > r${b} ? 1 : 0`,
		gtri: (a, b) => `r${a} > ${b} ? 1 : 0`,
		gtrr: (a, b) => `r${a} > r${b} ? 1 : 0`,
		eqir: (a, b) => `${a} == r${b} ? 1 : 0`,
		eqri: (a, b) => `r${a} == ${b} ? 1 : 0`,
		eqrr: (a, b) => `r${a} == r${b} ? 1 : 0`
	};

	const rhs = opcodes[opcode](args[0], args[1]).replace(new RegExp(`r${ip}`, "g"), i);

	return i + ": " + (args[2] == ip ? `jmp ${rhs} + 1` : `r${args[2]} = ${rhs}`);
}

const input = `#ip 4
addi 4 16 4
seti 1 2 5
seti 1 1 1
mulr 5 1 2
eqrr 2 3 2
addr 2 4 4
addi 4 1 4
addr 5 0 0
addi 1 1 1
gtrr 1 3 2
addr 4 2 4
seti 2 4 4
addi 5 1 5
gtrr 5 3 2
addr 2 4 4
seti 1 8 4
mulr 4 4 4
addi 3 2 3
mulr 3 3 3
mulr 4 3 3
muli 3 11 3
addi 2 4 2
mulr 2 4 2
addi 2 6 2
addr 3 2 3
addr 4 0 4
seti 0 8 4
setr 4 1 2
mulr 2 4 2
addr 4 2 2
mulr 4 2 2
muli 2 14 2
mulr 2 4 2
addr 3 2 3
seti 0 0 0
seti 0 0 4`;
