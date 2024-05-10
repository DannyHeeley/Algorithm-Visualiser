export const dijkstra = (grid, startNode, targetNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length) {
        // TODO: using a priority queue and optimizing the neighbor update process can achieve better performance
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return [visitedNodesInOrder, reconstructPathDjikstra(targetNode)];
        //closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === targetNode) return [visitedNodesInOrder, reconstructPathDjikstra(targetNode)]
        updateNeighbors(closestNode, grid);
    }
};

const updateNeighbors = (node, grid) => {
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        let potentialCostOfPathFromStartNode = node.distance + (neighbor.isWeighted ? 1.3: 1);
        if (potentialCostOfPathFromStartNode < neighbor.distance && !neighbor.isVisited) {
            neighbor.distance = potentialCostOfPathFromStartNode;
            neighbor.previousNode = node;
        }
    }
};

const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors
};

const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
};

const reconstructPathDjikstra = (targetNode) => {
  const shortestPathNodesInOrder = [];
  let currentNode = targetNode;
  while (currentNode !== null) {
    shortestPathNodesInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodesInOrder;
};