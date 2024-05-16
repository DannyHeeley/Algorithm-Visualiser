import { gameOfLife } from './GameOfLife/gameOfLife.js';
import { startPathfinding } from './Pathfinding/startPathfinding.js';
import { startGameOfLife } from './GameOfLife/startGameOfLife.js';
import { GAME_OF_LIFE_PATTERNS } from './GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { PATHFINDING_ALGORITHMS } from './Pathfinding/PATHFINDING_ALGORITHMS.js';
import { SORTING_ALGORITHMS } from './Sorting/SORTING_ALGORITHMS.JS';
import { startSorting } from './Sorting/startSorting.js';

export const APP_MODES = {
	PATHFINDING_MODE: {
		name: 'Pathfinding Mode',
		GRID_DIMENSIONS: { numOfRows: 25, numOfCols: 50 },
		ALGORITHMS: PATHFINDING_ALGORITHMS,
		animation: startPathfinding,
		DRAW_TYPE: {
			WALL: { name: 'Draw Walls', classname: 'draw-type-wall' },
			WEIGHTED: { name: 'Draw Weight', classname: 'draw-type-weight' },
		},
		LEGEND_DATA: {
			'Start Node': 'legend-icon start',
			'Target Node': 'legend-icon target',
			'Visited Node': 'legend-icon visited',
			'Shortest Path': 'legend-icon shortest',
			'Walls': 'legend-icon wall',
			'Weighted Node': 'legend-icon weighted',
		},
	},
	SORTING_MODE: {
		name: 'Sorting Mode',
		GRID_DIMENSIONS: { numOfRows: 25, numOfCols: 50 },
		ALGORITHMS: SORTING_ALGORITHMS,
		animation: startSorting,
	},
	GAME_OF_LIFE_MODE: {
		name: 'Game of Life Mode',
		GRID_DIMENSIONS: { numOfRows: 50, numOfCols: 100 },
		algorithm: gameOfLife,
		animation: startGameOfLife,
		maxGenerations: 1000,
		PATTERNS: GAME_OF_LIFE_PATTERNS,
		RULES_DATA: {
			'Each cell with one or zero neighbors dies, as if by solitude.': 'rule',
			'Each cell with four or more neighbors dies, as if by overpopulation.': 'rule',
			'Each cell with two or three neighbors survives.': 'rule',
			'Each unpopulated cell with three neighbors becomes populated.': 'rule',
		},
	},
};
