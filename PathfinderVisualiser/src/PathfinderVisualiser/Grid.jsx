import { useState } from "react";
import { initialiseNode } from "./Node/Node";

export const useGridComponent = (grid, setGrid, isWallToggled, isAnimating) => {
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [isStartNodeSet, setIsStartNodeSet] = useState(true);
  const [targetNodeRow, setTargetNodeRow] = useState(10);
  const [targetNodeCol, setTargetNodeCol] = useState(35);
  const [isTargetNodeSet, setIsTargetNodeSet] = useState(true);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

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
    setStartNodeRow(row);
    setStartNodeCol(col);
    const newGrid = useGetNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    if (nodeType === NodeType.START) {
      setIsStartNodeSet((prevState) => {
        return !prevState;
      });
      return;
    }
    if (nodeType === NodeType.TARGET) {
      setIsTargetNodeSet((prevState) => {
        return !prevState;
      });
      return;
    }
  }
  function deselectNode(nodeType, row, col) {
    const newGrid = useGetNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    if (nodeType === NodeType.START) {
      setIsStartNodeSet((prevState) => {
        return !prevState;
      });
      return;
    }
    if (nodeType === NodeType.TARGET) {
      setIsTargetNodeSet((prevState) => {
        return !prevState;
      });
      return;
    }
  }
  function handleWall(nodeType, row, col) {
    const newGrid = useGetNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseDown = (row, col) => {
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

  const handleMouseEnter = (row, col) => {
    if (col === startNodeCol && row === startNodeRow) {
      return;
    }
    if (!mouseIsPressed) return;
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

  const NodeType = {
    START: "isStart",
    TARGET: "isTarget",
    WALL: "isWall",
    WEIGHTED: "isWeighted",
  };

  return {
    initialiseGrid,
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};
