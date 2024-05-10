import { Heap } from 'heap-js';

export const greedyBestFirstSearch = (grid, startNode, targetNode) => {
    const customPriorityComparator = (a, b) => a.priority - b.priority;
    const priorityQueue = new Heap(customPriorityComparator); 
    const visitedNodesInOrder = [];
    const visualiseNodesList = [];
    priorityQueue.push({ node: startNode, priority: estimatedDistance(startNode, targetNode) });
    while (!priorityQueue.isEmpty()) {
        const { node } = priorityQueue.pop();
        if (node.isVisited || node.isWall) continue;
        node.isVisited = true;
        visitedNodesInOrder.push(node);
        if (node === targetNode) return [visualiseNodesList, reconstructPath(targetNode)]
        updateNeighboursGreedy(node, grid, targetNode, priorityQueue, visualiseNodesList);
    }
    return [visualiseNodesList, []]; // No path found
}

const updateNeighboursGreedy = (node, grid, targetNode, priorityQueue, visualiseNodesList) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
        priorityQueue.push({ node: neighbor, priority: estimatedDistance(neighbor, targetNode) });
        visualiseNodesList.push(neighbor);
        for (const neighbor of getUnvisitedNeighbors(node, grid)) {
            visualiseNodesList.push(neighbor);
        }
    }
}

const getUnvisitedNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}

const estimatedDistance = (node1, node2) => {
    // Calculate the shortest distance between two nodes (Estimated Distance)
    const distance_x = Math.abs(node1.col - node2.col);
    const distance_y = Math.abs(node1.row - node2.row);
    const d1 = Math.min(distance_x, distance_y);
    return d1 * Math.sqrt(2) + (Math.max(distance_x, distance_y) - d1);
}

const reconstructPath = (targetNode) => {
  const shortestPathNodesInOrder = [];
  let currentNode = targetNode;
  while (currentNode !== null) {
    shortestPathNodesInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPathNodesInOrder;
}

