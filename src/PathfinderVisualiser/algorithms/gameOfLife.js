export const gameOfLife = (gridState) => {
    const calculateNextGen = () => {
        // Create a copy of the grid
        const newGrid = [];
        // Loop through all cells
        for (let rowId = 0; rowId < gridState.grid.length; rowId++) {
            const newRow = [];
            for (let nodeId = 0; nodeId < gridState.grid[rowId].length; nodeId++) {
                const node = gridState.grid[rowId][nodeId];
                // Count the number of alive neighbours for each node
                const numberOfAliveNeighbours = countAliveNeighbours(rowId, nodeId, gridState.grid);
                // Set the state of the node based on the number of alive neighbours (Apply the rules of life)
                newRow.push({
                    ...node,
                    isWall: nodeIsAlive(node, numberOfAliveNeighbours) // Returns true or false
                });
            }
            newGrid.push(newRow);
        }
        return newGrid;
    }
    return calculateNextGen ;
}

const nodeIsAlive = (node, numberOfAliveNeighbours) => {
    // Assign a value for isWall (Implementing the rules of life)
        // - Any live node with fewer than two live neighbors dies, as if by underpopulation. (if alive neighbours is less than 2, c = 0 (dead))
        // - Any live node with two or three live neighbors lives on to the next generation. (if alive neightbours is 2 or 3, c = 1 (alive))
        // - Any live node with more than three live neighbors dies, as if by overpopulation. (if alive neighbours is more than 3, c = 0 (dead))
        // - Any dead node with exactly three live neighbors becomes a live node, as if by reproduction. (if alive neighbours is exactly 3, alive neighbours become live cells)
    switch (numberOfAliveNeighbours) {
        case 0:
        case 1:
            return false;
        case 2:
            break;
        case 3:
            return true;
        default:
            return false;
    }
}

const neighbourIsAliveAndWithinGrid = (neighbourRow, neighbourNode, grid) => {
    return neighbourRow >= 0 && neighbourRow < grid.length &&
        neighbourNode >= 0 && neighbourNode < grid[neighbourRow].length &&
        grid[neighbourRow][neighbourNode].isWall;
}

const countAliveNeighbours = (rowId, nodeId, grid) => {
    let numberOfAliveNeighbours = 0;
    for (let distanceX = -1; distanceX <= 1; distanceX++) {
        for (let distanceY = -1; distanceY <= 1; distanceY++) {
            if (distanceX == 0 && distanceY == 0) continue; // Skip the current node
            const neighbourRow = rowId + distanceX;
            const neighbourNode = nodeId + distanceY;
            if (neighbourIsAliveAndWithinGrid(neighbourRow, neighbourNode, grid)) numberOfAliveNeighbours++;
        }
    }
    return numberOfAliveNeighbours;
}
