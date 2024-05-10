import { AppModes } from "../../../AppModes/AppModes";
import { NodeType } from './NodeType.js';

export const useNodeHelper = () => {
	const initialiseNode = (col, row, appState) => {
		return {
			col,
			row,
			isStart: row === appState.startNodeRow && col === appState.startNodeCol,
			isTarget: row === appState.targetNodeRow && col === appState.targetNodeCol,
			isWall: false,
			isWeighted: false,
			isVisited: false,
			isShortestPath: false,
			isAutomata: false,
			previousNode: null,
			distance: Infinity,
			costOfPathFromStartNode: row == appState.startNodeRow && col === appState.startNodeCol ? 0 : Infinity,
			cameFrom: null,
		};
	};

	const typeOfNode = (node, appState) => {
		return appState.currentMode === AppModes.GAME_OF_LIFE_MODE
			? NodeType.AUTOMATA
			: node.isStart || !appState.isStartNodeSet
			? NodeType.START
			: node.isTarget || !appState.isTargetNodeSet
			? NodeType.TARGET
			: appState.drawType
			? NodeType.WALL
			: NodeType.WEIGHTED;
	};

	const nodeIsAStartOrTarget = (node) => {
		return node.isStart || node.isTarget;
	};

	const startAndTargetNodesSet = (appState) => {
		return appState.isStartNodeSet && appState.isTargetNodeSet;
	};

	const handleExtraClassNameFor = (node, mode, randomUnsortedValues) => {
		return mode === AppModes.GAME_OF_LIFE_MODE
			? handleClassNameGameOfLife(node)
			: mode === AppModes.SORTING_MODE
			? handleClassNameSorting(node, randomUnsortedValues)
			: handleClassNamePathfinding(node);
	};

	const handleClassNameSorting = (node, randomUnsortedValues) => {
		if (node.row < randomUnsortedValues[node.col]) {
			return NodeType.SORTING;
		}
		return NodeType.NODE;
	};

	const handleClassNameGameOfLife = (node) => {
		return node.isAutomata ? NodeType.AUTOMATA : NodeType.NODE;
	};

	const handleClassNamePathfinding = (node) => {
		return node.isTarget
			? NodeType.TARGET
			: node.isStart
			? NodeType.START
			: node.isWall
			? NodeType.WALL
			: node.isWeighted
			? NodeType.WEIGHTED
			: node.isVisited
			? NodeType.VISITED
			: node.isShortestPath
			? NodeType.SHORTEST_PATH
			: node.isShortestPath && node.isWeighted
			? NodeType.SHORTEST_PATH_WEIGHTED
			: NodeType.NODE;
	};
	return { initialiseNode, typeOfNode, nodeIsAStartOrTarget, startAndTargetNodesSet, handleExtraClassNameFor }
};

