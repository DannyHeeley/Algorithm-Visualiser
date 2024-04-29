import { NodeType } from "../Components/Node/NodeHelper";

export const gameOfLife = (gridState, setGridState) => {
    let currentGrid = gridState.grid;
    const nextGen = () => {
        // Create a copy of the grid
        const nextGenerationGrid = [];
        // Loop through all cells
        for (let rowId = 0; rowId < currentGrid.length; rowId++) {
            const newRow = [];
            for (let colId = 0; colId < currentGrid[rowId].length; colId++) {
                const node = currentGrid[rowId][colId];
                // Count the number of alive neighbours for each node
                const numberOfAliveNeighbours = countAliveNeighbours(rowId, colId, currentGrid);
                // Add the node's next generation to the next generation of the grid with alive or dead state
                if (nodeIsAlive(node, numberOfAliveNeighbours)) {
                    newRow.push({
                        ...node,
                    });
                    handleGridUpdateClassChange(node, setGridState, currentGrid);
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

const nodeIsAlive = (node, numberOfAliveNeighbours) => {
    // Assign a value for isWall (Implementing the rules of life)
    // - Any live node with fewer than two live neighbors dies, as if by underpopulation. (if alive neighbours is less than 2, c = 0 (dead))
    // - Any live node with two or three live neighbors lives on to the next generation. (if alive neightbours is 2 or 3, c = 1 (alive))
    // - Any live node with more than three live neighbors dies, as if by overpopulation. (if alive neighbours is more than 3, c = 0 (dead))
    // - Any dead node with exactly three live neighbors becomes a live node, as if by reproduction. (if alive neighbours is exactly 3, alive neighbours become live cells)
    if (node.isWall) {
        return numberOfAliveNeighbours === 2 || numberOfAliveNeighbours === 3;
    } else {
        return numberOfAliveNeighbours === 3;
    }
};

const neighbourIsAliveAndWithinGrid = (neighbourRow, neighbourCol, grid) => {
    return neighbourRow >= 0 && neighbourRow < grid.length &&
        neighbourCol >= 0 && neighbourCol < grid[neighbourRow].length &&
        grid[neighbourRow][neighbourCol].isWall;
};

const countAliveNeighbours = (rowId, colId, grid) => {
    let numberOfAliveNeighbours = 0;
    for (let distanceX = -1; distanceX <= 1; distanceX++) {
        for (let distanceY = -1; distanceY <= 1; distanceY++) {
            if (distanceX == 0 && distanceY == 0) continue; // Skip the current node if it's the current node
            const neighbourRow = rowId + distanceX;
            const neighbourCol = colId + distanceY;
            if (neighbourIsAliveAndWithinGrid(neighbourRow, neighbourCol, grid)) numberOfAliveNeighbours++;
        }
    }
    return numberOfAliveNeighbours;
};

const handleGridUpdateClassChange = (node, setGridState, prevGenerationGrid) => {
    setGridState((prevState) => {
      const newGrid = getNewGridFor(node, NodeType.WALL, prevGenerationGrid);
      return { ...prevState, grid: newGrid };
    });
};

const getNewGridFor = (oldNode, nodeType, prevGenerationGrid) => {
    const newGrid = prevGenerationGrid.slice();
    const thisNode = newGrid[oldNode.row][oldNode.col];
    const newNode = {
        ...thisNode,
        [nodeType]: !thisNode[nodeType],
    };
    newGrid[oldNode.row][oldNode.col] = newNode;
    return newGrid;
};
