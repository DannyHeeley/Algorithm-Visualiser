import { GridMode } from "../../../App";

export const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
  NODE: "node",
  SORTING: "isSorting"
};

export const typeOfNode = (node, gridState) => {
  return node.isStart || !gridState.isStartNodeSet
    ? NodeType.START
    : node.isTarget || !gridState.isTargetNodeSet
    ? NodeType.TARGET
    : gridState.isWallToggled
    ? NodeType.WALL
    : NodeType.WEIGHTED;
};

export const nodeIsAStartOrTarget = (node) => {
  return node.isStart || node.isTarget;
};

export const startAndTargetNodesSet = (gridState) => {
  return gridState.isStartNodeSet && gridState.isTargetNodeSet;
};

export const initialiseNode = (col, row, gridState) => {
  return {
    col,
    row,
    isStart: row === gridState.startNodeRow && col === gridState.startNodeCol,
    isTarget: row === gridState.targetNodeRow && col === gridState.targetNodeCol,
    isWall: false,
    isWeighted: false,
    isVisited: false,
    previousNode: null,
    distance: Infinity, 
    costOfPathFromStartNode: row == gridState.startNodeRow && col === gridState.startNodeCol ? 0 : Infinity,
    cameFrom: null,
  };
};

const handleExtraClassNameSorting = (node, randomUnsortedValues) => {
  if (node.row < randomUnsortedValues[node.col]) {
    return NodeType.SORTING;
  }
  return NodeType.NODE
};

const handleExtraClassNameGameOfLife = (node) => {
  return node.isWall ? NodeType.WALL : NodeType.NODE;
}

const handleExtraClassNamePathfinding = (node) => {
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
}

export const handleExtraClassNameFor = (node, gridMode, randomUnsortedValues) => {
  return gridMode === GridMode.GAMEOFLIFE ? handleExtraClassNameGameOfLife(node) : gridMode === GridMode.SORTING ? handleExtraClassNameSorting(node, randomUnsortedValues) : handleExtraClassNamePathfinding(node);
};

export const generateRandomUnsortedValues = () => {
  const columnHeights = [];
  for (let i = 0; i < 50; i++) {
    columnHeights.push(Math.floor(Math.random() * (Math.floor(25) - 1) + 1));
  }
  return columnHeights;
};


