import { APP_MODES } from '../../../AppModes/APP_MODES';

export const useAlgorithmUpdate = (appState, setAppState) => {

	const { DJIKSTRA, GREEDYBESTFIRSTSEARCH, ASTAR4WAY, ASTAR8WAY } = APP_MODES.PATHFINDING_MODE.ALGORITHMS;

	const handleAlgorithmUpdate = () => {
		setAppState((prevState) => ({
			...prevState,
			CURRENT_ALGORITHM: algorithmRotator(prevState),
		}));
	};

	const algorithmRotator = () => {
		return appState.CURRENT_ALGORITHM === DJIKSTRA
			? GREEDYBESTFIRSTSEARCH
			: appState.CURRENT_ALGORITHM === GREEDYBESTFIRSTSEARCH
			? ASTAR4WAY
			: appState.CURRENT_ALGORITHM === ASTAR4WAY
			? ASTAR8WAY
			: DJIKSTRA;
	};

	return handleAlgorithmUpdate;
};
