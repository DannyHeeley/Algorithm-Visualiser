//TODO: Merge both A* Algorithms into one, i.e DRY, and just use the different getUnvisitedNeighbour and cost functions

export function aStar4Way(grid, startNode, targetNode) {
    startNode.costOfPathFromStartNode = 0; // The cost to reach the neighbouring node from the startNode
    startNode.distance = estimatedDistance(startNode, targetNode); // The total cost to reach the targetNode through this particular node calculated as f = g + h

    let discoveredNodesList = [startNode]; // Open List
    let visitedNodesList = []; // Closed List
    let visualiseNodesList = []; // List of all nodes that have been evaluated, included the discarded nodes - for the animation
    let prevNode;

    while (discoveredNodesList.length > 0) {
        let currentNode = getNodeWithLowestDistance(discoveredNodesList);
        if (currentNode === targetNode) return result(targetNode, prevNode, currentNode, visualiseNodesList);
        
        moveCurrentNodeFromDiscoveredToVisited(grid, currentNode, discoveredNodesList, visitedNodesList, visualiseNodesList);
        
        // Get a list of the current nodes unvisited neighbouring nodes
        for (let neighbor of getUnvisitedNeighbors4Way(currentNode, grid)) {
            if (visitedNodesList.includes(neighbor)) continue;
            // Distance from startNode to the neighbor through the currentNode
            let potentialCostOfPathFromStartNode = currentNode.costOfPathFromStartNode + (estimatedDistance(currentNode, neighbor) * neighbor.isWeighted ? 1.3 : 0);
            // If the neighbor is not in the discoveredNodesList, add it
            if (!discoveredNodesList.includes(neighbor) && !neighbor.isWall) {
                discoveredNodesList.push(neighbor);
            } else if (potentialCostOfPathFromStartNode >= neighbor.costOfPathFromStartNode) {
                continue;
            }

            // If we get here, we have found the neighbouring node with the lowest cost
            updateNodeWithLowestCost(neighbor, currentNode, potentialCostOfPathFromStartNode, targetNode);
            // This line is to link the target node to the previous neighbour so it can be returned with the result
            prevNode = currentNode;
        }
    }
    // If we get here, there is no path
    return null;
}

function updateNodeWithLowestCost(neighbor, currentNode, potentialCostOfPathFromStartNode, targetNode) {
    neighbor.cameFrom = currentNode;
    neighbor.costOfPathFromStartNode = potentialCostOfPathFromStartNode; // The cost to reach the neighbouring node from the startNode
    neighbor.distance = neighbor.costOfPathFromStartNode + estimatedDistance(neighbor, targetNode); // The total cost to reach the targetNode through this particular node
}

function moveCurrentNodeFromDiscoveredToVisited(grid, currentNode, discoveredNodesList, visitedNodesList, visualiseNodesList) {
    if (currentNode.isWall) return;
    discoveredNodesList.splice(discoveredNodesList.indexOf(currentNode), 1);
    visitedNodesList.push(currentNode);
    visualiseNodesList.push(currentNode);
    for (const neighbor of getUnvisitedNeighbors4Way(currentNode, grid)) {
        visualiseNodesList.push(neighbor);
    }
}

function getNodeWithLowestDistance(discoveredNodesList) {
    let currentNode = discoveredNodesList[0];
    for (let i = 1; i < discoveredNodesList.length; i++) {
        // Check if the distance is lower than currentNode
        if (discoveredNodesList[i].distance < currentNode.distance) {
            // Set the currentNode to the the node at this index
            currentNode = discoveredNodesList[i];
        }
    }
    return currentNode;
}

function estimatedDistance(node1, node2) {
    if (node2.isWall || node1.isWall) return;
    // Calculate the Manhattan distance between two nodes
    let distance_x = Math.abs(node1.col - node2.col);
    let distance_y = Math.abs(node1.row - node2.row);
    return distance_x + distance_y;
}

function getUnvisitedNeighbors4Way(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0 && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]);
    if (col > 0 && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
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
