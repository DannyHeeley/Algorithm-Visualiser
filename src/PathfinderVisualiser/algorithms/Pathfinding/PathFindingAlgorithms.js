import { dijkstra } from './dijkstra';
import { greedyBestFirstSearch } from './greedyBestFirstSearch';
import { aStar4Way } from "./aStar_4Way";
import { aStar8Way } from './aStar_8Way';

export const PathFindingAlgorithms = {
	DJIKSTRA: {
		name: 'DJIKSTRA',
		algorithm: dijkstra,
	},
	GREEDYBESTFIRSTSEARCH: {
		name: 'GREEDYBESTFIRSTSEARCH',
		algorithm: greedyBestFirstSearch,
	},
	ASTAR4WAY: {
		name: 'ASTAR4WAY',
		algorithm: aStar4Way,
	},
	ASTAR8WAY: {
		name: 'ASTAR8WAY',
		algorithm: aStar8Way,
	},
};

