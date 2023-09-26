// implement the A* algorithm for pathfinding visualiser

export function aStar(grid, startNode, targetNode) {
    let openList = [startNode];
    let visitedList = [];
    startNode.gScore = 0;
    startNode.fScore = distanceBetween(startNode, targetNode);

    // While there are nodes in the open list
    while (openList.length > 0) {
        // Find the node with the lowest F score
        let currentNode = openList[0];
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].fScore < currentNode.fScore) {
                currentNode = openList[i];
            }
        }

        // If the current node is the end node, we're done
        if (currentNode === targetNode) {
            return reconstructPath(currentNode);
        }

        // Move the current node from the open list to the closed list
        openList.splice(openList.indexOf(currentNode), 1);
        visitedList.push(currentNode);

        for (let neighbor of getUnvisitedNeighbors(currentNode, grid)) {
            // If the neighbor is already in the closed list, skip it
            if (visitedList.includes(neighbor)) {
                continue;
            }

            // Calculate the tentative G score for the neighbor
            let tentativeGScore = currentNode.gScore + distanceBetween(currentNode, neighbor);

            // If the neighbor is not in the open list, add it
            if (!openList.includes(neighbor)) {
                openList.push(neighbor);
            } else if (tentativeGScore >= neighbor.gScore) {
                // If the tentative G score is not better than the current G score, skip this neighbor
                continue;
            }

            // This path is the best until now. Record it!
            neighbor.cameFrom = currentNode;
            neighbor.gScore = tentativeGScore;
            neighbor.fScore = neighbor.gScore + distanceBetween(neighbor, targetNode);
        }
    }

    // If we get here, there is no path
    return null;
}

function reconstructPath(node) {
    let path = [node];
    while (node.cameFrom) {
        node = node.cameFrom;
        path.unshift(node);
    }
    return path;
}

function distanceBetween(node1, node2) {
    // Calculate the Euclidean distance between two nodes
    let dx = node1.col - node2.col;
    let dy = node1.row - node2.row;
    return Math.sqrt(dx * dx + dy * dy);
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}