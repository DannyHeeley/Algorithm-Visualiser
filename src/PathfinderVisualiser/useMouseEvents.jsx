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
    setGrid,
    setGridState,
    isWallToggled,
    isAnimating,
    setNodeState
  ) => {
    if (isAnimating) return;

    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: true,
    }));

    if (!nodeState.isStartNodeSet && node.isTarget) {
      selectNode(node, NodeType.START, setNodeState, setGridState);
      return;
    } else if (!nodeState.isTargetNodeSet && node.isStart) {
      selectNode(node, NodeType.TARGET, setNodeState, setGridState);
      return;
    } else if (node.isStart) {
      deselectNode(node, NodeType.START, setNodeState, setGridState);
      return;
    } else if (node.isTarget) {
      deselectNode(node, NodeType.TARGET, setNodeState, setGridState);
      return;
    } else if (isWallToggled) {
      handleWall(node, NodeType.WALL, setGridState);
      return;
    } else if (!isWallToggled) {
      handleWall(node, NodeType.WEIGHTED, setGridState);
    }
  };

  const handleMouseEnter = (
    node,
    nodeState,
    isWallToggled,
    isAnimating,
    setGrid,
    setGridState
  ) => {
    if (
      nodeState.mouseIsPressed &&
      !isAnimating &&
      nodeState.isStartNodeSet &&
      nodeState.isTargetNodeSet
    ) {
      const nodeType = isWallToggled ? NodeType.WALL : NodeType.WEIGHTED;
      setGridState((prevState) => ({
        ...prevState,
        grid: getNewGridFor(node, nodeType, prevState.grid),
      }));
    }
  };

  const handleMouseUp = (setNodeState) => {
    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: false,
    }));
  };

  const getNewGridFor = (oldNode, nodeType, prevGrid) => {
    const newGrid = prevGrid.slice();
    const thisNode = newGrid[oldNode.row][oldNode.col];
    const newNode = {
      ...thisNode,
      [nodeType]: !thisNode[nodeType],
    };
    newGrid[oldNode.row][oldNode.col] = newNode;
    return newGrid;
  };

  const selectNode = (node, nodeType, setNodeState, setGrid) => {
    setGrid((prevGrid) => {
      const newGrid = getNewGridFor(node, nodeType, prevGrid);
      if (node.isStart) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          startNodeCol: node.col,
          startNodeRow: node.row,
          isStartNodeSet: true,
        }));
      }
      if (node.isTarget) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          targetNodeCol: node.col,
          targetNodeRow: node.row,
          isTargetNodeSet: true,
        }));
      }
      return newGrid;
    });
  };

  const deselectNode = (node, nodeType, setNodeState, setGrid) => {
    setGrid((prevGrid) => {
      const newGrid = getNewGridFor(node, nodeType, prevGrid);
      if (node.isStart) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          startNodeCol: null,
          startNodeRow: null,
          isStartNodeSet: false,
        }));
      }
      if (node.isTarget) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          targetNodeCol: null,
          targetNodeRow: null,
          isTargetNodeSet: false,
        }));
      }
      return newGrid;
    });
  };

  const handleWall = (node, nodeType, setGrid) => {
    setGrid((prevGrid) => getNewGridFor(node, nodeType, prevGrid));
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
