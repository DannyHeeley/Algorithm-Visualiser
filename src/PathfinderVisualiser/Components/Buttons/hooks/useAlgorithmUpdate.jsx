import { GridModes } from "../../../../App";

export const useAlgorithmUpdate = (appState, setAppState) => {
	const { DJIKSTRA, GREEDYBESTFIRSTSEARCH, ASTAR4WAY, ASTAR8WAY } = GridModes.PATHFINDING_MODE.ALGORITHMS;

	const handleAlgorithmUpdate = () => {
		if (appState.isAnimating || appState.needsReset) return;
		handleChangeAlgorithmText();
		handleChangeAlgorithm();
	};

	const handleChangeAlgorithm = () => {
		setAppState((prevState) => ({
			...prevState,
			currentAlgorithm: algorithmRotator(prevState),
		}));
	};

	const algorithmRotator = () => {
		return appState.currentAlgorithm === DJIKSTRA.algorithm
			? GREEDYBESTFIRSTSEARCH.algorithm
			: appState.currentAlgorithm === GREEDYBESTFIRSTSEARCH.algorithm
			? ASTAR4WAY.algorithm
			: appState.currentAlgorithm === ASTAR4WAY.algorithm
			? ASTAR8WAY.algorithm
			: DJIKSTRA.algorithm;
	};

	const handleChangeAlgorithmText = () => {
		setAppState((prevState) => ({
			...prevState,
			algorithmButtonText: buttonTextRotator(prevState),
		}));
	};

	const buttonTextRotator = () => {
		return appState.algorithmButtonText === DJIKSTRA.name
			? GREEDYBESTFIRSTSEARCH.name
			: appState.algorithmButtonText === GREEDYBESTFIRSTSEARCH.name
			? ASTAR4WAY.name
			: appState.algorithmButtonText === ASTAR4WAY.name
			? ASTAR8WAY.name
			: DJIKSTRA.name;
	};

	return handleAlgorithmUpdate;
};
