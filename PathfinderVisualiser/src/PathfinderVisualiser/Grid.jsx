import { useState } from "react";
import { useNode } from "./Node/Node";

export const useGridComponent = (grid, setGrid, isWallToggled, isAnimating) => {
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [isStartNodeSet, setIsStartNodeSet] = useState(true);
  const [targetNodeRow, setTargetNodeRow] = useState(10);
  const [targetNodeCol, setTargetNodeCol] = useState(35);
  const [isTargetNodeSet, setIsTargetNodeSet] = useState(true);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const { initialiseNode } = useNode();

  const useGetNewGridFor = (nodeType, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      [nodeType]: !node[nodeType],
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const initialiseGrid = (
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow
  ) => {
    return Array.from({ length: 20 }, (_, row) =>
      Array.from({ length: 50 }, (_, col) =>
        initialiseNode(
          col,
          row,
          startNodeCol,
          startNodeRow,
          targetNodeCol,
          targetNodeRow
        )
      )
    );
  };

  function selectNode(nodeType, row, col) {
    const newGrid = useGetNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    if (nodeType === NodeType.START) {
      setStartNodeCol(col);
      setStartNodeRow(row);
      setIsStartNodeSet((prevState) => !prevState);
    }
    if (nodeType === NodeType.TARGET) {
      setTargetNodeCol(col);
      setTargetNodeRow(row);
      setIsTargetNodeSet((prevState) => !prevState);
    }
  }

  function deselectNode(nodeType, row, col) {
    const newGrid = useGetNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    if (nodeType === NodeType.START) {
      setIsStartNodeSet((prevState) => !prevState);
    }
    if (nodeType === NodeType.TARGET) {
      setIsTargetNodeSet((prevState) => !prevState);
    }
  }

  function handleWall(nodeType, row, col) {
    const newGrid = useGetNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseDown = (
    row,
    col,
    isStartNodeSet,
    isTargetNodeSet,
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow
  ) => {
    if (isAnimating) return;
    switch (true) {
      case !isStartNodeSet && row !== targetNodeRow && col !== targetNodeCol:
        return selectNode(NodeType.START, row, col);
      case !isTargetNodeSet && row !== startNodeRow && col !== startNodeCol:
        return selectNode(NodeType.TARGET, row, col);
      case row === startNodeRow && col === startNodeCol:
        return deselectNode(NodeType.START, row, col);
      case row === targetNodeRow && col === targetNodeCol:
        return deselectNode(NodeType.TARGET, row, col);
      case isWallToggled:
        return handleWall(NodeType.WALL, row, col);
      case !isWallToggled:
        return handleWall(NodeType.WEIGHTED, row, col);
    }
  };

  const handleMouseEnter = (
    row,
    col,
    startNodeCol,
    startNodeRow,
    isWallToggled,
    isStartNodeSet,
    isTargetNodeSet
  ) => {
    if (
      (col === startNodeCol && row === startNodeRow) ||
      (col === targetNodeCol && row === targetNodeRow) ||
      !mouseIsPressed
    ) {
      return;
    }
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled) {
      const newGrid = useGetNewGridFor(NodeType.WALL, row, col);
      setGrid(newGrid);
    }
    if ((isStartNodeSet || isTargetNodeSet) && !isWallToggled) {
      const newGrid = useGetNewGridFor(NodeType.WEIGHTED, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return {
    initialiseGrid,
    startNodeCol,
    startNodeRow,
    isStartNodeSet,
    targetNodeCol,
    targetNodeRow,
    isTargetNodeSet,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
};
