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
			WALL: { name: 'Draw Weight', classname: 'draw-type-wall' },
			WEIGHTED: { name: 'Draw Walls', classname: 'draw-type-weight' },
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
		PATTERNS: GAME_OF_LIFE_PATTERNS,
	},
};
