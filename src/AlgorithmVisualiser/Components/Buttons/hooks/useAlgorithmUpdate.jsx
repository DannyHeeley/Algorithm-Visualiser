import { APP_MODES } from '../../../AppModes/APP_MODES';
import { generateRandomUnsortedValues } from '../../../AppModes/Sorting/sortHelper';

export const useAlgorithmUpdate = (appState, setAppState) => {
	const { PATHFINDING_MODE, SORTING_MODE } = APP_MODES;
	const { DJIKSTRA, GREEDYBESTFIRSTSEARCH, ASTAR4WAY, ASTAR8WAY } = APP_MODES.PATHFINDING_MODE.ALGORITHMS;
	const { BUBBLE_SORT, QUICK_SORT, SELECTION_SORT, INSERTION_SORT, MERGE_SORT } = APP_MODES.SORTING_MODE.ALGORITHMS;

	const handleAlgorithmUpdate = () => {
		setAppState((prevState) => ({
			...prevState,
			CURRENT_ALGORITHM: algorithmRotator(prevState),
		}));
	};

	const algorithmRotator = () => {
		if (appState.CURRENT_MODE === PATHFINDING_MODE) {
			return appState.CURRENT_ALGORITHM === DJIKSTRA
				? GREEDYBESTFIRSTSEARCH
				: appState.CURRENT_ALGORITHM === GREEDYBESTFIRSTSEARCH
				? ASTAR4WAY
				: appState.CURRENT_ALGORITHM === ASTAR4WAY
				? ASTAR8WAY
				: DJIKSTRA;
		}
		if (appState.CURRENT_MODE === SORTING_MODE) {
			//shuffleSortingArray(appState, setAppState);
			return appState.CURRENT_ALGORITHM === BUBBLE_SORT
				? QUICK_SORT
				: appState.CURRENT_ALGORITHM === QUICK_SORT
				? SELECTION_SORT
				: appState.CURRENT_ALGORITHM === SELECTION_SORT
				? INSERTION_SORT
				: appState.CURRENT_ALGORITHM === INSERTION_SORT
				? MERGE_SORT
				: BUBBLE_SORT;
		}
	};

	const shuffleSortingArray = (appState, setAppState) => {
		if (isSorted(appState.sortingArray)) {
			setAppState((prevState) => {
				return {
					...prevState,
					sortingArray: generateRandomUnsortedValues(),
				};
			});
		}
	};

	const isSorted = (list) => {
		for (let i = 0; i < list.length - 1; i++) {
			if (list[i] > list[i + 1]) {
				return false;
			}
		}
		return true;
	};

	return handleAlgorithmUpdate;
};

