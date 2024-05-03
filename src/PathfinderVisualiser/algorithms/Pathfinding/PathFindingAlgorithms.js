import { dijkstra } from './dijkstra';
import { greedyBestFirstSearch } from './greedyBestFirstSearch';
import { aStar4Way } from "./aStar_4Way";
import { aStar8Way } from './aStar_8Way';

export const PathFindingAlgorithms = {
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

