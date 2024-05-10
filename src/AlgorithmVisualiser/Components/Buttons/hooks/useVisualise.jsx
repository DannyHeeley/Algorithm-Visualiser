import { toggleIsAnimating, toggleNeedsReset } from "../../../../App";
import { AppModes } from "../../../AppModes/AppModes";
import { useNodeHelper } from "../../Grid/Node/useNodeHelper";

export const useVisualise = (appState, setAppState) => {
	const { startAndTargetNodesSet } = useNodeHelper();
	const { currentAlgorithm, currentAnimation } = appState;
	const gameOfLife = AppModes.GAME_OF_LIFE_MODE.algorithm;
	const PATHFINDING_MODE = AppModes.PATHFINDING_MODE;

	const visualiseAlgorithm = () => {
		if (appState.isAnimating || appState.needsReset || (!startAndTargetNodesSet(appState) && appState.currrentMode === PATHFINDING_MODE)) return;
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
				currentAnimation(visitedNodesInOrder, shortestPathNodesInOrder, appState, setAppState);
			}
		}, 0);
	};

	return visualiseAlgorithm;
}

