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

function selectStartNode(row, col) {
  setStartNodeRow(row);
  setStartNodeCol(col);
  const newGrid = useGetNewGridFor(GridType.IS_START, grid, row, col);
  setGrid(newGrid);
  setIsStartNodeSet((prevState) => {
    console.log("IsStartNodeSet:", !prevState);
    return !prevState;
  });
  return;
}
function deselectStartNode(row, col) {
  const newGrid = useGetNewGridFor(GridType.IS_START, grid, row, col);
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
  const newGrid = useGetNewGridFor(GridType.IS_TARGET, grid, row, col);
  setGrid(newGrid);
  setIsTargetNodeSet((prevState) => {
    console.log("IsTargetNodeSet:", !prevState);
    return !prevState;
  });
  return;
}
function deselectTargetNode(row, col) {
  const newGrid = useGetNewGridFor(GridType.IS_TARGET, grid, row, col);
  setGrid(newGrid);
  setIsTargetNodeSet((prevState) => {
    console.log("IsTargetNodeSet:", !prevState);
    return !prevState;
  });
  return;
}
function handleDrawWeight(row, col) {
  const newGrid = useGetNewGridFor(GridType.IS_WEIGHTED, grid, row, col);
  setGrid(newGrid);
  setMouseIsPressed(true);
}
function handleDrawWalls(row, col) {
  const newGrid = useGetNewGridFor(GridType.IS_WALL, grid, row, col);
  setGrid(newGrid);
  setMouseIsPressed(true);
}

const GridType = {
  IS_START: "isStart",
  IS_TARGET: "isTarget",
  IS_WALL: "isWall",
  IS_WEIGHTED: "isWeighted",
};

export {
  useGetNewGridFor,
  useInitialiseGrid,
  selectStartNode,
  selectTargetNode,
  deselectStartNode,
  deselectTargetNode,
  handleDrawWalls,
  handleDrawWeight,
  GridType,
};
