export const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
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
}

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
    isAlive: false,
  };
};

export const handleExtraClassNameFor = (node) => {
  return node.isTarget
    ? "node-target"
    : node.isStart
    ? "node-start"
    : node.isWall
    ? "node-wall"
    : node.isWeighted
    ? "node-weighted"
    : node.isVisited
    ? "node-visited"
    : "";
}
