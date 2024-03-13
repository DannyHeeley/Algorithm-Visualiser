import { nodeIsAStartOrTarget } from '../Components/Node/NodeHelper.js';

// BAD PRACTICE TO DO THIS IN REACT,
// TODO: NEED TO REWRITE TO USE REACT VIRTUAL DOM 
// THIS IS ALSO STOPPING THE ABILITY TO RESET THE ANIMATION PROPERLY

export const algorithmAnimation = (
  visitedNodesInOrder,
  shortestPathNodesInOrder,
  animationSpeed,
  nodeRefs
) => {
  let intervalID;
  let i = 0;
  function animate() {
    //If we have been through all the nodes
    if (i >= visitedNodesInOrder.length) {
      // Cancel the animation
      clearInterval(intervalID)
      // Animate the shortest path
      animateShortestPath(shortestPathNodesInOrder, nodeRefs);
      return;
    }
    const node = visitedNodesInOrder[i];
    updateCurrentNode(node, nodeRefs);
    i++;
  }
  const animationInterval = 1000 / animationSpeed;
  // Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
  intervalID = setInterval(animate, animationInterval)
}

const animateShortestPath = (nodesInShortestPathOrder, nodeRefs) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (nodeIsAStartOrTarget(node)) return;
      if (node.isWeighted) {
        nodeRefs.current[node.row][node.col].className = "node node-weighted-shortest-path";
      } else {
        nodeRefs.current[node.row][node.col].className = "node node-shortest-path";
      }
    }, 50 * i);
  }
};

function updateCurrentNode(node, nodeRefs) {
  if (!nodeIsAStartOrTarget(node) && !node.isWeighted) {
    nodeRefs.current[node.row][node.col].className = "node node-visited";
  }
}