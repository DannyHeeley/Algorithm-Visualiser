import { nodeIsAStartOrTarget } from '../../Components/Node/NodeHelper.js';

export const animatePathfinding = (
  visitedNodesInOrder,
  shortestPathNodesInOrder,
  gridState
) => {
  let i = 0;
  let intervalID;
  const timeDelay = 1000 / gridState.animationSpeed;

  const animate = () => {
    const node = visitedNodesInOrder[i];
    //If we have been through all the nodes
    if (i >= visitedNodesInOrder.length) {
      // Stop the animation and animate the shortest path
      clearInterval(intervalID);
      animateShortestPath(shortestPathNodesInOrder);
      return;
    }
    updateCurrentNode(node);
    i++;
  }

  // Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
  intervalID = setInterval(animate, timeDelay); // Repeatedly calls a function with a fixed time delay between each call
};

// BAD PRACTICE TO DO THIS IN REACT,
// TODO: NEED TO REWRITE TO USE SOMETHING OTHER THAN DIRECT DOM MANIPULATION.
const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (nodeIsAStartOrTarget(node)) return;
      if (node.isWeighted) {
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-weighted-shortest-path";
      } else {      
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }
    }, 50 * i);
  }
};

const updateCurrentNode = (node) => {
  if (!nodeIsAStartOrTarget(node) && !node.isWeighted) {
    //node.isVisited = !node.isVisited;
    document.getElementById(`node-${node.row}-${node.col}`).className = "node isVisited";
  }
};
