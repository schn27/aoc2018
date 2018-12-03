"use strict";

function calc() {
	const claims = input.split("\n").map(e => e.match(/\d+/g).map(Number));

	let fabric = [];
	let ids = [];

	claims.forEach(claim => {
		let overlapped = false;

		for (let y = claim[2]; y < claim[2] + claim[4]; ++y) {
			for (let x = claim[1]; x < claim[1] + claim[3]; ++x) {
				const pos = y * 1000 + x;
				let id = claim[0];

				if (fabric[pos] != undefined) {
					const i = ids.indexOf(Math.abs(fabric[pos]));

					if (i >= 0) {
						ids.splice(i, 1);
					}

					overlapped = true;
					id = -id;	// mark field as overlapped
				} 

				fabric[pos] = id;
			}
		}

		if (!overlapped) {
			ids.push(claim[0]);
		}
	});

	return Object.values(fabric).filter(v => v < 0).length + " " + ids;
}


const input = `#1 @ 37,526: 17x23
#2 @ 75,649: 23x11
#3 @ 138,364: 29x12
#4 @ 370,260: 20x17
#5 @ 345,512: 17x22
#6 @ 798,255: 11x21
#7 @ 65,658: 27x12
#8 @ 561,59: 11x24
#9 @ 676,491: 25x24
#10 @ 466,216: 12x14
#11 @ 244,867: 21x22
#12 @ 540,331: 24x15
#13 @ 588,819: 21x16
#14 @ 449,749: 11x11
#15 @ 718,975: 22x24
#16 @ 634,684: 3x4
#17 @ 762,66: 14x22
#18 @ 890,30: 28x12
#19 @ 765,380: 29x13
#20 @ 362,91: 12x20
#21 @ 409,438: 25x14
#22 @ 951,842: 13x26
#23 @ 561,384: 28x26
#24 @ 231,112: 16x13
#25 @ 295,64: 18x11
#26 @ 559,254: 12x27
#27 @ 542,298: 19x22
#28 @ 380,923: 20x11
#29 @ 639,811: 28x26
#30 @ 355,781: 18x15
#31 @ 346,401: 18x27
#32 @ 863,904: 22x20
#33 @ 674,53: 28x23
#34 @ 547,932: 21x27
#35 @ 330,763: 29x14
#36 @ 9,26: 25x12
#37 @ 736,934: 12x29
#38 @ 199,569: 12x26
#39 @ 238,881: 15x21
#40 @ 285,409: 28x21
#41 @ 889,332: 27x28
#42 @ 491,332: 16x19
#43 @ 804,806: 19x22
#44 @ 400,539: 19x11
#45 @ 858,364: 22x18
#46 @ 781,391: 29x12
#47 @ 775,65: 28x24
#48 @ 142,303: 24x15
#49 @ 176,82: 23x14
#50 @ 919,370: 28x11
#51 @ 533,62: 21x10
#52 @ 787,796: 18x20
#53 @ 663,127: 23x29
#54 @ 685,477: 26x29
#55 @ 915,940: 28x13
#56 @ 271,34: 14x16
#57 @ 335,111: 26x17
#58 @ 69,221: 12x14
#59 @ 561,67: 29x28
#60 @ 562,559: 27x19
#61 @ 78,194: 27x24
#62 @ 597,392: 14x22
#63 @ 727,201: 19x29
#64 @ 795,818: 18x10
#65 @ 323,772: 13x14
#66 @ 522,267: 15x23
#67 @ 583,373: 20x20
#68 @ 22,955: 27x11
#69 @ 958,782: 18x16
#70 @ 288,650: 17x25
#71 @ 244,459: 28x10
#72 @ 337,36: 27x28
#73 @ 384,95: 19x11
#74 @ 510,205: 13x21
#75 @ 778,577: 18x22
#76 @ 263,407: 11x26
#77 @ 50,388: 25x26
#78 @ 224,546: 18x27
#79 @ 31,556: 13x26
#80 @ 834,320: 22x29
#81 @ 797,292: 12x15
#82 @ 34,29: 23x11
#83 @ 529,324: 14x29
#84 @ 492,346: 19x16
#85 @ 271,427: 10x29
#86 @ 411,804: 12x13
#87 @ 158,518: 21x15
#88 @ 904,628: 22x26
#89 @ 268,958: 15x10
#90 @ 198,555: 21x11
#91 @ 922,868: 18x25
#92 @ 684,127: 14x12
#93 @ 738,110: 19x16
#94 @ 545,449: 24x19
#95 @ 437,264: 17x22
#96 @ 207,572: 14x28
#97 @ 850,622: 24x19
#98 @ 315,329: 27x10
#99 @ 233,436: 15x29
#100 @ 817,217: 26x28
#101 @ 90,221: 19x15
#102 @ 267,846: 29x27
#103 @ 855,222: 12x21
#104 @ 516,777: 23x16
#105 @ 397,676: 23x12
#106 @ 664,117: 29x20
#107 @ 22,395: 13x26
#108 @ 900,693: 26x16
#109 @ 134,396: 18x19
#110 @ 837,369: 28x18
#111 @ 512,448: 14x21
#112 @ 745,542: 18x15
#113 @ 801,269: 10x24
#114 @ 774,874: 28x29
#115 @ 275,286: 11x25
#116 @ 674,726: 15x13
#117 @ 461,205: 18x17
#118 @ 909,91: 24x13
#119 @ 49,287: 12x14
#120 @ 784,46: 15x11
#121 @ 381,834: 16x22
#122 @ 79,910: 29x24
#123 @ 840,147: 20x13
#124 @ 54,353: 11x21
#125 @ 133,398: 23x18
#126 @ 384,783: 13x11
#127 @ 833,886: 25x28
#128 @ 891,30: 27x25
#129 @ 741,302: 26x12
#130 @ 246,767: 10x18
#131 @ 635,252: 11x21
#132 @ 337,671: 12x12
#133 @ 529,563: 8x15
#134 @ 338,575: 29x17
#135 @ 27,31: 17x10
#136 @ 436,912: 20x27
#137 @ 877,709: 24x25
#138 @ 741,122: 27x16
#139 @ 784,134: 21x21
#140 @ 256,837: 21x21
#141 @ 569,959: 27x28
#142 @ 94,163: 12x10
#143 @ 434,25: 12x12
#144 @ 467,375: 3x16
#145 @ 554,946: 12x27
#146 @ 594,345: 15x27
#147 @ 579,196: 28x27
#148 @ 746,688: 23x28
#149 @ 420,724: 15x18
#150 @ 372,674: 28x12
#151 @ 647,862: 22x25
#152 @ 700,47: 26x16
#153 @ 762,568: 26x18
#154 @ 960,139: 15x28
#155 @ 762,524: 22x27
#156 @ 3,31: 29x13
#157 @ 278,843: 24x12
#158 @ 312,868: 13x22
#159 @ 393,682: 4x6
#160 @ 440,47: 11x21
#161 @ 798,263: 13x10
#162 @ 650,819: 20x22
#163 @ 385,569: 29x19
#164 @ 305,464: 17x22
#165 @ 452,719: 12x19
#166 @ 373,92: 20x13
#167 @ 937,502: 17x29
#168 @ 636,185: 23x10
#169 @ 708,21: 22x29
#170 @ 434,412: 15x10
#171 @ 848,599: 23x13
#172 @ 540,948: 12x19
#173 @ 781,553: 14x24
#174 @ 660,237: 19x24
#175 @ 914,69: 15x27
#176 @ 133,481: 20x20
#177 @ 26,681: 15x14
#178 @ 219,800: 29x23
#179 @ 712,201: 11x29
#180 @ 487,879: 22x13
#181 @ 57,557: 26x15
#182 @ 915,404: 18x12
#183 @ 154,358: 13x17
#184 @ 196,193: 27x23
#185 @ 488,630: 10x17
#186 @ 658,614: 13x23
#187 @ 76,170: 26x27
#188 @ 549,454: 14x10
#189 @ 779,751: 25x20
#190 @ 234,766: 13x29
#191 @ 713,964: 29x11
#192 @ 695,679: 13x15
#193 @ 888,651: 19x11
#194 @ 513,195: 11x24
#195 @ 402,685: 21x4
#196 @ 891,270: 28x12
#197 @ 851,72: 13x25
#198 @ 591,788: 10x14
#199 @ 861,638: 13x15
#200 @ 13,33: 25x23
#201 @ 386,621: 16x12
#202 @ 260,437: 29x29
#203 @ 264,223: 14x18
#204 @ 398,432: 26x27
#205 @ 364,304: 23x23
#206 @ 68,763: 18x15
#207 @ 662,833: 19x24
#208 @ 587,923: 26x22
#209 @ 983,663: 11x18
#210 @ 1,176: 24x21
#211 @ 599,764: 16x24
#212 @ 557,83: 10x25
#213 @ 335,766: 19x7
#214 @ 537,310: 11x12
#215 @ 59,922: 3x3
#216 @ 471,740: 27x17
#217 @ 585,443: 10x13
#218 @ 695,860: 29x11
#219 @ 542,647: 21x25
#220 @ 457,382: 15x29
#221 @ 859,697: 21x19
#222 @ 842,131: 10x29
#223 @ 426,767: 13x27
#224 @ 972,232: 19x21
#225 @ 113,38: 11x15
#226 @ 780,347: 16x28
#227 @ 39,115: 10x12
#228 @ 358,180: 25x27
#229 @ 932,926: 22x15
#230 @ 8,173: 21x27
#231 @ 369,553: 23x15
#232 @ 718,186: 14x10
#233 @ 379,606: 18x17
#234 @ 608,965: 21x11
#235 @ 221,895: 10x27
#236 @ 773,280: 16x22
#237 @ 301,99: 14x17
#238 @ 771,57: 28x14
#239 @ 840,378: 27x19
#240 @ 667,186: 11x23
#241 @ 842,215: 29x23
#242 @ 441,113: 11x26
#243 @ 960,287: 29x14
#244 @ 673,204: 19x23
#245 @ 945,741: 24x11
#246 @ 739,641: 23x22
#247 @ 627,163: 23x14
#248 @ 784,813: 19x15
#249 @ 644,756: 15x15
#250 @ 837,536: 24x28
#251 @ 884,75: 17x24
#252 @ 551,558: 14x29
#253 @ 937,865: 10x12
#254 @ 715,830: 24x28
#255 @ 343,562: 21x22
#256 @ 111,832: 12x10
#257 @ 639,108: 20x16
#258 @ 368,767: 21x24
#259 @ 607,570: 12x14
#260 @ 777,80: 26x23
#261 @ 667,108: 16x12
#262 @ 229,529: 25x12
#263 @ 825,701: 10x28
#264 @ 246,820: 15x18
#265 @ 842,871: 29x15
#266 @ 468,559: 29x10
#267 @ 538,396: 20x28
#268 @ 516,901: 29x19
#269 @ 264,423: 12x14
#270 @ 149,901: 16x12
#271 @ 414,782: 27x29
#272 @ 671,745: 11x27
#273 @ 425,860: 18x27
#274 @ 949,346: 26x18
#275 @ 13,783: 14x27
#276 @ 276,225: 19x14
#277 @ 642,83: 14x25
#278 @ 638,885: 29x10
#279 @ 4,445: 17x21
#280 @ 401,947: 19x15
#281 @ 226,810: 26x27
#282 @ 0,188: 21x24
#283 @ 455,588: 24x26
#284 @ 64,98: 20x10
#285 @ 554,78: 27x26
#286 @ 978,174: 16x26
#287 @ 57,651: 27x24
#288 @ 844,963: 20x22
#289 @ 10,141: 27x21
#290 @ 360,11: 28x29
#291 @ 642,210: 13x15
#292 @ 205,272: 26x11
#293 @ 523,561: 19x20
#294 @ 388,566: 14x17
#295 @ 384,558: 15x12
#296 @ 21,988: 10x11
#297 @ 875,712: 14x16
#298 @ 208,399: 28x14
#299 @ 62,150: 11x13
#300 @ 235,273: 12x27
#301 @ 770,561: 16x20
#302 @ 498,651: 15x24
#303 @ 229,778: 18x21
#304 @ 646,520: 26x17
#305 @ 95,913: 14x17
#306 @ 227,532: 10x14
#307 @ 187,700: 11x24
#308 @ 843,715: 27x28
#309 @ 269,954: 13x11
#310 @ 672,890: 28x13
#311 @ 198,382: 25x22
#312 @ 790,272: 15x20
#313 @ 656,714: 11x19
#314 @ 550,164: 28x13
#315 @ 537,916: 25x23
#316 @ 77,314: 19x27
#317 @ 390,297: 25x19
#318 @ 145,346: 28x11
#319 @ 638,724: 13x16
#320 @ 922,29: 15x3
#321 @ 940,29: 19x20
#322 @ 388,436: 19x19
#323 @ 170,304: 23x26
#324 @ 911,652: 20x28
#325 @ 932,13: 11x21
#326 @ 874,839: 13x12
#327 @ 313,628: 18x26
#328 @ 716,229: 17x25
#329 @ 119,667: 15x27
#330 @ 471,303: 10x10
#331 @ 0,795: 20x10
#332 @ 413,17: 23x26
#333 @ 415,23: 20x13
#334 @ 43,367: 29x21
#335 @ 227,528: 18x13
#336 @ 195,98: 18x19
#337 @ 647,209: 27x10
#338 @ 94,913: 18x22
#339 @ 627,483: 29x22
#340 @ 387,938: 16x11
#341 @ 493,837: 16x23
#342 @ 808,500: 21x22
#343 @ 26,793: 18x18
#344 @ 95,283: 19x23
#345 @ 507,168: 29x12
#346 @ 919,563: 18x16
#347 @ 110,899: 14x18
#348 @ 66,539: 28x27
#349 @ 283,819: 11x27
#350 @ 133,591: 24x10
#351 @ 205,740: 22x14
#352 @ 343,676: 19x11
#353 @ 932,369: 14x11
#354 @ 218,419: 27x18
#355 @ 871,760: 14x29
#356 @ 212,5: 22x12
#357 @ 693,652: 10x24
#358 @ 574,656: 27x25
#359 @ 488,872: 14x17
#360 @ 71,362: 28x24
#361 @ 518,735: 22x23
#362 @ 359,67: 20x29
#363 @ 92,270: 19x22
#364 @ 376,316: 26x13
#365 @ 410,931: 24x13
#366 @ 703,199: 23x21
#367 @ 801,432: 20x18
#368 @ 907,859: 21x20
#369 @ 161,263: 26x21
#370 @ 312,734: 10x10
#371 @ 489,732: 27x28
#372 @ 548,898: 20x23
#373 @ 150,87: 12x18
#374 @ 636,840: 17x17
#375 @ 268,319: 15x25
#376 @ 937,958: 28x24
#377 @ 417,523: 29x24
#378 @ 27,110: 13x23
#379 @ 543,37: 29x13
#380 @ 618,464: 21x29
#381 @ 142,313: 14x29
#382 @ 664,723: 20x21
#383 @ 303,427: 29x18
#384 @ 651,579: 19x22
#385 @ 327,707: 21x16
#386 @ 66,59: 20x25
#387 @ 156,502: 23x20
#388 @ 753,288: 23x25
#389 @ 146,259: 29x20
#390 @ 232,400: 13x24
#391 @ 753,446: 14x15
#392 @ 351,616: 11x19
#393 @ 303,713: 24x11
#394 @ 324,902: 29x12
#395 @ 965,284: 11x18
#396 @ 512,952: 27x14
#397 @ 869,301: 17x17
#398 @ 89,303: 12x10
#399 @ 923,737: 24x20
#400 @ 137,418: 21x23
#401 @ 315,607: 19x23
#402 @ 868,595: 23x13
#403 @ 29,160: 14x17
#404 @ 626,761: 11x28
#405 @ 482,675: 27x28
#406 @ 960,747: 11x29
#407 @ 179,962: 11x13
#408 @ 782,90: 25x28
#409 @ 177,71: 20x13
#410 @ 822,692: 13x14
#411 @ 98,326: 16x27
#412 @ 807,435: 13x13
#413 @ 583,155: 18x16
#414 @ 275,250: 20x23
#415 @ 320,689: 25x25
#416 @ 741,704: 27x24
#417 @ 880,380: 26x15
#418 @ 697,506: 13x13
#419 @ 830,228: 20x24
#420 @ 163,652: 27x25
#421 @ 412,239: 25x10
#422 @ 35,548: 11x16
#423 @ 617,247: 27x22
#424 @ 167,567: 27x10
#425 @ 556,69: 15x21
#426 @ 363,203: 16x13
#427 @ 558,947: 17x28
#428 @ 298,282: 14x23
#429 @ 697,706: 10x18
#430 @ 754,740: 19x10
#431 @ 681,345: 22x12
#432 @ 219,490: 29x25
#433 @ 579,638: 21x29
#434 @ 57,70: 21x13
#435 @ 27,337: 23x17
#436 @ 151,685: 28x28
#437 @ 312,474: 10x23
#438 @ 972,664: 27x21
#439 @ 638,446: 11x26
#440 @ 270,845: 13x15
#441 @ 235,788: 27x22
#442 @ 638,209: 16x10
#443 @ 484,873: 12x25
#444 @ 922,295: 5x7
#445 @ 182,964: 27x23
#446 @ 902,376: 23x14
#447 @ 187,688: 15x13
#448 @ 188,612: 18x13
#449 @ 406,688: 22x11
#450 @ 164,71: 20x12
#451 @ 341,299: 18x23
#452 @ 670,837: 18x14
#453 @ 706,424: 23x26
#454 @ 75,160: 27x24
#455 @ 431,285: 28x25
#456 @ 502,966: 12x20
#457 @ 287,537: 16x16
#458 @ 236,115: 13x28
#459 @ 208,741: 17x11
#460 @ 665,590: 27x15
#461 @ 928,10: 19x10
#462 @ 558,277: 28x15
#463 @ 80,114: 11x27
#464 @ 830,224: 11x24
#465 @ 571,834: 29x16
#466 @ 758,337: 20x19
#467 @ 936,727: 20x10
#468 @ 843,100: 13x13
#469 @ 692,656: 23x12
#470 @ 168,358: 29x26
#471 @ 804,87: 16x11
#472 @ 272,637: 14x13
#473 @ 681,669: 3x14
#474 @ 530,701: 15x26
#475 @ 420,287: 11x14
#476 @ 407,276: 29x24
#477 @ 636,27: 27x10
#478 @ 12,301: 14x15
#479 @ 837,953: 14x25
#480 @ 851,625: 10x20
#481 @ 303,604: 10x16
#482 @ 2,648: 21x17
#483 @ 434,747: 29x16
#484 @ 875,505: 26x12
#485 @ 915,467: 16x13
#486 @ 319,321: 22x23
#487 @ 288,160: 21x25
#488 @ 683,112: 10x27
#489 @ 673,69: 17x20
#490 @ 63,482: 27x22
#491 @ 454,813: 16x17
#492 @ 247,496: 22x19
#493 @ 112,584: 10x21
#494 @ 897,323: 17x20
#495 @ 71,762: 29x28
#496 @ 111,678: 14x20
#497 @ 121,686: 21x19
#498 @ 745,902: 26x15
#499 @ 537,784: 13x26
#500 @ 337,781: 22x15
#501 @ 467,155: 27x28
#502 @ 201,301: 24x18
#503 @ 168,663: 15x10
#504 @ 310,427: 20x26
#505 @ 940,404: 12x28
#506 @ 564,203: 26x12
#507 @ 263,975: 11x21
#508 @ 39,871: 19x11
#509 @ 647,841: 28x10
#510 @ 347,548: 24x23
#511 @ 463,565: 28x10
#512 @ 775,350: 20x20
#513 @ 228,424: 23x13
#514 @ 677,145: 12x18
#515 @ 401,819: 28x29
#516 @ 427,271: 24x22
#517 @ 502,943: 26x18
#518 @ 387,925: 23x11
#519 @ 294,214: 15x15
#520 @ 21,976: 16x13
#521 @ 798,534: 18x22
#522 @ 519,692: 29x23
#523 @ 826,368: 19x13
#524 @ 964,626: 10x21
#525 @ 570,958: 19x20
#526 @ 388,203: 13x13
#527 @ 432,975: 21x15
#528 @ 143,354: 15x13
#529 @ 920,25: 22x13
#530 @ 552,278: 22x19
#531 @ 348,171: 23x27
#532 @ 132,462: 17x28
#533 @ 117,379: 15x11
#534 @ 951,608: 13x12
#535 @ 202,552: 17x19
#536 @ 92,932: 10x14
#537 @ 887,967: 28x17
#538 @ 18,698: 10x16
#539 @ 652,596: 18x20
#540 @ 815,532: 29x29
#541 @ 740,730: 17x14
#542 @ 787,55: 24x29
#543 @ 67,654: 21x29
#544 @ 406,202: 12x21
#545 @ 363,20: 27x15
#546 @ 817,68: 15x18
#547 @ 563,494: 29x15
#548 @ 841,149: 16x23
#549 @ 125,168: 28x15
#550 @ 879,26: 19x23
#551 @ 335,603: 27x13
#552 @ 71,106: 17x14
#553 @ 37,203: 11x19
#554 @ 481,311: 12x14
#555 @ 166,578: 23x20
#556 @ 546,366: 26x24
#557 @ 747,233: 24x20
#558 @ 835,544: 22x18
#559 @ 819,106: 28x17
#560 @ 832,234: 4x8
#561 @ 452,611: 28x13
#562 @ 614,481: 21x20
#563 @ 759,0: 12x14
#564 @ 692,688: 13x10
#565 @ 143,497: 15x20
#566 @ 848,159: 18x12
#567 @ 839,359: 12x12
#568 @ 796,137: 22x18
#569 @ 565,709: 29x16
#570 @ 91,784: 18x28
#571 @ 263,974: 15x20
#572 @ 158,447: 15x14
#573 @ 178,157: 14x14
#574 @ 252,580: 20x28
#575 @ 501,479: 10x26
#576 @ 593,815: 10x11
#577 @ 597,850: 16x29
#578 @ 753,601: 25x29
#579 @ 554,283: 24x15
#580 @ 906,833: 10x28
#581 @ 863,957: 28x19
#582 @ 956,461: 14x16
#583 @ 829,555: 22x24
#584 @ 269,598: 11x16
#585 @ 628,503: 18x12
#586 @ 83,160: 22x25
#587 @ 576,918: 22x12
#588 @ 777,359: 19x10
#589 @ 342,95: 13x28
#590 @ 123,878: 25x21
#591 @ 946,860: 18x29
#592 @ 647,913: 27x28
#593 @ 793,261: 28x18
#594 @ 859,847: 23x11
#595 @ 612,950: 11x22
#596 @ 3,50: 20x20
#597 @ 298,574: 26x10
#598 @ 231,722: 26x25
#599 @ 95,533: 16x17
#600 @ 661,100: 19x18
#601 @ 259,169: 13x18
#602 @ 507,866: 29x17
#603 @ 286,706: 25x19
#604 @ 334,429: 23x20
#605 @ 427,399: 22x16
#606 @ 709,701: 24x15
#607 @ 536,803: 19x26
#608 @ 694,437: 15x26
#609 @ 513,866: 23x20
#610 @ 544,484: 23x25
#611 @ 330,650: 13x17
#612 @ 214,943: 23x25
#613 @ 490,478: 15x22
#614 @ 891,633: 20x16
#615 @ 733,671: 18x23
#616 @ 537,895: 11x16
#617 @ 365,259: 11x16
#618 @ 170,868: 26x16
#619 @ 737,701: 27x10
#620 @ 728,80: 19x15
#621 @ 713,974: 14x25
#622 @ 105,320: 12x16
#623 @ 66,22: 20x10
#624 @ 550,28: 27x24
#625 @ 264,324: 12x25
#626 @ 573,621: 28x13
#627 @ 487,339: 13x16
#628 @ 562,166: 28x13
#629 @ 632,868: 21x12
#630 @ 739,235: 23x29
#631 @ 401,292: 14x28
#632 @ 365,930: 29x22
#633 @ 306,927: 20x25
#634 @ 961,665: 17x20
#635 @ 74,85: 23x13
#636 @ 478,656: 13x26
#637 @ 342,381: 14x11
#638 @ 921,415: 21x15
#639 @ 236,293: 13x12
#640 @ 736,741: 15x29
#641 @ 56,790: 29x11
#642 @ 379,195: 24x29
#643 @ 263,461: 18x19
#644 @ 590,485: 28x20
#645 @ 388,679: 14x16
#646 @ 54,461: 15x23
#647 @ 317,932: 12x22
#648 @ 261,619: 15x12
#649 @ 875,443: 18x15
#650 @ 206,30: 29x18
#651 @ 138,543: 12x27
#652 @ 552,145: 29x25
#653 @ 337,606: 23x19
#654 @ 415,882: 29x10
#655 @ 105,593: 16x12
#656 @ 18,61: 18x23
#657 @ 399,681: 28x22
#658 @ 661,876: 26x12
#659 @ 183,403: 14x23
#660 @ 922,665: 17x16
#661 @ 703,863: 23x27
#662 @ 109,88: 22x18
#663 @ 428,104: 24x26
#664 @ 557,637: 12x19
#665 @ 270,853: 23x21
#666 @ 139,308: 21x22
#667 @ 536,697: 25x16
#668 @ 800,142: 15x11
#669 @ 14,28: 26x26
#670 @ 585,196: 12x22
#671 @ 153,437: 21x26
#672 @ 632,432: 27x15
#673 @ 477,94: 16x13
#674 @ 960,342: 27x21
#675 @ 176,644: 20x29
#676 @ 498,427: 16x29
#677 @ 487,736: 20x23
#678 @ 637,154: 28x18
#679 @ 491,393: 29x12
#680 @ 529,352: 14x11
#681 @ 128,508: 21x14
#682 @ 51,278: 16x17
#683 @ 136,508: 17x19
#684 @ 861,151: 10x14
#685 @ 829,958: 22x11
#686 @ 728,812: 13x26
#687 @ 418,307: 24x23
#688 @ 27,186: 17x29
#689 @ 736,336: 15x26
#690 @ 161,791: 14x24
#691 @ 233,116: 22x16
#692 @ 17,300: 23x24
#693 @ 913,828: 14x29
#694 @ 919,313: 12x15
#695 @ 791,591: 29x22
#696 @ 794,555: 25x25
#697 @ 764,396: 17x25
#698 @ 155,304: 12x15
#699 @ 973,615: 17x19
#700 @ 594,431: 18x15
#701 @ 606,746: 13x21
#702 @ 166,770: 29x20
#703 @ 350,50: 11x10
#704 @ 325,677: 25x20
#705 @ 424,385: 19x12
#706 @ 443,708: 13x15
#707 @ 282,549: 11x20
#708 @ 164,962: 17x20
#709 @ 100,13: 21x10
#710 @ 454,914: 24x27
#711 @ 208,421: 25x17
#712 @ 85,25: 22x26
#713 @ 824,480: 6x10
#714 @ 280,290: 23x29
#715 @ 732,678: 18x26
#716 @ 963,335: 18x11
#717 @ 780,981: 26x18
#718 @ 162,144: 21x11
#719 @ 609,918: 25x26
#720 @ 814,191: 25x27
#721 @ 641,610: 18x16
#722 @ 374,721: 12x25
#723 @ 534,939: 27x16
#724 @ 8,449: 9x8
#725 @ 919,362: 22x25
#726 @ 206,953: 19x22
#727 @ 584,388: 15x11
#728 @ 643,742: 16x28
#729 @ 224,25: 29x18
#730 @ 643,709: 18x19
#731 @ 495,188: 14x23
#732 @ 489,603: 15x21
#733 @ 156,364: 7x7
#734 @ 447,399: 11x17
#735 @ 894,52: 19x15
#736 @ 878,63: 15x21
#737 @ 383,625: 27x21
#738 @ 586,86: 16x25
#739 @ 121,907: 13x14
#740 @ 832,14: 29x27
#741 @ 188,370: 19x25
#742 @ 551,478: 18x12
#743 @ 13,800: 27x26
#744 @ 527,335: 15x14
#745 @ 36,421: 22x13
#746 @ 743,710: 20x8
#747 @ 540,788: 18x25
#748 @ 421,263: 22x26
#749 @ 16,187: 21x20
#750 @ 515,149: 14x16
#751 @ 549,89: 26x25
#752 @ 675,926: 13x22
#753 @ 90,146: 18x18
#754 @ 188,360: 14x22
#755 @ 242,108: 18x21
#756 @ 200,557: 14x22
#757 @ 876,895: 10x13
#758 @ 961,664: 26x28
#759 @ 765,77: 24x12
#760 @ 930,696: 18x23
#761 @ 646,628: 27x17
#762 @ 421,56: 22x14
#763 @ 436,146: 11x28
#764 @ 415,391: 26x25
#765 @ 259,779: 13x29
#766 @ 770,384: 28x16
#767 @ 59,429: 19x16
#768 @ 130,905: 19x17
#769 @ 165,799: 11x13
#770 @ 922,672: 24x11
#771 @ 892,381: 14x10
#772 @ 27,413: 14x23
#773 @ 479,179: 17x27
#774 @ 13,160: 22x10
#775 @ 826,448: 26x27
#776 @ 233,514: 14x13
#777 @ 344,761: 29x28
#778 @ 833,497: 18x28
#779 @ 87,535: 22x14
#780 @ 932,691: 11x11
#781 @ 389,574: 19x4
#782 @ 189,162: 21x22
#783 @ 359,937: 19x21
#784 @ 29,266: 13x20
#785 @ 356,61: 15x29
#786 @ 760,607: 20x28
#787 @ 748,724: 24x29
#788 @ 72,890: 23x12
#789 @ 897,48: 15x14
#790 @ 446,802: 21x20
#791 @ 147,463: 16x20
#792 @ 950,447: 10x18
#793 @ 155,510: 21x12
#794 @ 636,291: 29x13
#795 @ 593,914: 26x18
#796 @ 295,719: 13x28
#797 @ 768,934: 10x22
#798 @ 242,98: 18x29
#799 @ 410,326: 19x13
#800 @ 115,653: 12x19
#801 @ 276,874: 10x25
#802 @ 300,657: 25x22
#803 @ 345,202: 21x14
#804 @ 474,818: 29x26
#805 @ 428,403: 14x23
#806 @ 948,752: 23x14
#807 @ 898,316: 24x17
#808 @ 51,84: 15x24
#809 @ 871,279: 25x16
#810 @ 905,373: 17x20
#811 @ 341,81: 19x23
#812 @ 166,506: 27x15
#813 @ 144,240: 29x26
#814 @ 676,221: 25x20
#815 @ 83,398: 29x22
#816 @ 50,180: 26x16
#817 @ 192,559: 14x24
#818 @ 44,918: 27x12
#819 @ 83,819: 25x10
#820 @ 324,666: 16x26
#821 @ 623,249: 28x15
#822 @ 263,426: 21x12
#823 @ 144,298: 12x29
#824 @ 861,62: 11x27
#825 @ 918,291: 24x19
#826 @ 75,896: 13x18
#827 @ 881,607: 22x24
#828 @ 471,278: 12x28
#829 @ 17,350: 27x12
#830 @ 327,436: 22x22
#831 @ 774,299: 11x21
#832 @ 125,238: 10x17
#833 @ 822,476: 11x18
#834 @ 291,424: 29x18
#835 @ 909,309: 26x29
#836 @ 15,330: 21x10
#837 @ 378,871: 18x19
#838 @ 63,148: 10x12
#839 @ 418,112: 13x16
#840 @ 350,700: 21x12
#841 @ 428,377: 26x10
#842 @ 81,96: 17x11
#843 @ 654,229: 19x29
#844 @ 268,42: 24x10
#845 @ 716,833: 19x12
#846 @ 358,177: 29x21
#847 @ 520,720: 15x22
#848 @ 458,760: 19x21
#849 @ 606,774: 29x14
#850 @ 96,90: 17x29
#851 @ 604,910: 20x25
#852 @ 343,831: 27x28
#853 @ 593,709: 17x16
#854 @ 58,387: 14x17
#855 @ 834,73: 18x19
#856 @ 479,345: 27x15
#857 @ 497,442: 6x9
#858 @ 217,553: 28x12
#859 @ 32,110: 29x19
#860 @ 305,565: 26x26
#861 @ 633,499: 14x21
#862 @ 293,810: 26x29
#863 @ 483,884: 11x14
#864 @ 662,599: 12x16
#865 @ 724,21: 23x11
#866 @ 282,409: 23x10
#867 @ 218,275: 26x15
#868 @ 952,953: 28x25
#869 @ 864,599: 19x24
#870 @ 523,944: 15x23
#871 @ 942,381: 14x25
#872 @ 802,813: 17x24
#873 @ 771,736: 13x12
#874 @ 64,93: 24x19
#875 @ 937,11: 28x21
#876 @ 679,665: 10x29
#877 @ 420,727: 18x25
#878 @ 741,767: 18x19
#879 @ 741,200: 10x15
#880 @ 612,289: 16x13
#881 @ 644,519: 26x20
#882 @ 937,474: 22x28
#883 @ 409,650: 18x20
#884 @ 54,875: 17x20
#885 @ 379,875: 25x11
#886 @ 13,276: 21x25
#887 @ 267,425: 4x7
#888 @ 481,382: 21x16
#889 @ 815,436: 28x10
#890 @ 723,183: 29x11
#891 @ 209,105: 28x17
#892 @ 102,229: 14x23
#893 @ 386,265: 18x27
#894 @ 406,683: 15x26
#895 @ 283,248: 10x10
#896 @ 634,217: 24x23
#897 @ 782,51: 24x23
#898 @ 973,159: 24x19
#899 @ 366,195: 13x23
#900 @ 522,778: 20x11
#901 @ 509,726: 14x20
#902 @ 214,291: 28x25
#903 @ 579,550: 29x24
#904 @ 747,374: 24x21
#905 @ 947,389: 4x13
#906 @ 585,44: 25x28
#907 @ 647,639: 29x11
#908 @ 518,848: 22x22
#909 @ 976,18: 22x27
#910 @ 309,653: 14x14
#911 @ 258,606: 15x15
#912 @ 79,19: 28x23
#913 @ 82,550: 15x13
#914 @ 425,279: 21x29
#915 @ 953,95: 25x11
#916 @ 905,190: 11x24
#917 @ 832,356: 27x24
#918 @ 420,354: 21x28
#919 @ 22,630: 24x22
#920 @ 530,701: 14x10
#921 @ 452,294: 10x19
#922 @ 562,343: 28x29
#923 @ 830,63: 21x28
#924 @ 860,587: 28x23
#925 @ 389,367: 16x24
#926 @ 850,875: 15x29
#927 @ 437,750: 27x17
#928 @ 571,776: 10x29
#929 @ 546,390: 21x19
#930 @ 140,889: 13x19
#931 @ 567,843: 21x14
#932 @ 845,514: 10x15
#933 @ 980,835: 14x13
#934 @ 593,767: 22x22
#935 @ 299,576: 16x25
#936 @ 495,438: 13x23
#937 @ 411,663: 28x14
#938 @ 260,605: 13x29
#939 @ 550,603: 20x23
#940 @ 162,239: 10x25
#941 @ 214,645: 13x24
#942 @ 15,693: 17x13
#943 @ 909,42: 10x25
#944 @ 396,215: 23x15
#945 @ 713,876: 29x21
#946 @ 151,77: 13x15
#947 @ 713,27: 25x23
#948 @ 718,472: 12x13
#949 @ 683,154: 28x13
#950 @ 160,880: 17x23
#951 @ 320,880: 12x24
#952 @ 961,184: 23x10
#953 @ 195,418: 13x25
#954 @ 953,339: 26x15
#955 @ 311,874: 18x12
#956 @ 275,626: 15x29
#957 @ 876,593: 10x18
#958 @ 9,376: 28x17
#959 @ 732,227: 23x25
#960 @ 910,167: 11x29
#961 @ 826,369: 24x19
#962 @ 735,639: 28x12
#963 @ 796,361: 28x19
#964 @ 149,794: 23x23
#965 @ 379,369: 29x20
#966 @ 738,33: 15x16
#967 @ 933,915: 11x14
#968 @ 14,171: 13x17
#969 @ 776,291: 25x12
#970 @ 831,97: 15x28
#971 @ 832,131: 18x11
#972 @ 900,898: 13x24
#973 @ 235,784: 16x17
#974 @ 744,178: 20x25
#975 @ 890,712: 15x27
#976 @ 256,928: 20x26
#977 @ 575,454: 26x26
#978 @ 939,375: 16x16
#979 @ 64,632: 16x21
#980 @ 614,292: 19x28
#981 @ 234,120: 10x24
#982 @ 93,16: 29x23
#983 @ 889,373: 16x14
#984 @ 264,414: 20x16
#985 @ 61,664: 23x23
#986 @ 900,671: 11x26
#987 @ 336,331: 13x26
#988 @ 836,89: 28x26
#989 @ 681,852: 18x12
#990 @ 83,788: 10x15
#991 @ 709,220: 17x27
#992 @ 321,737: 10x27
#993 @ 618,755: 11x26
#994 @ 616,505: 26x17
#995 @ 404,195: 17x27
#996 @ 490,633: 3x10
#997 @ 272,866: 28x17
#998 @ 554,160: 21x14
#999 @ 138,916: 19x25
#1000 @ 375,379: 23x16
#1001 @ 416,464: 18x19
#1002 @ 720,951: 21x10
#1003 @ 110,539: 18x15
#1004 @ 670,345: 29x19
#1005 @ 728,553: 22x20
#1006 @ 374,883: 17x24
#1007 @ 293,169: 10x8
#1008 @ 610,734: 15x17
#1009 @ 538,222: 21x28
#1010 @ 355,532: 17x23
#1011 @ 654,102: 27x16
#1012 @ 595,110: 25x14
#1013 @ 347,518: 12x6
#1014 @ 366,679: 25x20
#1015 @ 758,362: 14x25
#1016 @ 862,297: 19x12
#1017 @ 267,335: 26x22
#1018 @ 141,888: 25x17
#1019 @ 944,524: 10x15
#1020 @ 550,548: 14x21
#1021 @ 495,357: 24x27
#1022 @ 189,104: 13x21
#1023 @ 851,784: 21x14
#1024 @ 819,545: 29x25
#1025 @ 464,371: 11x25
#1026 @ 601,92: 29x19
#1027 @ 256,413: 27x26
#1028 @ 599,941: 28x13
#1029 @ 162,363: 29x24
#1030 @ 84,24: 20x27
#1031 @ 732,417: 28x29
#1032 @ 148,300: 26x24
#1033 @ 374,268: 15x22
#1034 @ 952,611: 19x22
#1035 @ 248,330: 21x19
#1036 @ 28,90: 26x20
#1037 @ 803,320: 18x27
#1038 @ 633,735: 19x19
#1039 @ 571,771: 18x13
#1040 @ 485,888: 6x4
#1041 @ 734,374: 13x16
#1042 @ 737,38: 17x11
#1043 @ 594,930: 12x15
#1044 @ 669,880: 28x14
#1045 @ 733,372: 11x22
#1046 @ 507,897: 11x23
#1047 @ 402,533: 11x19
#1048 @ 291,54: 14x28
#1049 @ 598,369: 17x12
#1050 @ 784,249: 12x14
#1051 @ 803,556: 28x25
#1052 @ 236,418: 18x12
#1053 @ 288,586: 29x28
#1054 @ 108,324: 20x20
#1055 @ 392,844: 17x14
#1056 @ 713,949: 23x25
#1057 @ 692,446: 22x16
#1058 @ 738,245: 10x27
#1059 @ 662,877: 14x22
#1060 @ 32,411: 16x20
#1061 @ 369,370: 28x10
#1062 @ 66,184: 17x21
#1063 @ 143,584: 16x10
#1064 @ 147,216: 26x20
#1065 @ 52,354: 19x19
#1066 @ 108,315: 19x13
#1067 @ 930,690: 21x26
#1068 @ 304,579: 22x14
#1069 @ 586,861: 18x26
#1070 @ 96,772: 12x26
#1071 @ 799,823: 13x10
#1072 @ 962,144: 14x25
#1073 @ 854,639: 15x10
#1074 @ 550,552: 24x10
#1075 @ 964,636: 18x18
#1076 @ 5,179: 4x12
#1077 @ 73,408: 19x18
#1078 @ 145,787: 15x18
#1079 @ 203,398: 24x10
#1080 @ 984,281: 11x27
#1081 @ 582,785: 23x23
#1082 @ 766,516: 28x26
#1083 @ 397,852: 14x10
#1084 @ 854,961: 12x14
#1085 @ 28,532: 20x17
#1086 @ 350,374: 21x15
#1087 @ 974,622: 17x24
#1088 @ 113,834: 6x5
#1089 @ 802,313: 21x19
#1090 @ 106,106: 29x28
#1091 @ 610,572: 4x5
#1092 @ 195,301: 28x14
#1093 @ 327,124: 15x24
#1094 @ 249,677: 16x28
#1095 @ 674,117: 17x10
#1096 @ 328,320: 11x11
#1097 @ 942,952: 10x10
#1098 @ 718,428: 14x13
#1099 @ 192,1: 27x14
#1100 @ 905,867: 28x27
#1101 @ 812,83: 18x18
#1102 @ 401,217: 28x12
#1103 @ 781,982: 13x11
#1104 @ 252,178: 11x24
#1105 @ 335,175: 14x27
#1106 @ 514,159: 15x15
#1107 @ 25,258: 20x28
#1108 @ 534,102: 27x20
#1109 @ 333,841: 5x3
#1110 @ 31,935: 18x29
#1111 @ 799,432: 12x12
#1112 @ 103,7: 15x22
#1113 @ 52,773: 20x24
#1114 @ 152,463: 26x28
#1115 @ 386,381: 10x14
#1116 @ 430,246: 18x19
#1117 @ 53,279: 16x15
#1118 @ 61,74: 14x17
#1119 @ 178,943: 13x25
#1120 @ 145,418: 17x25
#1121 @ 552,66: 13x15
#1122 @ 980,220: 18x22
#1123 @ 763,863: 29x16
#1124 @ 712,844: 20x10
#1125 @ 502,419: 23x11
#1126 @ 631,420: 11x13
#1127 @ 58,225: 18x18
#1128 @ 695,465: 27x20
#1129 @ 940,688: 17x19
#1130 @ 505,627: 27x16
#1131 @ 719,540: 28x16
#1132 @ 358,320: 10x13
#1133 @ 834,295: 19x26
#1134 @ 632,712: 16x12
#1135 @ 607,786: 21x23
#1136 @ 952,453: 21x15
#1137 @ 430,543: 10x16
#1138 @ 568,159: 21x16
#1139 @ 662,218: 28x10
#1140 @ 808,511: 27x25
#1141 @ 893,877: 26x29
#1142 @ 517,897: 22x10
#1143 @ 596,464: 10x26
#1144 @ 725,233: 24x22
#1145 @ 129,116: 25x26
#1146 @ 411,914: 27x12
#1147 @ 36,871: 7x7
#1148 @ 373,187: 29x17
#1149 @ 786,755: 12x12
#1150 @ 555,271: 17x19
#1151 @ 530,771: 20x23
#1152 @ 597,463: 26x26
#1153 @ 508,629: 18x8
#1154 @ 682,500: 10x12
#1155 @ 707,154: 20x28
#1156 @ 345,848: 18x26
#1157 @ 345,706: 27x16
#1158 @ 473,293: 24x13
#1159 @ 316,609: 28x23
#1160 @ 651,504: 23x16
#1161 @ 381,277: 26x25
#1162 @ 674,771: 22x23
#1163 @ 830,718: 13x25
#1164 @ 966,131: 22x26
#1165 @ 28,866: 28x17
#1166 @ 183,72: 22x19
#1167 @ 564,536: 16x26
#1168 @ 972,30: 15x28
#1169 @ 387,296: 22x29
#1170 @ 385,86: 26x26
#1171 @ 671,832: 10x26
#1172 @ 759,241: 13x23
#1173 @ 237,289: 6x6
#1174 @ 25,828: 18x16
#1175 @ 194,379: 21x13
#1176 @ 273,624: 10x12
#1177 @ 404,627: 12x15
#1178 @ 596,623: 12x25
#1179 @ 674,96: 27x26
#1180 @ 1,342: 24x26
#1181 @ 307,609: 10x13
#1182 @ 379,878: 24x14
#1183 @ 390,382: 25x17
#1184 @ 889,427: 21x19
#1185 @ 486,887: 21x20
#1186 @ 213,644: 15x24
#1187 @ 593,468: 16x28
#1188 @ 943,13: 21x29
#1189 @ 541,704: 27x15
#1190 @ 23,577: 22x16
#1191 @ 582,721: 14x13
#1192 @ 118,241: 23x12
#1193 @ 403,810: 11x13
#1194 @ 648,732: 28x23
#1195 @ 532,939: 13x12
#1196 @ 832,370: 19x11
#1197 @ 381,783: 18x19
#1198 @ 644,795: 20x19
#1199 @ 253,475: 10x22
#1200 @ 185,305: 18x10
#1201 @ 554,498: 16x27
#1202 @ 249,683: 24x14
#1203 @ 175,773: 27x26
#1204 @ 363,816: 24x29
#1205 @ 525,353: 18x25
#1206 @ 368,720: 17x10
#1207 @ 553,310: 17x13
#1208 @ 911,328: 17x29
#1209 @ 262,452: 23x25
#1210 @ 727,311: 26x26
#1211 @ 850,965: 11x28
#1212 @ 392,821: 16x10
#1213 @ 828,873: 21x16
#1214 @ 377,89: 25x12
#1215 @ 922,424: 28x13
#1216 @ 165,677: 27x17
#1217 @ 306,717: 12x22
#1218 @ 390,552: 21x10
#1219 @ 657,19: 10x23
#1220 @ 259,679: 13x10
#1221 @ 783,593: 11x28
#1222 @ 186,670: 28x22
#1223 @ 633,86: 19x22
#1224 @ 57,425: 25x25
#1225 @ 421,164: 21x20
#1226 @ 881,815: 17x17
#1227 @ 220,521: 21x17
#1228 @ 154,282: 11x27
#1229 @ 143,517: 16x27
#1230 @ 45,748: 27x27
#1231 @ 622,188: 25x24
#1232 @ 932,969: 24x23
#1233 @ 918,979: 23x17
#1234 @ 748,283: 28x29
#1235 @ 802,691: 23x22
#1236 @ 264,609: 10x15
#1237 @ 763,303: 21x17
#1238 @ 702,220: 28x29
#1239 @ 520,450: 19x23
#1240 @ 154,584: 23x13
#1241 @ 67,135: 21x18
#1242 @ 827,937: 15x25
#1243 @ 162,135: 11x26
#1244 @ 511,943: 28x11
#1245 @ 773,306: 10x21
#1246 @ 655,902: 23x27
#1247 @ 492,300: 20x21
#1248 @ 548,118: 24x24
#1249 @ 531,395: 22x21
#1250 @ 932,404: 24x16
#1251 @ 31,675: 12x24
#1252 @ 20,534: 19x10
#1253 @ 924,408: 25x15
#1254 @ 58,272: 28x24
#1255 @ 886,369: 26x10
#1256 @ 748,307: 23x15
#1257 @ 0,223: 11x24
#1258 @ 397,684: 15x14
#1259 @ 728,433: 12x13
#1260 @ 419,120: 24x14
#1261 @ 332,117: 13x10
#1262 @ 293,301: 10x14
#1263 @ 791,146: 26x21
#1264 @ 296,907: 29x28
#1265 @ 846,700: 15x28
#1266 @ 584,425: 27x15
#1267 @ 712,102: 27x14
#1268 @ 330,838: 13x11
#1269 @ 470,335: 29x11
#1270 @ 200,537: 26x22
#1271 @ 291,613: 21x10
#1272 @ 974,838: 16x23
#1273 @ 94,272: 4x16
#1274 @ 255,687: 15x13
#1275 @ 682,158: 29x16
#1276 @ 24,220: 23x26
#1277 @ 3,158: 29x27
#1278 @ 251,209: 28x29
#1279 @ 740,62: 23x20
#1280 @ 355,621: 15x22
#1281 @ 688,691: 17x16
#1282 @ 498,610: 25x16
#1283 @ 917,464: 24x14
#1284 @ 78,540: 17x18
#1285 @ 826,227: 24x19
#1286 @ 235,589: 22x19
#1287 @ 539,571: 22x25
#1288 @ 528,274: 22x15
#1289 @ 230,819: 21x19
#1290 @ 460,938: 22x19
#1291 @ 727,880: 28x27
#1292 @ 770,4: 27x23
#1293 @ 51,276: 25x11
#1294 @ 177,140: 18x29
#1295 @ 308,899: 25x11
#1296 @ 581,179: 16x20
#1297 @ 548,556: 26x18
#1298 @ 850,10: 23x20
#1299 @ 142,588: 14x20
#1300 @ 34,241: 23x11
#1301 @ 806,697: 15x25
#1302 @ 72,542: 21x18
#1303 @ 906,473: 12x10
#1304 @ 755,386: 27x26
#1305 @ 644,923: 15x18
#1306 @ 942,969: 18x18
#1307 @ 715,555: 10x20
#1308 @ 781,655: 20x14
#1309 @ 741,694: 27x26
#1310 @ 636,430: 11x29
#1311 @ 64,332: 23x23
#1312 @ 408,238: 17x10
#1313 @ 353,604: 26x25
#1314 @ 164,588: 28x25
#1315 @ 113,163: 25x12
#1316 @ 3,293: 26x15
#1317 @ 152,401: 18x23
#1318 @ 898,877: 20x12
#1319 @ 475,636: 24x21
#1320 @ 514,706: 26x13
#1321 @ 227,509: 24x25
#1322 @ 538,679: 18x24
#1323 @ 435,10: 23x10
#1324 @ 261,891: 23x24
#1325 @ 509,964: 21x24
#1326 @ 424,466: 5x13
#1327 @ 486,180: 16x18
#1328 @ 7,234: 29x12
#1329 @ 513,146: 19x26
#1330 @ 43,182: 20x20
#1331 @ 385,898: 29x17
#1332 @ 628,283: 18x17
#1333 @ 473,953: 26x24
#1334 @ 933,669: 11x10
#1335 @ 954,902: 12x27
#1336 @ 397,422: 18x23
#1337 @ 314,857: 16x22
#1338 @ 398,928: 24x14
#1339 @ 443,279: 16x10
#1340 @ 865,491: 15x25
#1341 @ 182,110: 26x15
#1342 @ 184,390: 21x10
#1343 @ 28,374: 19x17
#1344 @ 150,597: 20x17
#1345 @ 285,109: 20x25
#1346 @ 535,306: 16x20
#1347 @ 545,216: 16x19
#1348 @ 72,258: 16x18
#1349 @ 487,96: 18x21
#1350 @ 942,729: 10x4
#1351 @ 359,409: 28x13
#1352 @ 199,292: 16x27
#1353 @ 786,383: 17x15
#1354 @ 593,94: 14x10
#1355 @ 518,348: 12x17
#1356 @ 753,444: 17x13
#1357 @ 231,721: 16x11
#1358 @ 328,587: 26x26
#1359 @ 83,826: 21x24
#1360 @ 167,146: 28x20
#1361 @ 922,856: 13x23
#1362 @ 124,531: 17x24
#1363 @ 600,332: 11x15
#1364 @ 22,825: 29x23
#1365 @ 290,869: 25x20
#1366 @ 942,452: 21x12
#1367 @ 171,448: 26x14
#1368 @ 881,646: 24x28
#1369 @ 766,117: 10x17
#1370 @ 602,246: 16x21
#1371 @ 770,936: 3x16
#1372 @ 567,600: 22x16
#1373 @ 541,269: 23x22
#1374 @ 934,2: 10x27
#1375 @ 865,821: 27x10
#1376 @ 936,550: 23x16
#1377 @ 612,447: 23x20
#1378 @ 558,400: 22x21
#1379 @ 950,919: 10x18
#1380 @ 548,404: 13x26
#1381 @ 188,189: 14x17
#1382 @ 819,709: 12x13
#1383 @ 951,91: 19x21
#1384 @ 300,821: 11x9
#1385 @ 273,431: 18x17
#1386 @ 300,663: 13x13
#1387 @ 211,905: 16x18
#1388 @ 295,395: 19x22
#1389 @ 526,861: 11x11
#1390 @ 306,777: 22x15
#1391 @ 973,296: 12x25
#1392 @ 570,109: 10x19
#1393 @ 231,543: 27x12
#1394 @ 265,851: 12x27
#1395 @ 484,289: 14x25
#1396 @ 773,636: 14x27
#1397 @ 435,385: 11x19
#1398 @ 960,769: 19x14
#1399 @ 55,92: 19x22
#1400 @ 554,922: 28x10
#1401 @ 139,196: 16x28
#1402 @ 112,380: 28x16
#1403 @ 635,869: 16x13
#1404 @ 259,924: 10x27
#1405 @ 898,980: 26x16
#1406 @ 75,197: 12x16
#1407 @ 632,681: 10x11
#1408 @ 434,974: 14x14
#1409 @ 782,377: 24x29`;
