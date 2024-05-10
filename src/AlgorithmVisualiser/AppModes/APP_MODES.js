import { gameOfLife } from './GameOfLife/gameOfLife.js';
import { usePathfindingAnimation } from './Pathfinding/usePathfindingAnimation.jsx';
import { animateGameOfLife } from './GameOfLife/gameOfLifeAnimation.js';
import { GAME_OF_LIFE_PATTERNS } from './GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { PATHFINDING_ALGORITHMS } from './Pathfinding/PATHFINDING_ALGORITHMS.js';

export const APP_MODES = {
	PATHFINDING_MODE: {
		name: 'PATHFINDING',
		ALGORITHMS: PATHFINDING_ALGORITHMS,
		animation: usePathfindingAnimation(),
		DRAW_TYPE: {
			WALL: { name: 'Draw Weight', classname: 'draw-type-wall' },
			WEIGHTED: { name: 'Draw Walls', classname: 'draw-type-weight' },
		},
	},
	SORTING_MODE: {
		name: 'SORTING',
	},
	GAME_OF_LIFE_MODE: {
		name: 'GAMEOFLIFE',
		algorithm: gameOfLife,
		animation: animateGameOfLife,
		PATTERNS: GAME_OF_LIFE_PATTERNS,
	},
};
