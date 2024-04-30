import {
  NodeType,
  typeOfNode,
  nodeIsAStartOrTarget,
  startAndTargetNodesSet,
} from "./Components/Node/NodeHelper";

import { GridMode } from "../App";


export const useMouseEvents = () => {
  const handleMouseDown = (node, gridState, setGridState) => {
    toggleMouseIsPressed(setGridState);
    const thisNodeType = typeOfNode(node, gridState);
    if (startAndTargetNodesSet(gridState) || gridState.mode === GridMode.GAMEOFLIFE) {
      if (nodeIsAStartOrTarget(node)) {
        handleStartOrTargetDeselect(node, thisNodeType, setGridState);
      } else {
        handleNodeClick(node, thisNodeType, setGridState);
      }
    } else {
      handleStartOrTargetSelect(node, thisNodeType, setGridState);
    }
  };

  const handleMouseEnter = (node, gridState, setGridState) => {
    if (gridState.mouseIsPressed && startAndTargetNodesSet(gridState)) {
      const nodeTypePathfinding = gridState.isWallToggled ? NodeType.WALL : NodeType.WEIGHTED;
      const thisNodeType =
        gridState.mode === GridMode.GAMEOFLIFE
          ? NodeType.CELL
          : nodeTypePathfinding;
      handleNodeClick(
        node,
        thisNodeType,
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

  const handleStartOrTargetSelect = (node, nodeType, setGridState) => {
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

  const handleStartOrTargetDeselect = (node, nodeType, setGridState) => {
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

  const handleNodeClick = (node, nodeType, setGridState) => {
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
