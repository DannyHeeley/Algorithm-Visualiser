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
    } else if (gridState.isWallToggled) {
      handleWall(node, NodeType.WALL, setGridState);
      return;
    } else if (!gridState.isWallToggled) {
      handleWall(node, NodeType.WEIGHTED, setGridState);
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
      return {
        ...prevState,
        grid: newGrid,
      };
    });
  };

  const deselectNode = (node, nodeType, setNodeState, setGridState) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, nodeType, prevState);
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
