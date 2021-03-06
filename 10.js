"use strict";

function calc() {
	const points = input.split("\n").map(p => p.match(/-?\d+/g).map(Number));

	let t = 0;
	while (true) {
		if (getSize(getState(points, t + 1)) < getSize(getState(points, t))) {
			++t;
		} else {
			break;
		}
	}

	return getOutput(getState(points, t)) + " " + t;
}

function getState(points, t) {
	return points.map(p => [p[0] + p[2] * t, p[1] + p[3] * t]);
}

function getBoundingBox(points) {
	const x0 = Math.min(...points.map(p => p[0]));
	const y0 = Math.min(...points.map(p => p[1]));
	const x1 = Math.max(...points.map(p => p[0]));
	const y1 = Math.max(...points.map(p => p[1]));
	return [x0, y0, x1, y1];
}

function getSize(points) {
	const box = getBoundingBox(points);
	return box[2] - box[0] + box[3] - box[1];
}

function getOutput(points) {
	let text = [];

	const box = getBoundingBox(points);

	for (let y = box[1]; y <= box[3]; ++y) {
		let line = [];
		
		for (let x = box[0]; x <= box[2]; ++x) {
			line.push(points.filter(p => p[0] == x && p[1] == y).length != 0 ? "#" : "_");
		}

		text.push(line.join(""));
	}

	return text.join("<br/>");
}

const input = `position=<-19942, -39989> velocity=< 2,  4>
position=< 30232,  40297> velocity=<-3, -4>
position=<-39990,  -9882> velocity=< 4,  1>
position=<-50052,  40304> velocity=< 5, -4>
position=<-19947, -19921> velocity=< 2,  2>
position=< 30281, -50026> velocity=<-3,  5>
position=< -9900,  50338> velocity=< 1, -5>
position=< -9908,  -9884> velocity=< 1,  1>
position=<-19912, -39987> velocity=< 2,  4>
position=< 40288,  -9883> velocity=<-4,  1>
position=< 50352,  20223> velocity=<-5, -2>
position=<-19923,  40296> velocity=< 2, -4>
position=<-29936,  40299> velocity=< 3, -4>
position=< 40282, -50024> velocity=<-4,  5>
position=< 20204, -29954> velocity=<-2,  3>
position=<-19928, -19919> velocity=< 2,  2>
position=< 40307,  40299> velocity=<-4, -4>
position=< -9892,  10188> velocity=< 1, -1>
position=< 20219, -29953> velocity=<-2,  3>
position=<-29992, -50024> velocity=< 3,  5>
position=< 50350,  30263> velocity=<-5, -3>
position=< 10181,  50335> velocity=<-1, -5>
position=<-29984,  40301> velocity=< 3, -4>
position=< 50305,  20223> velocity=<-5, -2>
position=<-19912,  -9877> velocity=< 2,  1>
position=< 10190,  40298> velocity=<-1, -4>
position=<-19912,  40297> velocity=< 2, -4>
position=< 10197, -19917> velocity=<-1,  2>
position=< 40293, -29949> velocity=<-4,  3>
position=< 40258, -19912> velocity=<-4,  2>
position=< 30249,  50333> velocity=<-3, -5>
position=<-39981, -19917> velocity=< 4,  2>
position=< 20240,  -9878> velocity=<-2,  1>
position=<-29972, -29957> velocity=< 3,  3>
position=< 40304,  30259> velocity=<-4, -3>
position=<-29992, -39993> velocity=< 3,  4>
position=<-40024,  40303> velocity=< 4, -4>
position=< 30276,  50337> velocity=<-3, -5>
position=< 50348, -19920> velocity=<-5,  2>
position=< 30248,  40298> velocity=<-3, -4>
position=<-29975,  10187> velocity=< 3, -1>
position=<-29979,  10193> velocity=< 3, -1>
position=<-19936, -39984> velocity=< 2,  4>
position=<-19920, -39991> velocity=< 2,  4>
position=<-29964, -39993> velocity=< 3,  4>
position=< 50348,  20231> velocity=<-5, -2>
position=<-19909,  40295> velocity=< 2, -4>
position=< 40282,  40300> velocity=<-4, -4>
position=< 10198,  40299> velocity=<-1, -4>
position=< 10176,  30268> velocity=<-1, -3>
position=<-29946,  30263> velocity=< 3, -3>
position=<-19931, -39992> velocity=< 2,  4>
position=<-19899,  20224> velocity=< 2, -2>
position=< 20208, -29957> velocity=<-2,  3>
position=<-50018,  20227> velocity=< 5, -2>
position=<-50036, -29953> velocity=< 5,  3>
position=< 50332,  30266> velocity=<-5, -3>
position=<-19912,  50339> velocity=< 2, -5>
position=< 10189,  10191> velocity=<-1, -1>
position=< 10180, -39989> velocity=<-1,  4>
position=<-19956,  10188> velocity=< 2, -1>
position=< -9890, -50025> velocity=< 1,  5>
position=< 40293, -29957> velocity=<-4,  3>
position=< 50329,  50337> velocity=<-5, -5>
position=< 10177,  40295> velocity=<-1, -4>
position=< 50319,  20223> velocity=<-5, -2>
position=< -9880,  20231> velocity=< 1, -2>
position=<-40000,  50332> velocity=< 4, -5>
position=<-29971, -50020> velocity=< 3,  5>
position=<-19904,  20227> velocity=< 2, -2>
position=< 40293,  20232> velocity=<-4, -2>
position=< 50332,  20224> velocity=<-5, -2>
position=< -9887, -19916> velocity=< 1,  2>
position=<-39980, -19921> velocity=< 4,  2>
position=< -9920, -50021> velocity=< 1,  5>
position=<-19920, -39991> velocity=< 2,  4>
position=< 10180, -19921> velocity=<-1,  2>
position=< 20188, -50026> velocity=<-2,  5>
position=<-50020, -39986> velocity=< 5,  4>
position=<-50035,  30263> velocity=< 5, -3>
position=< -9911, -39993> velocity=< 1,  4>
position=<-39988, -39985> velocity=< 4,  4>
position=<-50040,  30262> velocity=< 5, -3>
position=<-50036,  50339> velocity=< 5, -5>
position=< 30224,  10194> velocity=<-3, -1>
position=<-19934, -50020> velocity=< 2,  5>
position=<-40003,  -9876> velocity=< 4,  1>
position=<-50036,  20232> velocity=< 5, -2>
position=< 10183, -50025> velocity=<-1,  5>
position=<-29956, -39986> velocity=< 3,  4>
position=< -9892,  10194> velocity=< 1, -1>
position=<-39995,  40304> velocity=< 4, -4>
position=<-39995,  -9883> velocity=< 4,  1>
position=<-19919,  50336> velocity=< 2, -5>
position=< -9903,  30260> velocity=< 1, -3>
position=< 10174, -29948> velocity=<-1,  3>
position=<-19903, -19917> velocity=< 2,  2>
position=< 20188, -50021> velocity=<-2,  5>
position=< 50321, -29956> velocity=<-5,  3>
position=< 20209, -19912> velocity=<-2,  2>
position=< 20216,  50333> velocity=<-2, -5>
position=< 40304, -39990> velocity=<-4,  4>
position=<-39975, -39989> velocity=< 4,  4>
position=<-39979, -19921> velocity=< 4,  2>
position=< 50353,  -9884> velocity=<-5,  1>
position=< 40317,  10189> velocity=<-4, -1>
position=<-40020,  20230> velocity=< 4, -2>
position=<-39976,  10192> velocity=< 4, -1>
position=<-29940,  50333> velocity=< 3, -5>
position=< 30249,  20223> velocity=<-3, -2>
position=<-39976,  10190> velocity=< 4, -1>
position=<-40030,  40304> velocity=< 4, -4>
position=<-39990,  20229> velocity=< 4, -2>
position=< 20201,  10194> velocity=<-2, -1>
position=< -9868, -39986> velocity=< 1,  4>
position=< 30232,  50335> velocity=<-3, -5>
position=<-50048,  10189> velocity=< 5, -1>
position=< -9920, -29954> velocity=< 1,  3>
position=<-40011,  10195> velocity=< 4, -1>
position=<-29951, -19921> velocity=< 3,  2>
position=<-50043,  40304> velocity=< 5, -4>
position=<-29964, -50023> velocity=< 3,  5>
position=<-29970,  50336> velocity=< 3, -5>
position=<-29964,  20226> velocity=< 3, -2>
position=< 10167,  30263> velocity=<-1, -3>
position=< 10173,  20229> velocity=<-1, -2>
position=<-29991, -29957> velocity=< 3,  3>
position=<-50043,  40295> velocity=< 5, -4>
position=<-19902,  40295> velocity=< 2, -4>
position=< 30236,  30259> velocity=<-3, -3>
position=< 20204, -50027> velocity=<-2,  5>
position=< -9912,  20231> velocity=< 1, -2>
position=< -9887,  10194> velocity=< 1, -1>
position=<-40008,  10187> velocity=< 4, -1>
position=<-39987, -50029> velocity=< 4,  5>
position=< 20240,  40297> velocity=<-2, -4>
position=< 30236, -39985> velocity=<-3,  4>
position=<-50012, -39986> velocity=< 5,  4>
position=<-19912,  30260> velocity=< 2, -3>
position=<-50044,  50339> velocity=< 5, -5>
position=<-50057, -39993> velocity=< 5,  4>
position=<-19941, -29952> velocity=< 2,  3>
position=<-29937,  40299> velocity=< 3, -4>
position=< 20224,  30265> velocity=<-2, -3>
position=< 40277,  50339> velocity=<-4, -5>
position=<-19960,  10194> velocity=< 2, -1>
position=<-19959,  10196> velocity=< 2, -1>
position=< 20187,  20232> velocity=<-2, -2>
position=< 20212,  30262> velocity=<-2, -3>
position=<-29952,  40296> velocity=< 3, -4>
position=< 30224, -50023> velocity=<-3,  5>
position=<-50049,  20228> velocity=< 5, -2>
position=< 30224, -29955> velocity=<-3,  3>
position=<-19920, -50023> velocity=< 2,  5>
position=< -9915,  40304> velocity=< 1, -4>
position=<-40020,  20231> velocity=< 4, -2>
position=<-50028,  40304> velocity=< 5, -4>
position=<-29988,  50338> velocity=< 3, -5>
position=< 50312,  40297> velocity=<-5, -4>
position=< 20195,  30259> velocity=<-2, -3>
position=< 10188,  10190> velocity=<-1, -1>
position=< 10209,  50334> velocity=<-1, -5>
position=< -9904, -29951> velocity=< 1,  3>
position=< 30260,  40304> velocity=<-3, -4>
position=< 50296,  50334> velocity=<-5, -5>
position=< 10180, -19920> velocity=<-1,  2>
position=< 10175,  -9881> velocity=<-1,  1>
position=< 40280, -39985> velocity=<-4,  4>
position=<-40000, -19914> velocity=< 4,  2>
position=< -9873,  -9885> velocity=< 1,  1>
position=< 20187,  40304> velocity=<-2, -4>
position=< 20216,  50336> velocity=<-2, -5>
position=< 50296, -50029> velocity=<-5,  5>
position=<-19920,  30267> velocity=< 2, -3>
position=<-39995,  50332> velocity=< 4, -5>
position=<-29940, -19920> velocity=< 3,  2>
position=<-19901,  30263> velocity=< 2, -3>
position=< 20227,  40297> velocity=<-2, -4>
position=< 40309,  40295> velocity=<-4, -4>
position=< 50335,  40302> velocity=<-5, -4>
position=< 30281,  10190> velocity=<-3, -1>
position=< 20211, -29948> velocity=<-2,  3>
position=< 20224,  -9884> velocity=<-2,  1>
position=< 10209,  50333> velocity=<-1, -5>
position=< -9913,  50340> velocity=< 1, -5>
position=< 50308,  50331> velocity=<-5, -5>
position=<-29953,  -9883> velocity=< 3,  1>
position=< 40292,  20227> velocity=<-4, -2>
position=< 20187, -19912> velocity=<-2,  2>
position=<-29948,  40299> velocity=< 3, -4>
position=< 30279,  10191> velocity=<-3, -1>
position=<-19956,  50336> velocity=< 2, -5>
position=< 50335,  -9883> velocity=<-5,  1>
position=< 40264,  40303> velocity=<-4, -4>
position=< 10196,  20225> velocity=<-1, -2>
position=< -9868,  20224> velocity=< 1, -2>
position=<-19948,  10194> velocity=< 2, -1>
position=<-50020, -19913> velocity=< 5,  2>
position=< 40304,  -9885> velocity=<-4,  1>
position=< 30260,  -9885> velocity=<-3,  1>
position=<-39992,  -9880> velocity=< 4,  1>
position=<-40015, -29955> velocity=< 4,  3>
position=<-40022,  20232> velocity=< 4, -2>
position=< 20221, -29957> velocity=<-2,  3>
position=<-39971,  20225> velocity=< 4, -2>
position=< 40280, -29949> velocity=<-4,  3>
position=<-40008,  20230> velocity=< 4, -2>
position=<-50020,  30264> velocity=< 5, -3>
position=<-29961,  20227> velocity=< 3, -2>
position=< 20233,  -9885> velocity=<-2,  1>
position=<-40024,  50339> velocity=< 4, -5>
position=< -9915, -50020> velocity=< 1,  5>
position=<-29992,  50337> velocity=< 3, -5>
position=< 40259,  30259> velocity=<-4, -3>
position=< 40260, -19919> velocity=<-4,  2>
position=<-40014, -50025> velocity=< 4,  5>
position=< 50340, -50027> velocity=<-5,  5>
position=< 30246,  50331> velocity=<-3, -5>
position=<-50020, -19912> velocity=< 5,  2>
position=<-40000,  10195> velocity=< 4, -1>
position=<-50060, -19914> velocity=< 5,  2>
position=<-39999,  40299> velocity=< 4, -4>
position=< 40304,  40304> velocity=<-4, -4>
position=<-19956, -39989> velocity=< 2,  4>
position=<-40020, -19920> velocity=< 4,  2>
position=< -9872,  10191> velocity=< 1, -1>
position=<-40006,  50331> velocity=< 4, -5>
position=<-50048,  40298> velocity=< 5, -4>
position=< 10184,  50335> velocity=<-1, -5>
position=< 10206,  -9881> velocity=<-1,  1>
position=< 10160,  -9880> velocity=<-1,  1>
position=<-50047,  -9885> velocity=< 5,  1>
position=< 10169,  50340> velocity=<-1, -5>
position=<-39980,  10191> velocity=< 4, -1>
position=< 20225, -29952> velocity=<-2,  3>
position=< 40296, -29955> velocity=<-4,  3>
position=<-50020,  20230> velocity=< 5, -2>
position=<-19948,  10190> velocity=< 2, -1>
position=< 40260, -39986> velocity=<-4,  4>
position=< 30232, -39992> velocity=<-3,  4>
position=<-29967,  10196> velocity=< 3, -1>
position=<-19912,  10192> velocity=< 2, -1>
position=<-40003, -39993> velocity=< 4,  4>
position=< 50332,  50334> velocity=<-5, -5>
position=< 10165,  50333> velocity=<-1, -5>
position=< 20201, -29955> velocity=<-2,  3>
position=< 10185,  -9882> velocity=<-1,  1>
position=< 20221, -50029> velocity=<-2,  5>
position=<-19902,  10187> velocity=< 2, -1>
position=< 30240,  50338> velocity=<-3, -5>
position=<-39976,  20225> velocity=< 4, -2>
position=<-50065, -50029> velocity=< 5,  5>
position=< 40260,  10187> velocity=<-4, -1>
position=<-19955,  -9885> velocity=< 2,  1>
position=< 30224,  30267> velocity=<-3, -3>
position=<-50028,  20228> velocity=< 5, -2>
position=<-29937,  30259> velocity=< 3, -3>
position=<-39995,  10196> velocity=< 4, -1>
position=<-50023, -50029> velocity=< 5,  5>
position=<-29978, -50024> velocity=< 3,  5>
position=< 30239, -50025> velocity=<-3,  5>
position=<-19956, -39986> velocity=< 2,  4>
position=< -9904, -29954> velocity=< 1,  3>
position=< 10204, -39993> velocity=<-1,  4>
position=<-29959,  50335> velocity=< 3, -5>
position=< 10166,  40299> velocity=<-1, -4>
position=<-29959, -39987> velocity=< 3,  4>
position=<-50068,  30266> velocity=< 5, -3>
position=< 20225,  10192> velocity=<-2, -1>
position=<-40024, -29950> velocity=< 4,  3>
position=<-19918,  40301> velocity=< 2, -4>
position=<-39992,  50339> velocity=< 4, -5>
position=< -9908, -39993> velocity=< 1,  4>
position=< 30248, -50029> velocity=<-3,  5>
position=< 40280, -39986> velocity=<-4,  4>
position=<-19956, -19920> velocity=< 2,  2>
position=< 40301, -50020> velocity=<-4,  5>
position=< 20200,  -9877> velocity=<-2,  1>
position=< 40275,  20227> velocity=<-4, -2>
position=<-29959, -29956> velocity=< 3,  3>
position=<-50056, -39991> velocity=< 5,  4>
position=< 50292,  50338> velocity=<-5, -5>
position=< -9880,  40303> velocity=< 1, -4>
position=< 50295, -19921> velocity=<-5,  2>
position=< 10205, -19921> velocity=<-1,  2>
position=<-40015, -29954> velocity=< 4,  3>
position=<-50056,  30259> velocity=< 5, -3>
position=< 10192, -19920> velocity=<-1,  2>
position=< 40306, -39993> velocity=<-4,  4>
position=< 40273, -39990> velocity=<-4,  4>
position=< 50336, -39992> velocity=<-5,  4>
position=< 40307,  10191> velocity=<-4, -1>
position=< 20195,  50331> velocity=<-2, -5>
position=< -9876,  40296> velocity=< 1, -4>
position=< -9896, -29957> velocity=< 1,  3>
position=< 20224, -19917> velocity=<-2,  2>
position=< 40292,  20227> velocity=<-4, -2>
position=<-19923, -39986> velocity=< 2,  4>
position=< 20233, -50025> velocity=<-2,  5>
position=< 40277, -50028> velocity=<-4,  5>
position=<-19920,  30263> velocity=< 2, -3>
position=< 30270, -39993> velocity=<-3,  4>
position=< 50348,  50340> velocity=<-5, -5>
position=< 40285, -39992> velocity=<-4,  4>
position=<-40003, -50020> velocity=< 4,  5>
position=<-19960, -39985> velocity=< 2,  4>
position=<-50027, -50025> velocity=< 5,  5>
position=< 50332,  40301> velocity=<-5, -4>`;
