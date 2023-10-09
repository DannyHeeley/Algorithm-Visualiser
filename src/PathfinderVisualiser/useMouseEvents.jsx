export const useMouseEvents = () => {
  const NodeType = {
    START: "isStart",
    TARGET: "isTarget",
    WALL: "isWall",
    WEIGHTED: "isWeighted",
  };

  const handleMouseDown = (
    node,
    nodeState,
    setNodeState,
    gridState,
    setGridState
  ) => {
    if (gridState.isAnimating) return;

    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: true,
    }));

    let nodeType =
      node.isStart || !nodeState.isStartNodeSet
        ? NodeType.START
        : node.isTarget || !nodeState.isTargetNodeSet
        ? NodeType.TARGET
        : NodeType.WALL;

    if (nodeState.isStartNodeSet && nodeState.isTargetNodeSet) {
      if (node.isStart || node.isTarget) {
        deselectNode(node, nodeType, setNodeState, setGridState);
        console.log(nodeState.isStartNodeSet, nodeState.isTargetNodeSet);
        return;
      } else {
        nodeType = gridState.isWallToggled ? NodeType.WALL : NodeType.WEIGHTED;
        handleWall(node, nodeType, setGridState);
        console.log(nodeState.isStartNodeSet, nodeState.isTargetNodeSet);
      }
    } else {
      console.log(nodeType);
      return selectNode(node, nodeType, setNodeState, setGridState);
    }
  };

  const handleMouseEnter = (node, nodeState, gridState, setGridState) => {
    if (
      nodeState.mouseIsPressed &&
      !gridState.isAnimating &&
      nodeState.isStartNodeSet &&
      nodeState.isTargetNodeSet
    ) {
      const nodeType = gridState.isWallToggled
        ? NodeType.WALL
        : NodeType.WEIGHTED;
      setGridState((prevState) => ({
        ...prevState,
        grid: getNewGridFor(node, nodeType, prevState),
      }));
    }
  };

  const handleMouseUp = (setNodeState) => {
    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: false,
    }));
  };

  const getNewGridFor = (oldNode, nodeType, prevGridState) => {
    const newGrid = prevGridState.grid.slice();
    const thisNode = newGrid[oldNode.row][oldNode.col];
    const newNode = {
      ...thisNode,
      [nodeType]: !thisNode[nodeType],
    };
    newGrid[oldNode.row][oldNode.col] = newNode;
    return newGrid;
  };

  const selectNode = (node, nodeType, setNodeState, setGridState) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, nodeType, prevState);
      if (nodeType === NodeType.START) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          startNodeCol: node.col,
          startNodeRow: node.row,
          isStartNodeSet: true,
        }));
      }
      if (nodeType === NodeType.TARGET) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          targetNodeCol: node.col,
          targetNodeRow: node.row,
          isTargetNodeSet: true,
        }));
      }
      return {
        ...prevState,
        grid: newGrid,
      };
    });
  };

  const deselectNode = (node, nodeType, setNodeState, setGridState) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, nodeType, prevState);
      if (nodeType === NodeType.START) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          startNodeCol: null,
          startNodeRow: null,
          isStartNodeSet: false,
        }));
      }
      if (nodeType === NodeType.TARGET) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          targetNodeCol: null,
          targetNodeRow: null,
          isTargetNodeSet: false,
        }));
      }
      return { ...prevState, grid: newGrid };
    });
  };

  const handleWall = (node, nodeType, setGridState) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, nodeType, prevState);
      return { ...prevState, grid: newGrid };
    });
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
