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

  const useGetNewGridFor = (gridType, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      [gridType]: !node[gridType],
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

  function selectStartNode(row, col) {
    setStartNodeRow(row);
    setStartNodeCol(col);
    const newGrid = useGetNewGridFor(GridType.IS_START, row, col);
    setGrid(newGrid);
    setIsStartNodeSet((prevState) => {
      console.log("IsStartNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function deselectStartNode(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_START, row, col);
    setGrid(newGrid);
    setIsStartNodeSet((prevState) => {
      console.log("IsStartNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function selectTargetNode(row, col) {
    setTargetNodeRow(row);
    setTargetNodeCol(col);
    const newGrid = useGetNewGridFor(GridType.IS_TARGET, row, col);
    setGrid(newGrid);
    setIsTargetNodeSet((prevState) => {
      console.log("IsTargetNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function deselectTargetNode(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_TARGET, row, col);
    setGrid(newGrid);
    setIsTargetNodeSet((prevState) => {
      console.log("IsTargetNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function handleDrawWeight(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_WEIGHTED, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }
  function handleDrawWalls(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_WALL, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseDown = (row, col) => {
    if (isAnimating) return;
    switch (true) {
      case !isStartNodeSet && row !== targetNodeRow && col !== targetNodeCol:
        return selectStartNode(row, col);
      case !isTargetNodeSet && row !== startNodeRow && col !== startNodeCol:
        return selectTargetNode(row, col);
      case row === startNodeRow && col === startNodeCol:
        return deselectStartNode(row, col);
      case row === targetNodeRow && col === targetNodeCol:
        return deselectTargetNode(row, col);
      case isWallToggled:
        return handleDrawWalls(row, col);
      case !isWallToggled:
        return handleDrawWeight(row, col);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (col === startNodeCol && row === startNodeRow) {
      return;
    }
    if (!mouseIsPressed) return;
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled) {
      const newGrid = useGetNewGridFor(GridType.IS_WALL, row, col);
      setGrid(newGrid);
    }
    if ((isStartNodeSet || isTargetNodeSet) && !isWallToggled) {
      const newGrid = useGetNewGridFor(GridType.IS_WEIGHTED, row, col);
      setGrid(newGrid);
    }
  };
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const GridType = {
    IS_START: "isStart",
    IS_TARGET: "isTarget",
    IS_WALL: "isWall",
    IS_WEIGHTED: "isWeighted",
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
