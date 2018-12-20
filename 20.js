"use strict";

function calc() {
	let maze = expToMaze(input.split("").filter(c => c != "^" && c != "$"));
	let part1 = null;
	let part2 = null;

	for (let step = 0; part1 == null; ++step) {
		// count unreached rooms just before the 1000th step
		if (step == 1000 - 1) {
			part2 = maze.reduce((a, r) => a + r.filter(e => e == ".").length, 0);
		}

		let next = maze.slice().map(r => r.slice());
		let moved = false;

		for (let y = 1; y < maze.length; y += 2) {
			for (let x = 1; x < maze[y].length; x += 2) {
				if (maze[y][x] == "X") {
					[[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(e => {
						const c = maze[y + e[1]][x + e[0]];
						const c2 = (maze[y + e[1] * 2] || [])[x + e[0] * 2];
						if (c2 == "." && (c == "|" || c == "-")) {
							next[y + e[1] * 2][x + e[0] * 2] = "X";
							moved = true;
						}
					});
				}
			}
		}

		if (!moved) {
			part1 = step;
		}

		maze = next;
	}

	return `${part1} ${part2}`;
}

function expToMaze(exp) {
	const dir = {N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0]};

	let coords = new Set(["0,0"]);

	getAllPatterns(exp).forEach(p => {
		let pos = [0, 0];
		p.forEach(e => {
			pos[0] += dir[e][0];
			pos[1] += dir[e][1];
			coords.add(pos.join(","));
			pos[0] += dir[e][0];
			pos[1] += dir[e][1];
			coords.add(pos.join(","));
		});
	});

	const xmin = Math.min(...[...coords].map(k => k.split(",")[0])) - 1;
	const xmax = Math.max(...[...coords].map(k => k.split(",")[0])) + 1;
	const ymin = Math.min(...[...coords].map(k => k.split(",")[1])) - 1;
	const ymax = Math.max(...[...coords].map(k => k.split(",")[1])) + 1;

	let maze = [];

	for (let y = ymin; y <= ymax; ++y) {
		let row = [];
		for (let x = xmin; x <= xmax; ++x) {
			if (x == 0 && y == 0) {
				row.push("X");
			} else {
				const pass = (x & 1) ? "|" : ((y & 1) ? "-" : ".");		// doors if x or y are odd
				row.push(!coords.has([x, y].join(",")) ? "#" : pass);
			}
		}
		maze.push(row);
	}

	return maze;
}

function getAllPatterns(exp) {
	let patterns = [[]];

	for (let i = 0; i < exp.length; ++i) {
		if (exp[i] == "(") {
			let level = 1;
			let j = i + 1;
			for (; level > 0 && j < exp.length; ++j) {
				if (exp[j] == "(") {
					++level;
				} else if (exp[j] == ")") {
					--level;
				}
			}

			let cur = patterns[patterns.length - 1].slice();
			patterns.pop();

			getAllPatterns(exp.slice(i + 1, j - 1)).forEach(p => {
				const t = cur.slice();
				t.push(...p);
				patterns.push(t)
			});
			i = j - 1;

		} else if (exp[i] == "|") {
			patterns.push([]);
		} else {
			patterns[patterns.length - 1].push(exp[i]);
		}
	}

	return patterns;
}

const input = `^EEEESWSWWN(E|WWNWNWWSESESSSWSWNNN(ESNW|)WN(E|WWNEENWNWSWSSSEESWSWWSSWWSSEEEEENNE(SESSSESESWWSESSENNESSSWWSSWWNNE(S|NNWWS(WNNEENN(NN(N|WWWSWNWSSSENES(SSSWSWSSESEENE(SEEESWSSSWSSWWSWSESSWWWSSSSEENENEEENWW(WWSW(N|S)|NNNNEEEEEESSWSEEESSWWWWN(W(SSWSESENNESSSEESESWWWWN(NWWWSSENESSSWNWWSWWWWNWNNWSWSWNWNWNENWWNWNWSSESESWSWWWNNNWNWNWNEEES(SE(SSESWENWNN|)NNNWNWNWNNNESES(W|EESEENNW(WWNWNNEENEEENNWWNWNWSWNWNWSSWNWWNNESENNEES(W|ENNNNWSSWWNNWWNEENWNNNNNENENENESSEEESSSSSENEENNNNNNESSESE(NENWNNNESSEE(NNNW(SS|WNWNWSS(WNNWWSSE(N|SES(E(SS|N)|WWWSESSW(NWWNW(NNWWS(E|WNWNNWNNESEEESS(WNWSNESE|)EEEE(NWWNNNEENWNNNNEENWWWSWSSSE(SWWWSS(WNWWNWWNWSWWWNENWWSWNNENEEEESEEEESS(WNW(S|WWW(NWWEES|)S)|SENENWNEE(NWNNNNEENNESENNNNNWWWNWNWWNWNWWNNNEESENNWWNNEENEESWS(SESWSSW(WWNSEE|)SEES(W|ESENNNENWW(NNN(W|ENWNENEESSW(SSS(WNSE|)ESSEEEEEENNWSWNWNEEENWNENNNNNEEENNNNNWSSSSWNWWNNNWNWWSSE(N|SWSEE(SSE(NEWS|)SSSWS(SSWWNW(SWSEESS(WNSE|)E|NNESE(S|NNN(ESNW|)WNENWWSWWWWWSSE(NEEEES(E|WWW)|SWWWWSWWWNNNWNEEENESSEE(NNW(NEESEEENWWNENNNNWNNESESSENNEEEES(ESESE(SSWNSENN|)NNWNNW(NWWWS(WWWNWWWSWSESWWSESWWNNWNEENNNE(EEEENNNEESWSEEEENWWNENNENWWSWWN(E|WSS(EEE|WWNN(ESNW|)WSWNWWSWSWNWWSWSESWWWNENNN(E(EEEE|S)|WWSS(ENSW|)SWSSWNWSSWWSESWWWNNWWSESSWNWSSESWWWWWSWSSESEEEESWSWNWSSSSESWSSWWNENNWNNW(NNN(ESES(W|SS)|NNNNENENESENE(NWNNWWNWNW(SSESS(EENWESWW|)SW(S|NN)|NNNEN(W|ESENESEESENN(WW|ESESSW(N|SES(E(EENNNESENNN(ESSNNW|)WSWNWW(W|SSE(SWSEWNEN|)N)|SS)|WWWNWWW(SEESSEN(SWNNWWEESSEN|)|WNN(WSNE|)ESENESEES(NWWNWSNESEES|)))))))|S))|SSS(E|SSSESESENN(W|EESWSEENESENEEENENENESESENENNWW(SEWN|)NWWNEEEES(W|EEN(ESSWSW(N|SEESWWWSWWWNWSSEESWWWN(WWSSWWN(ENSW|)WSSSSENNESSSWSEENEENEEEENENEEEE(SWSEENE(NWES|)SE(ESE(ESWSEENEESWS(WSSWWNN(ESNW|)WWWNNWN(EESSEN|WSSWSSEE(ESEE(NWES|)SESWWSESE(N|SWWWWNNNWNWSSESWWNNNN(WNWWSWSWNNWNWNW(WWSSWWNWWSWSWNNENNESEE(ESNW|)NNW(WNNWWSESWSSWSWNW(NEENWNW(NENWNEN(WN(N|E)|ESS(EEENWWNEEESSSS(NNNNWWEESSSS|)|SS))|S)|SSSEE(NWES|)SEEESENN(N|EEESEENE(NWW(NEWS|)S|ESWSSWWWWN(NWSSSSWSEENNESENESEEN(NNEESSE(SWW(NN|SSSE(NN|SSWNWSWNNENWN(WSWSESWSESEEESWSWWSEEEESSEESWSWNWWWWSSWSWSWWSEESSSWNWN(E|WWWWWWSW(SESWSEEEESSWWN(WSSSEESENN(EEEESESWWSWW(SSSSSWWNWNNEE(NNWWS(WSSSW(NNNNN(E(E|S)|NNNN)|SEESWSEEEEN(EESWSSEEENENENNWWW(WWNNESEEENNNWW(S(WNWS|ESW)|NEEESEESWWSEESW(SSENEESWSSSSWSWWSWNWWSSE(SEEN(W|ENEENESENNWNNEN(NNEENNEEESWSESWW(WSSW(S(ESENNNEESWSSENESENNEE(NNENWWNNN(EEE(N|SES(W(WNWSNESE|)SS|ENE(NWWEES|)EE))|WN(WS(WNNNE(NWNNNWWSESWWWWWWSSENEESSW(N|WW(SEESE(SWWW(NE|SEEE)|NEES(W|ENNWWNNEESW(ENWWSSNNEESW|)))|WNNNNWSWNWS(SEES(WW|S)|WNWWWWNNNNWN(WWSES(W|E)|EESESSW(SEENESEENWN(WW|EEESENEEESE(NNENENESENNWNWSWNNNNNEENNENNWSWNNENN(EESWSESSSSSSE(SWSW(WWNEN(E(NN|S)|W)|SESSSSWWSS(WWNENSWSEE|)E(N|SEESSWNWS(NESENNSSWNWS|)))|NN(ES(E|S)|NN))|WWWSE(SWSESSESWW(NNWSWNNW(NEE(S|NW(NENWESWS|)W)|W)|SSWSWWSWWSWN(WSSESENESENEENE(SS(SWNWSWS(EE|WNWWWS(WNN(E|NN)|EE))|E)|N(WWSWWEENEE|)N)|NNESEN))|E))|SWS(WNW(NEWS|)W(WWN|SE)|E)))|N)))))|S)|SESWSESS(ENSW|)W(S|N))|E))|SWSSS(EN(ESEWNW|)N|WWSESWWSESSEEEN(WN(WSNE|)(E|NN)|ESESSWSSENESSSSSEEEEESENNWNENN(ESESSSW(NN|SEENEENENWWN(EEEEESSWW(NEWS|)SEESWSEESS(EENWNNWNNNN(N|EEEEENWN(WSNE|)EESEEN(NEESWSSSEEENNW(WSEWNE|)NENESSSSSSESWSSWNWWNNN(WWWSWNN(NEESWENWWS|)WWWSSW(SSESENEESES(EEN(NW(WN(EENWESWW|)WWW(NNESNWSS|)W|S)|EES(EEENESENESEEEEEEENNWWNNESEENWNWNNWNNEEEENEEESWSW(N|SESSWW(SSSSS(WNNSSE|)EENWNNESESES(EENNESSENESEEEEENNEEEEESWS(WNWWSE|EENNNWWWWWNWNWWWNWNENEENWNNEES(ENENWWNWNEEEENNESESWSSESESESESSSENNNEENENNENWWNWNNEENWWWWNWWNEEESEENWNENNENEENWNWWS(E|SWWNWSWSSES(ENN(ESNW|)W|WWNWWNEENWWNEEENWNEEEE(S(WW|S)|NWWNENEENWNENWNEENWWWNNWNEESES(ENNENENNE(SSSSSWN(N|WSSSSSENNE(NWES|)SSSWWW(NN|SEEESSWS(WNWW(SEWN|)N(EEE|W)|SE(SSSWSW(SSS(WNNNSSSE|)ENNE(SSSWSSS(E(SWSSSW(N|SWSEESE(NN(NNN|W)|SSSWSWWNENENWWWN(W(NEWS|)SSWWWWWS(WNWNWW(SESEWNWN|)NEENESSENNE(SSENNSSWNN|)NWWN(E|W(N(NNWWEESS|)E|SW(N|SWNWSSSWNWS(NESENNSSWNWS|))))|EESSEESEES(EENEE(SWEN|)N(N|WWW(WWNWN(WSNE|)EE(NEWS|)S|S))|WWWNWS))|EE)))|NN)|WWN(ENNSSW|)W)|N)|N)|N))))|NWWSSWSW(NNNNE(NENEE(SWS(E|W)|NNWWNENE(NNNNNWWSWNNEEENNNNNWSSSWS(WNNENWNENENNWWS(SWNNNNNWWSWNWSSWSSWWNENWNWWNWSWWWSWWNWWWSSWSSESEENNN(W(NEWS|)S(S|W)|ESESESWSW(WWWWSSWWWWWNNNNWWSSWWSSWWSWNWNEEENNWWNWWSS(SSSWNNNNWWNNNWSSSSESWWWWSSSWWWNENNNNNNNNWWNENWNENWNEESESWSEESSSSEE(NWNNNEEENWNWNWW(SSE(N|E)|NNNNNWSWNNWWWSEESSSENESS(WWWNNNWSWSWSEE(N|SSWSSE(SSSSSSWNNWNENWN(E|NNNN(E|WNNNENNNNWWWSEESSWNWWNNWNWSSSWNNWWSESWSESWW(SWNWWWWWWSW(N|SS(W|ENEEN(W|ESENESESESSSSSWWWSSESSSSESSWSWNN(E|W(WWSES(W|SE(ESEEES(WWWWNWSWSWN(SENENEWSWSWN|)|ENEENWWWN(WSWENE|)NENWNEEENNESEEENENWWNNNNESSSEE(NWNNE(NNNWNNNWWNWWN(WSSWSESENE(NWES|)EESSSS(ENSW|)WWNWSWNWW(SSSSSSE(SWWW(SEEEWWWN|)NENWN(E|W)|NESEE(SEWN|)NNNNWSWW(SEESNWWN|)N(N|E))|NE(EEENESS(NNWSWWEENESS|)|NWN(W|N)))|E(EESEWNWW|)NN)|S)|SSSWSWSSENEEN(W|N(ESSEE(ENWN(WSNE|)ENWNNE(NWES|)S|SWWSESSEN(N|ESESENEN(EENNW(NEEEE(SSWW(NEWS|)SESSWNWWSSE(SEEN(ENNEENW(W|NEE(N|ESSSEEEESWWSWSSWSEENNESSESWSESSEENESEENENEESWSEENESSENENWNNWSWNWWNWSWSW(S|NNNNNESS(S|ENESEEEENWNWNEEES(W|SSEEEEESSSENESENNNWSWNNNWWS(WNNNESENNWWWNNNESSENNNNEEENWNNWNENN(WSWNWSS(WNWESE|)SE(SWS(EENSWW|)SW(S(E|WWSESSWWN(E|NNN(WSW(SSSWWWNEN(ESNW|)WWSWNWSWSEESSEES(SENNE(SSSEWNNN|)N(WWWNSEEE|)ESEEEN(WWNNNSSSEE|)ESSSSENNN(SSSWNNSSENNN|)|WWWNWN(W(SSSW(W|SEEE(NWNSES|)SSSSWNW(NENWWEESWS|)SS)|NWWWS(EE|WNNEEEN(WW|NEN(W|E(SSWSNENN|)NN))))|E))|N)|EE)))|N)|N)|ESSSSESENN(W|EEENEE(NWN(EN|WSWS)|SWSESWWNWWSSWWSEEEN(N|ESSSWWSEESWWSSSSSSENENWNNNESES(SSENESE(NNWWNNWNENE(NNNWSSW(NNNEENN(SSWWSSNNEENN|)|S)|SSEEE(SW(S(S|E)|WW)|N))|SS(EE|WS(E|WNWN(EE|WSWWSEEESSE(NEWS|)SSWNWNWN(WW(NNNNNNNWNWNW(SSESESW(ENWNWNSESESW|)|NNNE(EE(EE|SWS(WNSE|)SE(N|S))|NWWSSS))|WWSEESE(ESSWSWSSSESWSWWSEEESWSWSESES(WSWS(E|WSWNNWSSWSSWNNWWWNEEENNNWSWNNWNWSSWNNWNENNWNNNNESENNEENNEESWSEEESWSSEEN(ENE(SSWS(WSWWSEESSSE(NNEWSS|)SESW(S|WWW(SS|NE(NNNWSWS(WNWNEENWNEN(NWWW(NEN(EESWENWW|)W|SE(E|SSWNW(SSE|NWNE)))|EE)|E)|E)))|E)|NNWNN(ESE(E|S)|WNWSW(SSEE(NWES|)S(E|S)|WNWSW(WSSWWWWS(EE|WWWWWWSWWWSWNWWSESWWNWWNWNWNNEENWNNWWSWNWNENENNESESES(ESWSEENNN(WNENNENWWNE(N(NN|WWSSWS(EESW(W|S)|WWWSSWNWNW(WWWNWSWWNNWSWNNWWS(ESWENW|)WNW(NEENN(WSWNWNN(WSSWENNE|)ESENN(ESSNNW|)W|ESEEN(W|NESSSE(N|S(WWNWWEESEE|)S(ENEES(EES(E(ESNW|)NN|WW)|W)|S))))|SWNWSW(SEEWWN|)W)|SSSSW(WWWWW(NEWS|)SSWSW(W|SSES(W|EEEEESENEEESSWNWSWSWNWNWWW(W|SSEE(NWES|)SE(SWSSSESWSESWWWSW(NNNEN(W|E(SSWENN|)NNNN)|SSW(NN|SES(WWNSEE|)EEEESWSEES(WW|ENENNNESSENENNW(S|NNNESEEESWSESWW(NNWESS|)SSEEN(W|ESENNEENESEENWNNWSWWNWNNEENESES(WW(W|S)|EENNW(WNENNWWS(E|WWS(EE|WNNEENEEEENN(NESESSSSWS(SSSSWS(WNSE|)SENENNESESWSESENNESSENNNENNE(NWWSSWSWNNENNNNWNENENWNEN(ESSSSS(E|SSWNNN)|WWSWNWS(SES(ENSW|)SSW(NN|SSEE(NWES|)SWS(S|WWN(N|E)))|W))|SESE(E(EE|N(W|N))|SWW(SEESEESWSWWSEEENE(NN|SEEN(ESSESS(ENNN(ESSE(NN|S(SEE(NWES|)EESSSESESWWS(WNWNE(E|NWNW(NEESNWWS|)S(W|S))|E)|W))|NNW(SS|N(WSNE|)E))|SSWNWSWWSSWWNWNWWNNWWSSE(SWSSSSW(SESESWSSWSS(SE(NEEESENNWWW(NEN(W|NNEE(SSS(WNNSSE|)ESSESS(WNSE|)EENN(W(S|N(E|W))|E)|ENNNWWNN(W(NEWS|)WSESWSSEEN(ESNW|)W|ESEE(SSS|EE))))|W)|S)|WN(WW|NNNE(NWES|)S))|NNNWWSS(ENSW|)WWWNNESENNEEENNWNNE(NNWNEEEE(SSWS(WNNEWSSE|)EESEENEEES(EENWNWWWWW(W|S)|SWW(NEWS|)S(WNWWEESE|)S)|NW(WWWWWWSESSSWWNN(ESNW|)WSSWNNNEENN(E(N|E)|WSWWSWWW(NEEWWS|)SEEESSWSEEESENEEE(SWS(EE|W(WS(WSWNN(WWN(WSWNWNNEN(E(SSWENN|)E|WWSWNN(EE|WSWSWWSSESSSEEESSESSESSENNESE(SSS(ENSW|)WN(WWSSWSS(ESEEE(EE|NWWN(W|EENWWN))|WNW(SWEN|)NENNNE(NWNNWW(NWN(EESNWW|)WWS(E|S|WWWNNW(WNN(WSSNNE|)EEEENWWNEEN(E(N(EEN(E|WW|N)|W)|SSSESSWWN(E|W(SSEWNN|)WW))|WW)|S))|SSE(N|SSW(SEWN|)N))|SS))|N)|NNENWNE(NWWWSESWS(WNNWNNN(ES(S|EEEE)|NWSSWWNNE(S|N(EE|WW|N)))|E)|EESWSEE(WWNENWESWSEE|)))))|EE)|E)|E)|N))|NN(NN|E)))|N(EESEWNWW|)NN))|S))|N))|W))|N)))|WNNENN)|WWS(E|WWWWNWSWSWSSWNWWNNEN(ES(SWEN|)ENENWNWNNNN(ENSW|)WWSES(SSSEWNNN|)WWWWWWWNNW(NNEEESESS(ENNN(E(S(SS|E)|NN(E|N))|W)|WNW(NWES|)S)|WS(ESWENW|)W)|WWWSESSSEESEESENNNE(NEEWWS|)SSS(SS(SSES(WSNE|)E|WWWN(EE|NWSWWWWNNNW(WNENNESES(SSSEENW(ESWWNNSSEENW|)|W)|SSSSESEE(NWES|)SSWWSW(SESWENWN|)WNWWW(SEEWWN|)NEEEN(WW|ES(S|EE)))))|EE))))))|S)))))))|N))))|N))))|EE)|ESEE(NWES|)SWSEE(N|SWWSSES(ENN(W|EEN(EEEEE(N|ES(ENESEE|WWWWS(EEEE|W(WSWNSENE|)N)))|W))|WWWSWNN(W(S|W)|NNEE(SSWNSENN|)NN))))|WW(W|N)))|NNENWNEN(WW(WWWW|SS)|ESE(SS(WNSE|)(S|EE)|N))))))|W))|ENNWNEE(ENNWW(SEWN|)N(NE(SEWN|)NWNN(WSNE|)NEEENWWN(SEESWWEENWWN|)|W)|S))|N))|E)))))|W)))))|E))))))|W)|N)|NN)|S)|WW)))|NN))))|NN))|NENNW(WWWNN(WSSWNWSSE(WNNESEWNWSSE|)|EES(W|E(NNNNENWWSW(SSENSWNN|)NNNESENESEE(SWSEWNEN|)NWNWWWW(EEEESEWNWWWW|)|E)))|S))))))|NNNNNEENE(EEENNNESEESWWSES(WW|EEENENNWSW(SWEN|)NNNESENESEESWWSSENESESWWWWS(WSSSNNNE|)EEEEEEEENENNNWNENNWSWWWSSW(SESENNNESSS(EN|SWW)|NNWNW(S|WWWNNNNENWNENENEEENWNWNNNWSSSS(WNNWWWSEESWSWNWNWWNNENEEES(WWSWENEE|)EENNENNN(WWSS(ENSW|)S(WNNWWN(EE|WWWSESE(N|S(ENESNWSW|)WSWSSSSWNWWSSE(SS(WNW(S|NNNW(WNW(NENWNN(WSNE|)ESESESS(WNSE|)EENWNEE(SS|NN(ESNW|)WSWNNN(EESWENWW|)WSS(WNWWNEE(WWSEESNWWNEE|)|S))|WWWWSWN(SENEEEWWWSWN|))|SS))|ESENNN(WSNE|)ENESESWSESESE(SSWSESWWNWWNNN(E(NWNNSSES|)ES(WSEWNE|)E|WWW(SSESWSSSWNWWSESEES(WWSWNN|EENNW(NEN(NNNWESSS|)(W|EES(EESWENWW|)W)|S))|N))|NNWNEENE(WSWWSEWNEENE|)))|N)))|S)|EESEEN(ESSESSWSWWW(NNWN(N|EEES(SWNSEN|)E)|SESEEEESSSEEEESEEESEEENENENESSSESENESSWSESESWWNWSWNWWSWWNNWSWWSWWNNWNNN(EEESSE(SWW(NNWSNESS|)S|EN(W|EES(EEN(ESESWWWWS(NEEEENSWWWWS|)|N(WSNE|)N)|W)))|WN(WSSSSE(S(SSE(SWSSSESEEEESSENNENNEEESSWSW(NNEWSS|)WSESESSESWSSENEEEENNNWNNESESEENNNWW(SESNWN|)WNENNWSWNNWNEEN(WWWSS(WWNWSWWNEN(WNWSSSWWNN(ESNW|)WSSWSEEEEESWWWW(EEEENWESWWWW|)|EEE(S|N))|SESSS(ENSW|)W(NN|WS(W|EESWWSESSEENWN(SESWWNSEENWN|))))|EESS(SEEEENNNESEESSESSESSESSEESESSWNWWWN(NWSSWNWNNE(S|E(E|NWWWSSSSESSESEES(ENEN(ESSEE(SW(SE|WWN)|ENEENNWWNNEEEENWNWWNWNNNWSSWWW(SSENEESES(EE|W(WNSE|)SSSS(WSEWNE|)EE)|WNEEENWWNWNENNWWNWWNNWWSES(WWNWWSESWSS(ENSW|)WNNNNNENENWWSWW(SESSNNWN|)NNNNWNWW(NNWWWS(WWNWNWNWNNWNWSWWNNWW(N(WSNE|)EEEES(WSNE|)EEN(ESS(W|EEEESWSESS(ENNEEENENWNWN(WSW(SSEENW|WWN(WWSEWNEE|)EE)|EEEEEEESWWWW(SEESWSW(N|WSSSW(NNWSWN|SEEES(W|SEEENWNW(NWWNEEEEENESSWW(SESSESSSW(NNWSWWW(NEEWWS|)S|S(SWEN|)EEENNNNNW(N(WSNE|)ENNW(S|NENENWNNN(ESSESSSEEESWSWSEENEESWSWSESWSWWNNWN(EESSNNWW|)NNN(E|W(N|SSSSSSE(N|SSW(N|SSENESENENEENW(WWWSEWNEEE|)NEESSSENESSSSSEEESWWSSSENNESEESSWNWSSESW(SEEE(SSWNWWSSSWW(NN(ESNW|)WW|SEES(SESS(WNSE|)EE(NNW(NWNEE(NWWN(N|EE)|S)|S)|SSS)|WWWW))|NN(WSNE|)NNNNWNNW(SS|NWNNNNESESS(WNSE|)E(NNNNNNNNWWWWNNNNNNEESSW(N|SESWSEENNNNNE(NWNENWWSSWNNWSSWWNWN(EESNWW|)WSWSSSEEN(WNEWSE|)ESE(N|SWWSSESSWSEE(NNNNWESSSS|)ESSENEE(NWWEES|)SWS(ESNW|)WWW(SESWSSSENN(SSWNNNSSSENN|)|WNENWW(SS|WNW(NEN(E|NNNWW(SEWN|)NNWNWNW(N(WSNE|)EESE(NEWS|)S|SSES(E|W)))|S))))|SSSSS))|S(W|SS))))|WNWWN(NNNW(N(E|WWWS(WNNEENENN(ESSSWENNNW|)WW(NEWS|)WS(SENEWSWN|)WW|EE))|SSS)|EE))))))|WWSSW(WSS(ENEE(SWEN|)NN|SWN(WSWWEENE|)NN)|NN)))|SSSS))|W)|S))))|W))|W(NW(NNWWSES(NWNEESNWWSES|)|S)|S)))|W)|SSE(SWSWS(EENENEEESSWNWSSSWN(WSSEEEENN(WSNE|)E(ESESWW(N|S(W|EEE(SWEN|)EN(W|E)))|N)|N)|WW)|N))|EE)|SES(W|E))|SEESSE(SSE|NE))))|WWN(EE|W(W|S)))|WWS(WNNWSS(S|WNWNNNE(ESWSNENW|)NWWWN(EENE(S|NNNENN(E(NNWSNESS|)SE(S(E|W)|N)|WWS(E|W(NWSWNSENES|)SESSW(N|S))))|WSSSSWN(NNN|WWWSW(N|WSSEESEESE(SWSWNNWWNWWSSS(EEE(NWWNSEES|)SESSW(N|SEENE(S|N(E|N(WSNE|)N)))|WNNNWNNNWSWSSSWNNNNNNWSWNWWSS(WNNNNWSWNW(SSEESNWWNN|)NENESEESES(W|ENEEES(EENWNE(NWWWS(WWWNENN(WSWW(WWW(S|WW)|NEN|SE)|ES(ENSW|)S)|E)|ESSSS(WWW(NEEWWS|)S|SESWSE))|WW))|SESENE(NWWNSEES|)SSWWW(S(WWWNEE|SES(SWNSEN|)EEN(EEEE(NWNNSSES|)SS(ESWENW|)WWN(E|W)|WN(E|W)))|N)))|NE(NN(WWW(NE|SEE|WW)|EE(S(E|W)|NNW(NEWS|)S))|S))))))|E))))|EE)|W(N|W)))|NN)|WWNWSSWNNWSSWNNWSWNNW(WSESWENWNE|)NEEENENWWN(EENNEESWSSE(ESWWSWS(EENESNWSWW|)WW|N)|WSS(WNSE|)E))|NN)|E)))|W))|E))))|S))))|N))|S))|SWSESWWNW(N(NNNNWESSSS|)E|SSSS))|E(EE|N))|NN))|E)|E)|S))|SS)|S))|W))))|W))|W)|N(E|NWS(WNN(W|EE)|S))))|W))|WW(WW|N))|NW(NEWS|)S)|EESSWN)|W))|WWWWNE(EE|NWWN(E(E|N)|WSSS(ENSW|)WNWN(WSWNWWNWSSWNNWSWSWS(WWWWWWWNENWWNNWSWSSE(ESWWWNWNENNWWWWNWNEEENENWWSWNWSWNWWSESESWSWNWN(WNWWWSWWW(SSESESSS(ENNNESSSEEENENWWNN(ESEEEE(NWES|)SESS(WNWNWSS(E|W)|EE(E|NNN(E|W(W|SS))))|NWW(NEWS|)S(ESSSEWNNNW|)WWN(E|W))|WNW(N(N|E)|S))|NNNENESS(WSEWNE|)EENWNNNWWNW(NENESSEEESSENNEEESSWW(NEWS|)SEEENEENNWW(SEWN|)N(WWNWWS(WNWW(SEWN|)NEEEENNN(EEEEENN(NESS|WSW)|WSWS(E|WWWSWW(S|NNNEES(WSNE|)EENWNWWWN(NN|EEEESE(S|N)))))|E)|EENENESEEN(W|EENWN(EESENE(SSWSW(SWSWWWWW(NEEEENE(WSWWWWEEEENE|)|SSSES(ENNWNEESSEESSSSENESESESWW(NWWW(S|WW(NENE(NWNEWSES|)S|WW))|SEESSENNNENENN(EESSW(N|SES(WW(N|SS(WNN|ENE))|E))|NNNWWWSWS(SEEN(W|E(NWES|)SSW(S|W))|WNNNW(N(WSWNSENE|)EE(NW(N|W)|S(EEEEE|S))|SSS))))|WWW(NEWS|)WWWWWNW(SSEES|WNN)))|N)|EE)|N)))|SS(S|EE)))|E)|N)|EE(N|EEEE(NWES|)EEE))|E))))|W(SSEWNN|)N(W|E|N)))|NWNWSSWSE(ENSW|)SSWWWNNNE(SSEWNN|)N(W|E)))))|W)|NN)|NN)|W))|N)|W))|SE(SWSWENEN|)E)|WW))|E)|S(W|S))|NNE(S|E))|WW)|E)|NNEEEENNESSENNNEE(SWEN|)ENENNWWS(E|SWNNWNNWNWWSESESWWNWNNWNEEENNNNWWWW(NEENNENNWWS(W(SSENSWNN|)NNE(NWES|)EEESES(ENSW|)WSSE(S(WWNSEE|)ESWSESWSEENNESE(NNWWNEENE(WSWWSEWNEENE|)|SSW(SW(SSEEE(ESENESEN(SWNWSWENESEN|)|NN(WSWENE|)N(EE|N))|WN(W|E))|N))|N)|E)|SSEEE(NWWEES|)SWWWSSSSSE(SWSSENEES(SSWWWNEEN(SWWSEEWWNEEN|)|ENN(WWN|EESWS))|NN)))))|E)))|NENE(SSWENN|)NW(WSNE|)N)|W)|EEE))|W))|S)|NEEEEEEN(EE(ESWSS(WWWW(S|N(EEENSWWW|)W(S|W))|S)|NW(NEWS|)W)|WWWW))|EEESE(SSSEWNNN|)E))|N(W|N)))|E)|N)|N)|NNNN(WWWSWWSS(SWSWNN(WSSWNNW(SWSSEN|N)|E)|EEN(W|ENESSW))|NENNW(W|S)))|N))|NW(NWWWNEEEE(EEENWWWWNNWSSWNNNEEEEESS(WWNEWSEE|)ENE(NWN(WWWWNWWWWWSWSESENE(SSWWWWN(E|WSSWNWSSW(SSSWW(N(EN|WS)|SEESESWSW(SEEEENENNE(S|EE|NNNWWWW(SEEESWW(SS(SW|EN)|W)|NEEEN(ESENN(E(SSS(W|EEE)|E)|WW)|WW)))|WWNENES(NWSWSEWNENES|)))|NNNWWWN(EEEESENEENWWWNENESEEN(EENESEENNEEENWN(WWW(N|S(WWS(WS|EES)|EE))|EESSEEE(NNWW(SEWN|)NEEEEES(EENWN(E|WWN(W(N|WS(E|WWW(S|N)))|E))|WW)|SWWSWWW(SEEEWWWN|)N(WSNE|)EE))|W)|WS(SEEEWWWN|)W)))|N(W|EE))|E)|SE(SWEN|)NEEE(SWWEEN|)NE(NWES|)S)|S)|S)))))))))|S)|EE)|S)|WWWSSWWSSEE(NW|SWS))|S)|SWWWSWNNE(WSSENEWSWNNE|)))))|E)|NN))|N))|S(WNSE|)S))|WW)|SS))|EE(NWES|)SS)|NN)|S(WWSESNWNEE|)E))|S)|SSE(SWEN|)N)))|E))|S(WSSWENNE|)E)|SWSW(SEE(SESWSESSWSSWWSSWNNNEENN(E|NWWWSS(EENWESWW|)SWSWSS(SENNE(SSS(EEESEESSWWWW(SWWWSES(WWNWESEE|)ESSEEEEEENWWWNEENWN(EEESS(WNSE|)(ENNESENNWNEE(NWWWWW(NWNNWN(ENNE(ENWESW|)S|WSS(ESNW|)WW)|SES(ENSW|)W)|S)|SSS(E|WWSSSWSESSS(ESEEEE(NWWWN(W|EEEN(NESSEWNNWS|)W)|SWSWNW(S|W))|WWSWNNEENWWNENNWNN(WSW(WSS(WWNN(ES|WNW)|SEE(SWEN|)N(WNEWSE|)E)|N)|EES(S|W)))))|WWS(W(SSENSWNN|)W|E))|NE(NWES|)EE)|W)|N)|WNNW(SSWENN|)NNNNWNENWWSW(S(E|SS)|NWNNEEEEE(S(SSESWSEE(SWSWNSENEN|)NNEEN(EESWENWW|)W|WWWW)|NWWWN(WSWENE|)(EEE|N)))))|N)|NN)))|S))|W)|EE)|NNN(E(E|SS)|WWSSEN))|EEE))|NWW(NEEWWS|)(S|W))|EENWNE))|E)|E))|NW(NENSWS|)WSW(S(WW|E)|N))))$`;