"use strict";

function calc() {
	const part1 = getWinner(input).army.reduce((a, e) => a + e.units, 0);
	
	let boost = 0;

	for (let mask = (1 << 15); mask != 0; mask >>= 1) {
		const winner = getWinner(input, boost | mask);

		if (winner == null || winner.title == "infection") {
			boost |= mask;
		}
	}

	while (getWinner(input, boost) == null) {
		++boost;
	}

	const part2 = getWinner(input, boost).army.reduce((a, e) => a + e.units, 0);

	return `${part1} ${part2}`;
}

function getWinner(input, boost) {
	let [immune, infection] = parse(input);
	immune.forEach(e => e.damage += (boost || 0));

	let i = 0;

	while (immune.filter(e => e.units > 0).length != 0 && infection.filter(e => e.units > 0).length != 0) {
		[immune, infection] = fightRound(immune, infection);

		if (++i > 10000) {
			return null;	// too long, exit fight
		}
	}

	return immune.filter(e => e.units > 0).length > 0 ? {army: immune, title: "immune"} : {army: infection, title: "infection"};
}

function fightRound(immune, infection) {
	selectTargets(immune, infection);
	selectTargets(infection, immune);

	[...immune, ...infection]
		.sort((a, b) => b.initiative - a.initiative)
		.filter(e => e.target != null)
		.forEach(e => e.target.units = Math.max(0, e.target.units - Math.floor(getDamage(e, e.target) / e.target.hp)));

	return [immune.filter(e => e.units > 0), infection.filter(e => e.units > 0)];
}

function selectTargets(attackers, defenders) {
	let selected = new Set();

	attackers.sort((a, b) => (getEffectivePower(a) != getEffectivePower(b)) ? 
		getEffectivePower(b) - getEffectivePower(a) : b.initiative - a.initiative);

	attackers.forEach(g => {
		let targets = defenders.filter(e => !selected.has(e));
		targets.sort((a, b) => getDamage(g, a) != getDamage(g, b) ? 
				getDamage(g, b) - getDamage(g, a) : 
				((getEffectivePower(a) != getEffectivePower(b)) ? 
						getEffectivePower(b) - getEffectivePower(a) : b.initiative - a.initiative));
		
		if (getDamage(g, targets[0]) > 0) {
			selected.add(targets[0]);
			g.target = targets[0];
		} else {
			g.target = undefined;
		}
	});
}

function getEffectivePower(group) {
	return group.units * group.damage;
}

function getDamage(attacker, defender) {
	if (attacker == null || defender == null) {
		return 0;
	}

	let damage = getEffectivePower(attacker);
	
	if (defender.immuneTo.has(attacker.damageType)) {
		damage = 0;
	}

	if (defender.weakTo.has(attacker.damageType)) {
		damage *= 2;
	}

	return damage;
}

function parse(input) {
	let immune = [];
	let infection = [];

	let current = null;

	input.split("\n").forEach(l => {
		if (l.indexOf("Immune System:") >= 0) {
			current = immune;
		} else if (l.indexOf("Infection:") >= 0) {
			current = infection;
		} else if (l.length > 0) {
			let numbers = l.match(/\d+/g).map(Number);
			let words = l.match(/[a-z]+/g);

			let weakTo = new Set();

			if (words.indexOf("weak") >= 0) {
				for (let i = words.indexOf("weak") + 2; words[i] != "with" && words[i] != "immune" && i < words.length; ++i) {
					weakTo.add(words[i]);
				}
			}

			let immuneTo = new Set();

			if (words.indexOf("immune") >= 0) {
				for (let i = words.indexOf("immune") + 2; words[i] != "with" && words[i] != "weak" && i < words.length; ++i) {
					immuneTo.add(words[i]);
				}
			}

			let damageType = words[words.indexOf("damage") - 1];

			current.push({
				index: current.length,
				units: numbers[0], 
				hp: numbers[1],
				weakTo: weakTo, 
				immuneTo: immuneTo, 
				damage: numbers[2],
				damageType: damageType,
				initiative: numbers[3]
			});
		}
	});

	return [immune, infection];
}

const input = `Immune System:
3609 units each with 2185 hit points (weak to cold, radiation) with an attack that does 5 slashing damage at initiative 20
72 units each with 5294 hit points (weak to slashing; immune to radiation, cold) with an attack that does 639 fire damage at initiative 1
4713 units each with 6987 hit points (weak to radiation) with an attack that does 12 slashing damage at initiative 2
623 units each with 9745 hit points with an attack that does 137 cold damage at initiative 6
1412 units each with 9165 hit points with an attack that does 52 bludgeoning damage at initiative 3
2042 units each with 7230 hit points (immune to cold, radiation) with an attack that does 25 bludgeoning damage at initiative 15
209 units each with 9954 hit points with an attack that does 384 cold damage at initiative 17
33 units each with 6495 hit points (weak to fire) with an attack that does 1756 fire damage at initiative 7
242 units each with 6650 hit points (immune to radiation, fire) with an attack that does 239 bludgeoning damage at initiative 12
4701 units each with 7384 hit points (immune to cold) with an attack that does 14 fire damage at initiative 9

Infection:
4154 units each with 21287 hit points (immune to fire, slashing, cold, radiation) with an attack that does 9 fire damage at initiative 5
2091 units each with 5531 hit points (immune to slashing) with an attack that does 5 fire damage at initiative 13
2237 units each with 24000 hit points with an attack that does 20 fire damage at initiative 16
149 units each with 31282 hit points (weak to radiation, cold) with an attack that does 329 radiation damage at initiative 8
649 units each with 39642 hit points with an attack that does 108 cold damage at initiative 18
108 units each with 35626 hit points (immune to radiation; weak to slashing) with an attack that does 519 cold damage at initiative 4
1194 units each with 37567 hit points (weak to fire, radiation) with an attack that does 59 radiation damage at initiative 19
2849 units each with 37603 hit points (immune to cold) with an attack that does 26 bludgeoning damage at initiative 10
451 units each with 35892 hit points (weak to slashing; immune to cold) with an attack that does 133 fire damage at initiative 14
3232 units each with 27332 hit points (weak to fire) with an attack that does 14 cold damage at initiative 11`;
