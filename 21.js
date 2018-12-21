"use strict";

function calc() {
	let program = input.split("\n").map(l => ({
		opcode: l.split(" ")[0],
		args: l.match(/\d+/g).map(Number)
	}));

	const ip = program[0].args[0];
	program = program.slice(1);	

	console.log(program.map((instr, i) => printOpcode(i, instr.opcode, instr.args, ip)).join("\n"));

	const part1 = Math.max(...runToBreakPoint(program, [0, 0, 0, 0, 0, 0], ip, program.length - 1));
	const part2 = simplified();

	return `${part1} ${part2}`;
}

function simplified() {
	let r3 = 0;
	let r4 = 0;
	let r5 = 0;

	let r3Set = new Set();
	let res = 0;

	for (let i = 0; i < 100000; ++i) {
		r4 = r3 | 65536;
		r3 = 1107552;

		while (true) {
			r3 = ((((r4 & 0xFF) + r3) & 0xFFFFFF) * 65899) & 0xFFFFFF;

			if (r4 < 256) {
				break;
			}

			r4 >>= 8;
		}

		if (!r3Set.has(r3)) {
			res = r3;
		}
		
		r3Set.add(r3);
	}	

	return res;
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

const input = `#ip 2
seti 123 0 3
bani 3 456 3
eqri 3 72 3
addr 3 2 2
seti 0 0 2
seti 0 4 3
bori 3 65536 4
seti 1107552 3 3
bani 4 255 5
addr 3 5 3
bani 3 16777215 3
muli 3 65899 3
bani 3 16777215 3
gtir 256 4 5
addr 5 2 2
addi 2 1 2
seti 27 0 2
seti 0 2 5
addi 5 1 1
muli 1 256 1
gtrr 1 4 1
addr 1 2 2
addi 2 1 2
seti 25 3 2
addi 5 1 5
seti 17 3 2
setr 5 3 4
seti 7 4 2
eqrr 3 0 5
addr 5 2 2
seti 5 8 2`;
