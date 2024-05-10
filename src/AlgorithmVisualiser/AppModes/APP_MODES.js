import { gameOfLife } from './GameOfLife/gameOfLife.js';
import { usePathfindingAnimation } from './Pathfinding/usePathfindingAnimation.jsx';
import { animateGameOfLife } from './GameOfLife/gameOfLifeAnimation.js';
import { GAME_OF_LIFE_PATTERNS } from './GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { PATHFINDING_ALGORITHMS } from './Pathfinding/PATHFINDING_ALGORITHMS.js';

export const APP_MODES = {
	PATHFINDING_MODE: {
		name: 'PATHFINDING',
		GRID_DIMENSIONS: { numOfRows: 25, numOfCols: 50 },
		ALGORITHMS: PATHFINDING_ALGORITHMS,
		animation: usePathfindingAnimation(),
		DRAW_TYPE: {
			WALL: { name: 'Draw Weight', classname: 'draw-type-wall' },
			WEIGHTED: { name: 'Draw Walls', classname: 'draw-type-weight' },
		},
	},
	SORTING_MODE: {
		name: 'SORTING',
		GRID_DIMENSIONS: { numOfRows: 25, numOfCols: 50 },
	},
	GAME_OF_LIFE_MODE: {
		name: 'GAMEOFLIFE',
		GRID_DIMENSIONS: { numOfRows: 54, numOfCols: 96 },
		algorithm: gameOfLife,
		animation: animateGameOfLife,
		PATTERNS: GAME_OF_LIFE_PATTERNS,
	},
};
