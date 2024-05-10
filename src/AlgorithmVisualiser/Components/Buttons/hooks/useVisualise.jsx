import { toggleIsAnimating, toggleNeedsReset } from "../../../../App";
import { APP_MODES } from '../../../AppModes/APP_MODES';
import { useNodeHelper } from "../../Grid/Node/useNodeHelper";

export const useVisualise = (appState, setAppState) => {
	const { startAndTargetNodesSet } = useNodeHelper();
	const { CURRENT_ALGORITHM, currentMode } = appState;
	const gameOfLife = APP_MODES.GAME_OF_LIFE_MODE.algorithm;
	const PATHFINDING_MODE = APP_MODES.PATHFINDING_MODE;

	const visualiseAlgorithm = () => {
		if (appState.isAnimating || appState.needsReset || (!startAndTargetNodesSet(appState) && appState.currentMode === PATHFINDING_MODE)) return;
		let visitedNodesInOrder, shortestPathNodesInOrder;
		toggleIsAnimating(setAppState);
		toggleNeedsReset(setAppState);
		setTimeout(() => {
			const startNode = appState.grid[appState.startNodeRow]?.[appState.startNodeCol];
			const targetNode = appState.grid[appState.targetNodeRow]?.[appState.targetNodeCol];
			if (CURRENT_ALGORITHM === gameOfLife) {
				currentMode.animation(gameOfLife, appState, setAppState);
			} else {
				[visitedNodesInOrder, shortestPathNodesInOrder] = CURRENT_ALGORITHM.algorithm(appState.grid, startNode, targetNode);
				currentMode.animation(visitedNodesInOrder, shortestPathNodesInOrder, appState, setAppState);
			}
		}, 0);
	};

	return visualiseAlgorithm;
}

