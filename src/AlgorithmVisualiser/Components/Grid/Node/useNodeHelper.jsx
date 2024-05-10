import { APP_MODES } from '../../../AppModes/APP_MODES';
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
			isVisitedAnimation: false,
			isShortestPath: false,
			isAutomata: false,
			previousNode: null,
			distance: Infinity,
			costOfPathFromStartNode: row == appState.startNodeRow && col === appState.startNodeCol ? 0 : Infinity,
			cameFrom: null,
		};
	};

	const typeOfNode = (node, appState) => {
		return appState.currentMode === APP_MODES.GAME_OF_LIFE_MODE
			? NodeType.AUTOMATA
			: node.isStart || !appState.isStartNodeSet
			? NodeType.START
			: node.isTarget || !appState.isTargetNodeSet
			? NodeType.TARGET
			: appState.DRAW_TYPE === APP_MODES.PATHFINDING_MODE.DRAW_TYPE.WALL
			? NodeType.WALL
			: NodeType.WEIGHTED;
	};

	const nodeIsAStartOrTarget = (node) => {
		return node.isStart || node.isTarget;
	};

	const startAndTargetNodesSet = (appState) => {
		return appState.isStartNodeSet && appState.isTargetNodeSet;
	};

	const handleExtraClassNameFor = (node, appState) => {
		return appState.currentMode === APP_MODES.GAME_OF_LIFE_MODE
			? handleClassNameGameOfLife(node)
			: appState.currentMode === APP_MODES.SORTING_MODE
			? handleClassNameSorting(node, appState)
			: handleClassNamePathfinding(node);
	};

	const handleClassNameSorting = (node, appState) => {
		if (node.row < appState.randomUnsortedValues[node.col]) {
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
			: node.isWeightedShortestPath
			? NodeType.SHORTEST_PATH_WEIGHTED
			: node.isShortestPath
			? NodeType.SHORTEST_PATH
			: node.isWeighted
			? NodeType.WEIGHTED
			: node.isVisitedAnimation
			? NodeType.VISITED
			: NodeType.NODE;
	};
	
	return { initialiseNode, typeOfNode, nodeIsAStartOrTarget, startAndTargetNodesSet, handleExtraClassNameFor };
};
