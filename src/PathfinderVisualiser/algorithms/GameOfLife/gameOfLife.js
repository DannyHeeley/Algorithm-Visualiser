import { NodeType } from "../../Components/Node/NodeHelper";

export const gameOfLife = (gridState, setGridState) => {
    let currentGrid = gridState.grid;
    const nextGen = () => {
        // Create a copy of the grid
        const nextGenerationGrid = [];
        // Loop through all cells
        for (let rowId = 0; rowId < currentGrid.length; rowId++) {
            const newRow = [];
            for (let colId = 0; colId < currentGrid[rowId].length; colId++) {
                const cell = currentGrid[rowId][colId];
                // Count the number of alive neighbours for each cell
                const numberOfAliveNeighbours = countAliveNeighbours(rowId, colId, currentGrid);
                // Add the cell's next generation to the next generation of the grid with alive or dead state
                if (cellIsAlive(cell, numberOfAliveNeighbours)) {
                    newRow.push({
                        ...cell,
                    });
                    handleGridUpdateClassChange(cell, setGridState, currentGrid);
                }
            }
            nextGenerationGrid.push(newRow);
        }
        return nextGenerationGrid;
    }
    const step = () => {
        // Get the next iteration of the grid
        const nextGenerationGrid = nextGen();
        // Update the gridState (and as a sideEffect, the currentGrid) to the next generation
        currentGrid = nextGenerationGrid;
        return nextGenerationGrid;
    }
    return step;
};

const cellIsAlive = (cell, numberOfAliveNeighbours) => {
    // Assign a value for isAlive (Implementing the rules of life)
    // - Any live cell with fewer than two live neighbors dies, as if by underpopulation. (if alive neighbours is less than 2, cell = 0 (dead))
    // - Any live cell with two or three live neighbors lives on to the next generation. (if alive neightbours is 2 or 3, cell = 1 (alive))
    // - Any live cell with more than three live neighbors dies, as if by overpopulation. (if alive neighbours is more than 3, cell = 0 (dead))
    // - Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. (if alive neighbours is exactly 3, alive neighbours become live cells)
    if (cell.isCell) {
        return numberOfAliveNeighbours === 2 || numberOfAliveNeighbours === 3;
    } else {
        return numberOfAliveNeighbours === 3;
    }
};

const neighbourIsAliveAndWithinGrid = (neighbourRow, neighbourCol, grid) => {
    return neighbourRow >= 0 && neighbourRow < grid.length &&
        neighbourCol >= 0 && neighbourCol < grid[neighbourRow].length &&
        grid[neighbourRow][neighbourCol].isCell;
};

const countAliveNeighbours = (rowId, colId, grid) => {
    const gridDeepCopy = JSON.parse(JSON.stringify(grid));
    let numberOfAliveNeighbours = 0;
    for (let distanceX = -1; distanceX <= 1; distanceX++) {
        for (let distanceY = -1; distanceY <= 1; distanceY++) {
            if (distanceX == 0 && distanceY == 0) continue; // Skip the current cell if it's the current cell
            const neighbourRow = rowId + distanceX;
            const neighbourCol = colId + distanceY;
            if (neighbourIsAliveAndWithinGrid(neighbourRow, neighbourCol, gridDeepCopy)) numberOfAliveNeighbours++;
        }
    }
    return numberOfAliveNeighbours;
};

const handleGridUpdateClassChange = (cell, setGridState, prevGenerationGrid) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(cell, NodeType.CELL, prevGenerationGrid);
      return { ...prevState, grid: newGrid };
    });
};

const getNewGridFor = (oldCell, nodeType, prevGenerationGrid) => {
    const newGrid = prevGenerationGrid.slice();
    const thisCell = newGrid[oldCell.row][oldCell.col];
    const newCell = {
        ...thisCell,
        [nodeType]: !thisCell[nodeType],
    };
    newGrid[oldCell.row][oldCell.col] = newCell;
    return newGrid;
};
