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

export const initialiseNode = (col, row, isStart, isTarget, gScore) => {
  return {
    col,
    row,
    isStart,
    isTarget,
    isWall: false,
    isWeighted: false,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
    gScore,
    fScore: Infinity,
    cameFrom: null,
  };
};

export const extraClassNameFor = (node) => {
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
