export function dijkstra(grid, startNode, targetNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === targetNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
        }
    }

function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        let tentativeDistance = node.distance + (neighbor.isWeighted ? 5 : 1);
        if (tentativeDistance < neighbor.distance) {
            neighbor.distance = tentativeDistance;
            neighbor.previousNode = node;
        }
    }
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

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

// Backtracks from the target node to find the shortest path.
// Only works when called after the dijksta method above. 
export function getNodesInShortestPathOrder(targetNode) {
    const getNodesInShortestPathOrder = [];
    let currentNode = targetNode;
    while (currentNode !== null) {
        getNodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return getNodesInShortestPathOrder;
}