//TODO: Merge both A* Algorithms into one, i.e DRY, and just use the different getUnvisitedNeighbour and cost functions 

export function aStar8Way(grid, startNode, targetNode) {
    startNode.gScore = 0; // The cost to reach the neighbouring node from the startNode
    startNode.fScore = cost8Way(startNode, targetNode); // The total cost to reach the targetNode through this particular node - f = g + h
    
    let discoveredNodesList = [startNode]; // Open List
    let visitedNodesList = []; // Closed List
    let visualiseNodesList = []; // List of all nodes that have been evaluated, included the discarded nodes - for the animation
    let prevNode;

    while (discoveredNodesList.length > 0) {
        let currentNode = getNodeWithLowestFScore(discoveredNodesList);
        if (currentNode === targetNode) return result(targetNode, prevNode, currentNode, visualiseNodesList);
        
        moveCurrentNodeFromDiscoveredToVisited(grid, currentNode, discoveredNodesList, visitedNodesList, visualiseNodesList);
        
        // Get a list of the current nodes unvisited neighbouring nodes
        for (let neighbor of getUnvisitedNeighbors8Way(currentNode, grid)) {
            if (visitedNodesList.includes(neighbor)) continue;
            // Distance from startNode to the neighbor through the currentNode
            let tentativeGScore = currentNode.gScore + cost8Way(currentNode, neighbor); 
            // If the neighbor is not in the discoveredNodesList, add it
            if (!discoveredNodesList.includes(neighbor) && !neighbor.isWall) {
                discoveredNodesList.push(neighbor);
            } else if (tentativeGScore >= neighbor.gScore) {
                continue;
            }

            // If we get here, we have found the neighbouring node with the lowest cost
            updateNodeWithLowestCost(neighbor, currentNode, tentativeGScore, targetNode);
            // This line is to link the target node to the previous neighbour so it can be returned with the result
            prevNode = currentNode;
        }
    }
    // If we get here, there is no path
    return null;
}

function updateNodeWithLowestCost(neighbor, currentNode, tentativeGScore, targetNode) {
    neighbor.cameFrom = currentNode;
    neighbor.gScore = tentativeGScore; // The cost to reach the neighbouring node from the startNode
    neighbor.fScore = neighbor.gScore + cost8Way(neighbor, targetNode); // The total cost to reach the targetNode through this particular node
}

function moveCurrentNodeFromDiscoveredToVisited(grid, currentNode, discoveredNodesList, visitedNodesList, visualiseNodesList) {
    if (currentNode.isWall) return;
    discoveredNodesList.splice(discoveredNodesList.indexOf(currentNode), 1);
    visitedNodesList.push(currentNode);
    visualiseNodesList.push(currentNode);
    for (const neighbor of getUnvisitedNeighbors8Way(currentNode, grid)) {
        visualiseNodesList.push(neighbor);
    }
}

function getNodeWithLowestFScore(discoveredNodesList) {
    let currentNode = discoveredNodesList[0];
    for (let i = 1; i < discoveredNodesList.length; i++) {
        // Check if the fScore is lower than currentNode
        if (discoveredNodesList[i].fScore < currentNode.fScore) {
            // Set the currentNode to the the node at this index
            currentNode = discoveredNodesList[i];
        }
    }
    return currentNode;
}

function cost8Way(node1, node2) {
    // Calculate the shortest distance between two nodes (Estimated Distance)
    const distance_x = Math.abs(node1.col - node2.col);
    const distance_y = Math.abs(node1.row - node2.row);
    const d1 = Math.min(distance_x, distance_y);
    return d1 * Math.sqrt(2) + (Math.max(distance_x, distance_y) - d1);
}

function getUnvisitedNeighbors8Way(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    const offsets = [
        { rowOffset: -1, colOffset: 0 },  // Top
        { rowOffset: 1, colOffset: 0 },   // Bottom
        { rowOffset: 0, colOffset: -1 },  // Left
        { rowOffset: 0, colOffset: 1 },   // Right
        { rowOffset: -1, colOffset: -1 }, // Top-left
        { rowOffset: -1, colOffset: 1 },  // Top-right
        { rowOffset: 1, colOffset: -1 },  // Bottom-left
        { rowOffset: 1, colOffset: 1 },   // Bottom-right
    ];

    for (const offset of offsets) {
        const newRow = row + offset.rowOffset;
        const newCol = col + offset.colOffset;
        if (isValidNeighbor(newRow, newCol, grid)) {
            // Check if diagonal movement is allowed
            if (offset.rowOffset !== 0 && offset.colOffset !== 0) {
                // Check if both adjacent horizontal and vertical cells are not walls
                if (!grid[row][newCol].isWall && !grid[newRow][col].isWall) {
                    neighbors.push(grid[newRow][newCol]);
                }
            } else {
                neighbors.push(grid[newRow][newCol]);
            }
        }
    }

    return neighbors.filter(neighbor => !neighbor.isVisited);
}

function isValidNeighbor(row, col, grid) {
    return row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].isWall;
}

function reconstructPath(node) {
    let path = [node];
    while (node.cameFrom) {
        node = node.cameFrom;
        path.unshift(node);
    }
    return path;
}

function result(targetNode, prevNode, currentNode, visualiseNodesList) {
    targetNode.cameFrom = prevNode;
    const shortestPathNodesInOrder = reconstructPath(currentNode);
    const visitedNodesInOrder = visualiseNodesList;
    return [visitedNodesInOrder, shortestPathNodesInOrder];
}
