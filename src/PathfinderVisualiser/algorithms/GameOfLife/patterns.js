export const GameOfLifePatterns = {
	COPPERHEAD: {
		name: 'Copperhead',
		pattern: '5bob2o$4bo6bo$3b2o3bo2bo$2obo5b2o$2obo5b2o$3b2o3bo2bo$4bo6bo$5bob2o!',
		offset: { x: 16, y: 7 },
	},
	TWO_ENGINE_CORDERSHIP: {
		name: 'Two Engine Cordership',
		pattern:
			'19b2o$19b4o$19bob2o2$20bo$19b2o$19b3o$21bo$33b2o$33b2o7$36bo$35b2o$34bo3bo$35b2o2bo$40bo$37bobo$38bo$38bo$38b2o$38b2o3$13bo10bo$12b5o5bob2o11bo$11bo10bo3bo9bo$12b2o8b3obo9b2o$13b2o9b2o12bo$2o13bo21b3o$2o35b3o7$8b2o$8b2o11b2o$19b2o2bo$24bo3bo$18bo5bo3bo$19bo2b2o3bobo$20b3o5bo$28bo!',
		offset: { x: 0, y: 0 },
	},
	GOSPER_GLIDER_GUN: {
		name: 'Gosper Glider Gun',
		pattern:
			'24bo11b$22bobo11b$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o14b$2o8bo3bob2o4bobo11b$10bo5bo7bo11b$11bo3bo20b$12b2o!',
		offset: { x: 0, y: 0 },
	},
	GLIDER: {
		name: 'Glider',
		pattern: 'bo$2bo$3o!',
		offset: { x: 0, y: 0 },
	},
	SIR_ROBIN: {
		name: 'Sir Robin',
		pattern:
			'6bo3bob2o$6b3obo3bo18b3o$5b2o4b3o3b2o15b2o2b2o$5bo3bo6b2o14bo2bobo$o3bo4b2obo3bo2bobo11bo4bobo$bob3o5b3o2bo4bo13bo4b2o$bo3b4obob2o3bob2obo2b3o2bo3bobo4bobob2o$6b3o2bo2b2o5b2o2b2obo3b2o2b2o3bobob2o$7b2o2bo2b2o5b2o2b2obobob2o4bo2bo11b2o$12bobo6b2o2bo2bob2obo5bob2o4bo5bobo$21bobob2ob2o3b2o3b2o2b2o3bo5bo3bo$20bo5b3o5bob2obo4bo2bo5bo3b4o$20bo3b3o8bo9b2o3bo2bo3bo5b3o$20bo24bob3obo6bo2bo$22bo22b3o3bo10bobob2o$45b2o2b2o3bo3b2ob4obobo2b2o$46bob3obo5bo5bo7bo$45b2o2b2obo6bobo4bo5b3o$52b2o6bobobo3bo4b2o$47bobo4b2obob2o2b3ob2ob2ob2o$48bo11b4obo4b2ob2o2$68bo6b2o$68bo6bobo$68bo3bo2bo$69bobobo4bo$71bobo2b3o$67bo3bo2bo$67bo3bob2o$69bo2bo$70bo!',
		offset: { x: 0, y: 0 },
	},
	SNARK_LOOP: {
		name: 'Snark Loop',
		pattern:
			'27b2o$27bobo$29bo4b2o$25b4ob2o2bo2bo$25bo2bo3bobob2o$28bobobobo$29b2obobo$33bo2$19b2o$20bo8bo$20bobo5b2o$21b2o$35bo$36bo$34b3o2$25bo$25b2o$24bobo4b2o22bo$31bo21b3o$32b3o17bo$34bo17b2o2$45bo$46b2o12b2o$45b2o14bo$3b2o56bob2o$4bo9b2o37bo5b3o2bo$2bo10bobo37b2o3bo3b2o$2b5o8bo5b2o35b2obo$7bo13bo22b2o15bo$4b3o12bobo21bobo12b3o$3bo15b2o22bo13bo$3bob2o35b2o5bo8b5o$b2o3bo3b2o37bobo10bo$o2b3o5bo37b2o9bo$2obo56b2o$3bo14b2o$3b2o12b2o$19bo2$11b2o17bo$12bo17b3o$9b3o21bo$9bo22b2o4bobo$38b2o$39bo2$28b3o$28bo$29bo$42b2o$35b2o5bobo$35bo8bo$44b2o2$31bo$30bobob2o$30bobobobo$27b2obobo3bo2bo$27bo2bo2b2ob4o$29b2o4bo$35bobo$36b2o!',
		offset: { x: 0, y: 0 },
	},
	ACHIMSP11: {
		// TODO: Investigate why this doesnt work in the parseRlePattern function
		name: 'ACHIMSP11',
		pattern:
			'10b2o10b$10b2o10b$5bo10bo5b$4bobo8bobo4b$3bobo3bo2bo3bobo3b$2bobo4bo2bo4bobo2b$3bo5bo2bo5bo3b3$4b3o8b3o4b$2o18b2o$2o18b2o$4b3o8b3o4b3$3bo5bo2bo5bo3b$2bobo4bo2bo4bobo2b$3bobo3bo2bo3bobo3b$4bobo8bobo4b$5bo10bo5b$10b2o10b$10b2o!',
		offset: { x: 20, y: 2 },
	},
};
