import { nodeIsAStartOrTarget } from '../Components/Node/NodeHelper.js';

export const algorithmAnimation = (
  visitedNodesInOrder,
  shortestPathNodesInOrder,
  gridState
) => {
  let i = 0;
  let intervalID;
  function animate() {
    //If we have been through all the nodes
    if (i >= visitedNodesInOrder.length) {
      // Animate the shortest path
      clearInterval(intervalID);
      animateShortestPath(shortestPathNodesInOrder);
      return;
    }
    const node = visitedNodesInOrder[i];
    updateCurrentNode(node);
    i++;
  }
  const animationInterval = 1000 / gridState.animationSpeed;
  // Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
  intervalID = setInterval(animate, animationInterval);
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
    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
  }
};