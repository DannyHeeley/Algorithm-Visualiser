import { GridModes, toggleIsAnimating, toggleNeedsReset } from "../../../../App";
import { startAndTargetNodesSet } from "../../Grid/Node/NodeHelper.js";

export const useVisualise = (appState, setAppState) => {
	const { currentAlgorithm, currentAnimation } = appState;
	const gameOfLife = GridModes.GAME_OF_LIFE_MODE.algorithm;
	
	const visualiseAlgorithm = () => {
		if (appState.isAnimating || appState.needsReset || !startAndTargetNodesSet(appState)) return;
		let visitedNodesInOrder, shortestPathNodesInOrder;
		toggleIsAnimating(setAppState);
		toggleNeedsReset(setAppState);
		setTimeout(() => {
			const startNode = appState.grid[appState.startNodeRow]?.[appState.startNodeCol];
			const targetNode = appState.grid[appState.targetNodeRow]?.[appState.targetNodeCol];
			if (currentAlgorithm === gameOfLife) {
				currentAnimation(gameOfLife, appState, setAppState);
			} else {
				[visitedNodesInOrder, shortestPathNodesInOrder] = currentAlgorithm(appState.grid, startNode, targetNode);
				currentAnimation(visitedNodesInOrder, shortestPathNodesInOrder, appState);
			}
		}, 0);
		toggleIsAnimating(setAppState);
	};

	return visualiseAlgorithm;
}

