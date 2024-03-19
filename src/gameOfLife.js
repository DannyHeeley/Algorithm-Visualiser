export const gameOfLife = ({ gridState }) => {
    const calculateNextGen = () => {
        // Create a copy of the grid
        const grid = gridState.grid.map(row => row.slice());
        // Loop through all cells
        for (let rowId = 0; rowId < grid.length; rowId++) {
            for (let cellId = 0; cellId < grid[rowId].length; cellId++) {
                let numberOfAliveNeighbours = 0;
                // Count the number of alive neighbours
                for (let distanceX = -1; distanceX <= 1; distanceX++) {
                    for (let distanceY = -1; distanceY <= 1; distanceY++) {
                        if (distanceX == 0 && distanceY == 0) continue // Skip the current node
                        const neighbourRow = rowId + distanceX;
                        const neighbourCell = cellId + distanceY;
                        if (neighbourIsAliveAndWithinGrid(neighbourRow, grid, neighbourCell)) numberOfAliveNeighbours++;
                    }	
                }
                // Assign a value for isAlive (Implementing the rules of life)
                    // - Any live cell with fewer than two live neighbors dies, as if by underpopulation. (if alive neighbours is less than 2, c = 0 (dead))
                    // - Any live cell with two or three live neighbors lives on to the next generation. (if alive neightbours is 2 or 3, c = 1 (alive))
                    // - Any live cell with more than three live neighbors dies, as if by overpopulation. (if alive neighbours is more than 3, c = 0 (dead))
                    // - Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction. (if alive neighbours is exactly 3, alive neighbours become live cells)
                grid[rowId][cellId].isAlive = nodeIsAlive(numberOfAliveNeighbours, grid[rowId][cellId].isAlive);;
            }
        }
        //setGridState(prevState => ({ ...prevState, grid }));
        return grid;
    }
    return { calculateNextGen };
}

const nodeIsAlive = (numberOfAliveNeighbours, isAlive) => {
    switch (numberOfAliveNeighbours) {
        case 0:
        case 1:
            isAlive = false;
            break;
        case 2:
            break;
        case 3:
            isAlive = true;
            break;
        default:
            isAlive = false;
    }
    return isAlive;
}

const neighbourIsAliveAndWithinGrid = (neighbourRow, grid, neighbourCell) => {
    return neighbourRow >= 0 && neighbourRow < grid.length &&
        neighbourCell >= 0 && neighbourCell < grid[0].length &&
        grid[neighbourRow][neighbourCell].isAlive;
}

