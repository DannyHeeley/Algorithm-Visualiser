import { GridMode } from "../../../App";

export const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
  NODE: "node",
  SORTING: "isSorting",
  CELL: "isCell",
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
    isCell: false,
    previousNode: null,
    distance: Infinity, 
    costOfPathFromStartNode: row == gridState.startNodeRow && col === gridState.startNodeCol ? 0 : Infinity,
    cameFrom: null,
  };
};

export const typeOfNode = (node, gridState) => {
  return gridState.mode === GridMode.GAMEOFLIFE
    ? NodeType.CELL
    : node.isStart || !gridState.isStartNodeSet
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

const handleClassNameSorting = (node, randomUnsortedValues) => {
  if (node.row < randomUnsortedValues[node.col]) {
    return NodeType.SORTING;
  }
  return NodeType.NODE
};

const handleClassNameGameOfLife = (node) => {
  return node.isCell ? NodeType.CELL : NodeType.NODE;
}

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
}

export const handleExtraClassNameFor = (node, gridMode, randomUnsortedValues) => {
  return gridMode === GridMode.GAMEOFLIFE ? handleClassNameGameOfLife(node) : gridMode === GridMode.SORTING ? handleClassNameSorting(node, randomUnsortedValues) : handleClassNamePathfinding(node);
};


