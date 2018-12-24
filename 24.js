"use strict";

function calc() {
	let [immune, infection] = parse(test);

	while (immune.filter(o => o.units > 0).length != 0 && infection.filter(o => o.units > 0).length != 0) {
		console.log("Immune: " + immune.map(e => e.units).join(",") + " Infection: " + infection.map(e => e.units).join(","));
		fight(immune, infection);
	}

	console.log(immune);
	console.log(infection);

	const winner = (immune.filter(o => o.units > 0).length > infection.filter(o => o.units > 0).length) ? immune : infection;
	
	const part1 = winner.reduce((a, e) => a + e.units, 0);
	const part2 = null;

	return `${part1} ${part2}`;
}

function fight(immune, infection) {
	immune.sort((a, b) => (a.units * a.damage != b.units * b.damage) ? 
			b.units * b.damage - a.units * a.damage : b.initiative - a.initiative);

	infection.sort((a, b) => (a.units * a.damage != b.units * b.damage) ? 
			b.units * b.damage - a.units * a.damage : b.initiative - a.initiative);

	selectTargets(immune, infection);
	selectTargets(infection, immune);

	let all = [...immune, ...infection];
	all.sort((a, b) => b.initiative - a.initiative);
	all = all.filter(e => e.target != null);
	all.forEach(e => {
		let ep = e.units * e.damage;
		if (e.target.weakTo.indexOf(e.damageType) >= 0) {
			ep = ep * 2;
		}

		if (e.target.immuneTo.indexOf(e.damageType) >= 0) {
			ep = 0;
		}

		e.targetKills = Math.floor(ep / e.target.hp);
	});

	all.forEach(e => e.target.units = Math.max(0, e.target.units - e.targetKills));	
}

function selectTargets(attacker, defender) {
	let targets = attacker.slice().map(e => null);

	attacker.forEach((g, i) => {
		let t = defender.filter(e => targets.indexOf(e) < 0 && e.immuneTo.indexOf(g.damageType) < 0);
		t.sort((a, b) => (a.weakTo.indexOf(g.damageType) > 0) != (b.weakTo.indexOf(g.damageType) > 0) ? 
			(b.weakTo.indexOf(g.damageType) > 0) - (a.weakTo.indexOf(g.damageType) > 0) : b.initiative - a.initiative);
		targets[i] = t[0];
		g.target = t[0];
	});
}

function sortArmy(army) {
	army.sort((a, b) => 
		(a.units * a.damage != b.units * b.damage) ? 
			b.units * b.damage - a.units * a.damage : 
			b.initiative - a.initiative);
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

			let weakTo = [];

			if (words.indexOf("weak") >= 0) {
				for (let i = words.indexOf("weak") + 2; words[i] != "with" && words[i] != "immune" && i < words.length; ++i) {
					weakTo.push(words[i]);
				}
			}

			let immuneTo = [];

			if (words.indexOf("immune") >= 0) {
				for (let i = words.indexOf("immune") + 2; words[i] != "with" && words[i] != "weak" && i < words.length; ++i) {
					immuneTo.push(words[i]);
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

const test = `Immune System:
17 units each with 5390 hit points (weak to radiation, bludgeoning) with an attack that does 4507 fire damage at initiative 2
989 units each with 1274 hit points (immune to fire; weak to bludgeoning, slashing) with an attack that does 25 slashing damage at initiative 3

Infection:
801 units each with 4706 hit points (weak to radiation) with an attack that does 116 bludgeoning damage at initiative 1
4485 units each with 2961 hit points (immune to radiation; weak to fire, cold) with an attack that does 12 slashing damage at initiative 4`;

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
