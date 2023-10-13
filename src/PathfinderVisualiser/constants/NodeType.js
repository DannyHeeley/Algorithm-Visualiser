export const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
};

export const typeOfNode = (node, nodeState, gridState) => {
  return node.isStart || !nodeState.isStartNodeSet
    ? NodeType.START
    : node.isTarget || !nodeState.isTargetNodeSet
    ? NodeType.TARGET
    : gridState.isWallToggled
    ? NodeType.WALL
    : NodeType.WEIGHTED;
};
