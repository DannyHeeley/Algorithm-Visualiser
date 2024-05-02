import { GridModes, toggleIsAnimating, toggleNeedsReset } from "../../../../App";
import { startAndTargetNodesSet } from "../../Node/NodeHelper";

export const useButtons = (appState, setAppState) => {
	//TODO: Seperate the visualise from the handle algorithm into seperate hooks
	const visualiseAlgorithm = () => {
		const { currentAlgorithm, currentAnimation } = appState;
		const gameOfLife = GridModes.GAME_OF_LIFE_MODE.algorithm;
		if (appState.isAnimating || appState.needsReset || !startAndTargetNodesSet(appState)) return;
		let visitedNodesInOrder, shortestPathNodesInOrder;
		const algorithm = currentAlgorithm;
		toggleIsAnimating(setAppState);
		toggleNeedsReset(setAppState);
		setTimeout(() => {
			const startNode = appState.grid[appState.startNodeRow]?.[appState.startNodeCol];
			const targetNode = appState.grid[appState.targetNodeRow]?.[appState.targetNodeCol];
			if (algorithm === gameOfLife) {
				currentAnimation(gameOfLife, appState, setAppState);
			} else {
				[visitedNodesInOrder, shortestPathNodesInOrder] = algorithm(appState.grid, startNode, targetNode);
				currentAnimation(visitedNodesInOrder, shortestPathNodesInOrder, appState);
			}
		}, 0);
		toggleIsAnimating(setAppState);
	};

	const handleAlgorithmUpdate = () => {
		if (appState.isAnimating || appState.needsReset) return;
		handleChangeAlgorithmText(setAppState, appState);
		handleChangeAlgorithm(appState);
	};

	const handleChangeAlgorithm = (appState) => {
		setAppState((prevState) => ({
			...prevState,
			currentAlgorithm: algorithmRotator(appState),
		}));
	};

	const algorithmRotator = (appState) => {
		const { DJIKSTRA, GREEDYBESTFIRSTSEARCH, ASTAR4WAY, ASTAR8WAY } = GridModes.PATHFINDING_MODE.ALGORITHMS;
		return appState.algorithmButtonText === "Dijkstra's"
			? GREEDYBESTFIRSTSEARCH.algorithm
			: appState.algorithmButtonText === 'GreedyBestFirst'
			? ASTAR4WAY.algorithm
			: appState.algorithmButtonText === 'A* 4-WAY'
			? ASTAR8WAY.algorithm
			: DJIKSTRA.algorithm;
	};

	const handleChangeAlgorithmText = (setAppState, appState) => {
		setAppState((prevState) => ({
			...prevState,
			algorithmButtonText: buttonTextRotator(appState),
		}));
	};

	const buttonTextRotator = (appState) => {
		return appState.algorithmButtonText === "Dijkstra's"
			? 'GreedyBestFirst'
			: appState.algorithmButtonText === 'GreedyBestFirst'
			? 'A* 4-WAY'
			: appState.algorithmButtonText === 'A* 4-WAY'
			? 'A* 8-WAY'
			: "Dijkstra's";
	};

	return { handleAlgorithmUpdate, visualiseAlgorithm };
};
