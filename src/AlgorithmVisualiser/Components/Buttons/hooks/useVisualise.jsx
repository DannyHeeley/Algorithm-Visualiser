import { APP_MODES } from '../../../AppModes/APP_MODES';
import { useNodeHelper } from "../../Grid/Node/useNodeHelper";

export const useVisualise = (appState, setAppState) => {

	const { startAndTargetNodesSet } = useNodeHelper();
	const { CURRENT_ALGORITHM, CURRENT_MODE } = appState;
	const gameOfLife = APP_MODES.GAME_OF_LIFE_MODE.algorithm;
	const { PATHFINDING_MODE, GAME_OF_LIFE_MODE, SORTING_MODE } = APP_MODES;

	const visualiseAlgorithm = () => {
		if (appState.isAnimating || appState.needsReset || (!startAndTargetNodesSet(appState) && appState.CURRENT_MODE === PATHFINDING_MODE)) return;
		let visitedNodesInOrder, shortestPathNodesInOrder;
		setIsAnimating(true, setAppState);
		toggleNeedsReset(setAppState);

		setTimeout(() => {
			const startNode = appState.grid[appState.startNodeRow]?.[appState.startNodeCol];
			const targetNode = appState.grid[appState.targetNodeRow]?.[appState.targetNodeCol];
			switch (CURRENT_MODE) {
				case GAME_OF_LIFE_MODE:
					CURRENT_MODE.animation(gameOfLife, appState, setAppState);
					return;
				case PATHFINDING_MODE:
					[visitedNodesInOrder, shortestPathNodesInOrder] = CURRENT_ALGORITHM.algorithm(appState.grid, startNode, targetNode);
					CURRENT_MODE.animation(visitedNodesInOrder, shortestPathNodesInOrder, appState, setAppState);
					return;
				case SORTING_MODE:
					CURRENT_MODE.animation(appState, setAppState);
					return;
			}
		}, 0);
	};

	const toggleNeedsReset = (setAppState) => {
		setAppState((prevState) => ({
			...prevState,
			needsReset: !prevState.needsReset,
		}));
	};

	return visualiseAlgorithm;
};

export const setIsAnimating = (bool, setAppState) => {
	setAppState((prevState) => ({
		...prevState,
		isAnimating: bool,
	}));
};

