const generateRandomGameOfLifePattern = () => {
	const result = [];
	for (let i = 0; i < 50; i++) {
		const subArray = [];
		for (let j = 0; j < 100; j++) {
			const randomBoolean = Math.random() < 0.2;
			subArray.push(randomBoolean);
		}
		result.push(subArray);
	}
	return result;
};


export const GAME_OF_LIFE_PATTERNS = {
	NO_PATTERN: {
		name: 'No Pattern',
		pattern: '',
		offset: { x: 0, y: 0 },
	},
	RANDOM: {
		name: 'Random',
		pattern: generateRandomGameOfLifePattern(),
		offset: { x: 0, y: 0 },
	},
	GLIDER: {
		name: 'Glider',
		pattern: 'bo$2bo$3o!',
		offset: { x: 30, y: 15 },
	},
	FIREWORK: {
		name: 'Firework',
		pattern: '2ob2o$obobo$bobob$2bo2b$b3ob!',
		offset: { x: 45, y: 20 },
	},
	WORKER_BEE: {
		name: 'Worker Bee',
		pattern: '2o12b2o$bo12bob$bobo8bobob$2b2o8b2o2b2$5b6o5b2$2b2o8b2o2b$bobo8bobob$bo12bob$2o12b2o!',
		offset: { x: 40, y: 20 },
	},
	HEART: {
		name: 'Heart',
		pattern: '2bo2b$bobob$obobo$2ob2o$o3bo!',
		offset: { x: 45, y: 30 },
	},
	GOSPER_GLIDER_GUN: {
		name: 'Gosper Glider Gun',
		pattern:
			'24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!',
		offset: { x: 15, y: 5 },
	},
	COPPERHEAD: {
		name: 'Copperhead',
		pattern: '5bob2o$4bo6bo$3b2o3bo2bo$2obo5b2o$2obo5b2o$3b2o3bo2bo$4bo6bo$5bob2o!',
		offset: { x: 42, y: 22 },
	},
	ACHIMSP11: {
		name: "Achim's P11",
		pattern:
			'10b2o10b$10b2o10b$5bo10bo5b$4bobo8bobo4b$3bobo3bo2bo3bobo3b$2bobo4bo2bo4bobo2b$3bo5bo2bo5bo3b3$4b3o8b3o4b$2o18b2o$2o18b2o$4b3o8b3o4b3$3bo5bo2bo5bo3b$2bobo4bo2bo4bobo2b$3bobo3bo2bo3bobo3b$4bobo8bobo4b$5bo10bo5b$10b2o10b$10b2o!',
		offset: { x: 37, y: 15 },
	},
	AIRFORCE: {
		name: 'Airforce',
		pattern:
			'7bo6b$6bobo5b$7bo6b2$5b5o4b$4bo5bob2o$3bob2o3bob2o$3bobo2bobo3b$2obo3b2obo3b$2obo5bo4b$4b5o5b2$6bo7b$5bobo6b$6bo!',
		offset: { x: 42, y: 20 },
	},
	P208PIHEPTOMINOHASSLER: {
		name: 'P208PIHEPTOMINOHASSLER',
		pattern:
			'21bo$19b3o6b2o4b2o4b2o$18bo8bo2bobo4bobo2bo$18b2o7b3o10b3o$30b2o6b2o$29bo2b6o2bo$29b2o8b2o2$26bo$24b3o7b3o$23bo27b2o$23b2o26b2o$33bo3bo2$13b2o19bobo13bo$13b2o20bo12b4o$47b3obo$2o7b2obo7b3o23b2o$bo6bo3bo6bo3bo21b2o$bobo3b3o9b2ob2o20b2o3bo3b2o$2b2o3bo3b2o20b2ob2o9b3o3bobo$10b2o21bo3bo6bo3bo6bo$9b2o23b3o7bob2o7b2o$5bob3o$5b4o12bo20b2o$6bo13bobo19b2o2$19bo3bo$4b2o26b2o$4b2o27bo$20b3o7b3o$30bo2$16b2o8b2o$16bo2b6o2bo$17b2o6b2o$14b3o10b3o7b2o$14bo2bobo4bobo2bo8bo$15b2o4b2o4b2o6b3o$35bo!',
		offset: { x: 20, y: 5 },
	},
};

