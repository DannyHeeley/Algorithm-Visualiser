import { dijkstra } from './algorithms/dijkstra';
import { greedyBestFirstSearch } from './algorithms/greedyBestFirstSearch';
import { aStar4Way } from './algorithms/aStar_4Way';
import { aStar8Way } from './algorithms/aStar_8Way';

export const PATHFINDING_ALGORITHMS = {
	DJIKSTRA: {
		name: "Dijkstra's",
		algorithm: dijkstra,
	},
	GREEDYBESTFIRSTSEARCH: {
		name: 'GreedyBestFirst',
		algorithm: greedyBestFirstSearch,
	},
	ASTAR4WAY: {
		name: 'A* 4-WAY',
		algorithm: aStar4Way,
	},
	ASTAR8WAY: {
		name: 'A* 8-WAY',
		algorithm: aStar8Way,
	},
};

