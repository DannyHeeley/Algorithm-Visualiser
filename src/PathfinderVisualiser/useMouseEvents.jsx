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
    toggleMouseIsPressed(setNodeState);

    const thisNodeType = typeOfNode(node, nodeState, gridState);

    if (nodeState.isStartNodeSet && nodeState.isTargetNodeSet) {
      if (node.isStart || node.isTarget) {
        deselectNode(node, thisNodeType, setNodeState, setGridState);
      } else {
        handleWall(node, thisNodeType, setGridState);
      }
    } else {
      return selectNode(node, thisNodeType, setNodeState, setGridState);
    }
  };

  const handleMouseEnter = (node, nodeState, gridState, setGridState) => {
    if (
      nodeState.mouseIsPressed &&
      nodeState.isStartNodeSet &&
      nodeState.isTargetNodeSet
    ) {
      handleWall(
        node,
        gridState.isWallToggled ? NodeType.WALL : NodeType.WEIGHTED,
        setGridState
      );
    }
  };

  const handleMouseUp = (setNodeState) => {
    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: !prevNodeState.mouseIsPressed,
    }));
  };

  const getNewGridFor = (oldNode, nodeType, prevGridState) => {
    if (prevGridState.isAnimating || prevGridState.needsReset) return;
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

  function toggleMouseIsPressed(setNodeState) {
    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: !prevNodeState.mouseIsPressed,
    }));
  }

  const typeOfNode = (node, nodeState, gridState) => {
    return node.isStart || !nodeState.isStartNodeSet
      ? NodeType.START
      : node.isTarget || !nodeState.isTargetNodeSet
      ? NodeType.TARGET
      : gridState.isWallToggled
      ? NodeType.WALL
      : NodeType.WEIGHTED;
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
