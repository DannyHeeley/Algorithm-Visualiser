import { APP_MODES } from '../../../AppModes/APP_MODES';

export const useAlgorithmUpdate = (appState, setAppState) => {
	const { PATHFINDING_MODE, SORTING_MODE } = APP_MODES;
	const { DJIKSTRA, GREEDYBESTFIRSTSEARCH, ASTAR4WAY, ASTAR8WAY } = APP_MODES.PATHFINDING_MODE.ALGORITHMS;
	const { BUBBLE_SORT,QUICK_SORT, SELECTION_SORT, INSERTION_SORT, HEAP_SORT, COMB_SORT, GNOME_SORT,
		BOGO_SORT,
		COUNTING_SORT,
	} = APP_MODES.SORTING_MODE.ALGORITHMS;

	const handleAlgorithmUpdate = () => {
		setAppState((prevState) => ({
			...prevState,
			CURRENT_ALGORITHM: algorithmRotator(prevState),
		}));
	};

	const algorithmRotator = () => {
		const { CURRENT_MODE, CURRENT_ALGORITHM } = appState;
		switch (CURRENT_MODE) {
			case PATHFINDING_MODE:
				return handlePathfindingAlgoUpdate(CURRENT_ALGORITHM, DJIKSTRA, GREEDYBESTFIRSTSEARCH, ASTAR4WAY, ASTAR8WAY);
			case SORTING_MODE:
				return handleSortingAlgoUpdate(CURRENT_ALGORITHM, BUBBLE_SORT, QUICK_SORT, SELECTION_SORT, INSERTION_SORT, HEAP_SORT, COMB_SORT, GNOME_SORT, BOGO_SORT, COUNTING_SORT);
			default:
				return CURRENT_ALGORITHM;
		}
	};

	const handleSortingAlgoUpdate = (CURRENT_ALGORITHM) => {
		switch (CURRENT_ALGORITHM) {
			case BUBBLE_SORT:
				return COMB_SORT;
			case COMB_SORT:
				return INSERTION_SORT;
			case INSERTION_SORT:
				return GNOME_SORT;
			case GNOME_SORT:
				return SELECTION_SORT;
			case SELECTION_SORT:
				return HEAP_SORT;
			case HEAP_SORT:
				return QUICK_SORT;
			case QUICK_SORT:
				return COUNTING_SORT;
			case COUNTING_SORT:
				return BOGO_SORT;
			default:
				return BUBBLE_SORT;
		}
	};

	const handlePathfindingAlgoUpdate = (CURRENT_ALGORITHM) => {
		switch (CURRENT_ALGORITHM) {
			case DJIKSTRA:
				return GREEDYBESTFIRSTSEARCH;
			case GREEDYBESTFIRSTSEARCH:
				return ASTAR4WAY;
			case ASTAR4WAY:
				return ASTAR8WAY;
			default:
				return DJIKSTRA;
		}
	};

	return handleAlgorithmUpdate;
};
