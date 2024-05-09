import { gameOfLife } from './GameOfLife/gameOfLife.js';
import { animatePathfinding } from './Pathfinding/pathfindingAnimation.js';
import { animateGameOfLife } from './GameOfLife/gameOfLifeAnimation.js';
import { GAME_OF_LIFE_PATTERNS } from './GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { PATHFINDING_ALGORITHMS } from './Pathfinding/PATHFINDING_ALGORITHMS.js';

export const AppModes = {
	PATHFINDING_MODE: {
		name: 'PATHFINDING',
		ALGORITHMS: PATHFINDING_ALGORITHMS,
		animation: animatePathfinding,
	},
	SORTING_MODE: {
		name: 'SORTING'
	},
	GAME_OF_LIFE_MODE: {
		name: 'GAMEOFLIFE',
		algorithm: gameOfLife,
		animation: animateGameOfLife,
		PATTERNS: GAME_OF_LIFE_PATTERNS
	},
};
