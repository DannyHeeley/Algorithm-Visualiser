import { GridModes } from '../../../../App';

// TODO: Turn into custom hook - something like "useNodeLogic"

export const NodeType = {
	START: 'isStart',
	TARGET: 'isTarget',
	WALL: 'isWall',
	WEIGHTED: 'isWeighted',
	NODE: 'node',
	SORTING: 'isSorting',
	CELL: 'isCell',
};

export const initialiseNode = (col, row, appState) => {
	return {
		col,
		row,
		isStart: row === appState.startNodeRow && col === appState.startNodeCol,
		isTarget: row === appState.targetNodeRow && col === appState.targetNodeCol,
		isWall: false,
		isWeighted: false,
		isVisited: false,
		isCell: false,
		previousNode: null,
		distance: Infinity,
		costOfPathFromStartNode: row == appState.startNodeRow && col === appState.startNodeCol ? 0 : Infinity,
		cameFrom: null,
	};
};

export const typeOfNode = (node, appState) => {
	return appState.currentMode === GridModes.GAME_OF_LIFE_MODE
		? NodeType.CELL
		: node.isStart || !appState.isStartNodeSet
		? NodeType.START
		: node.isTarget || !appState.isTargetNodeSet
		? NodeType.TARGET
		: appState.drawType
		? NodeType.WALL
		: NodeType.WEIGHTED;
};

export const nodeIsAStartOrTarget = (node) => {
	return node.isStart || node.isTarget;
};

export const startAndTargetNodesSet = (appState) => {
	return appState.isStartNodeSet && appState.isTargetNodeSet;
};

const handleClassNameSorting = (node, randomUnsortedValues) => {
	if (node.row < randomUnsortedValues[node.col]) {
		return NodeType.SORTING;
	}
	return NodeType.NODE;
};

const handleClassNameGameOfLife = (node) => {
	return node.isCell ? NodeType.CELL : NodeType.NODE;
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
		? NodeType.isVisited
		: NodeType.NODE;
};

export const handleExtraClassNameFor = (node, mode, randomUnsortedValues) => {
	return mode === GridModes.GAME_OF_LIFE_MODE
		? handleClassNameGameOfLife(node)
		: mode === GridModes.SORTING_MODE
		? handleClassNameSorting(node, randomUnsortedValues)
		: handleClassNamePathfinding(node);
};
