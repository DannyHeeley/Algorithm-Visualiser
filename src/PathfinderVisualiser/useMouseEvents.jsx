import {
  NodeType,
  typeOfNode,
  startAndTargetNodesSet,
  nodeIsAStartOrTarget,
} from "./Components/Node/NodeHelper";

export const useMouseEvents = () => {
  const handleMouseDown = (node, gridState, setGridState) => {
    toggleMouseIsPressed(setGridState);
    const thisNodeType = typeOfNode(node, gridState);
    if (startAndTargetNodesSet(gridState)) {
      if (nodeIsAStartOrTarget(node)) {
        deselectNode(node, thisNodeType, setGridState);
      } else {
        handleWall(node, thisNodeType, setGridState);
      }
    } else {
      selectNode(node, thisNodeType, setGridState);
    }
  };

  const handleMouseEnter = (node, gridState, setGridState) => {
    if (gridState.mouseIsPressed && startAndTargetNodesSet(gridState)) {
      handleWall(
        node,
        gridState.isWallToggled ? NodeType.WALL : NodeType.WEIGHTED,
        setGridState
      );
    }
  };

  const handleMouseUp = (setGridState) => {
    toggleMouseIsPressed(setGridState);
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

  const selectNode = (node, nodeType, setGridState) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, nodeType, prevState);
      if (nodeType === NodeType.START) {
        setGridState((prevgridState) => ({
          ...prevgridState,
          startNodeCol: node.col,
          startNodeRow: node.row,
          isStartNodeSet: true,
        }));
      }
      if (nodeType === NodeType.TARGET) {
        setGridState((prevgridState) => ({
          ...prevgridState,
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

  const deselectNode = (node, nodeType, setGridState) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, nodeType, prevState);
      if (nodeType === NodeType.START) {
        setGridState((prevgridState) => ({
          ...prevgridState,
          startNodeCol: null,
          startNodeRow: null,
          isStartNodeSet: false,
        }));
      }
      if (nodeType === NodeType.TARGET) {
        setGridState((prevgridState) => ({
          ...prevgridState,
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

  function toggleMouseIsPressed(setGridState) {
    setGridState((prevgridState) => ({
      ...prevgridState,
      mouseIsPressed: !prevgridState.mouseIsPressed,
    }));
  }

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
