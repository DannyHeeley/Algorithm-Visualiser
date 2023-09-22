import { initialiseNode } from "./Node/Node";

const useGetNewGridFor = (gridType, grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    [gridType]: !node[gridType],
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const useInitialiseGrid = (
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

const GridType = {
  IS_START: "isStart",
  IS_TARGET: "isTarget",
  IS_WALL: "isWall",
  IS_WEIGHT: "isWeight",
};

export { useGetNewGridFor, useInitialiseGrid, GridType };
