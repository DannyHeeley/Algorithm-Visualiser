import { nodeIsAStartOrTarget } from '../Components/Node/NodeHelper.js';
//import { gsap } from "gsap";

export const algorithmAnimation = (
  visitedNodesInOrder,
  shortestPathNodesInOrder,
  animationSpeed,
) => {
  let intervalID;
  let i = 0;
  function animate() {
    //If we have been through all the nodes
    if (i >= visitedNodesInOrder.length) {
      // Cancel the animation
      clearInterval(intervalID)
      // Animate the shortest path
      animateShortestPath(shortestPathNodesInOrder);
      return;
    }
    const node = visitedNodesInOrder[i];
    updateCurrentNode(node);
    i++;
  }
  const animationInterval = 1000 / animationSpeed;
  // Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
  intervalID = setInterval(animate, animationInterval)
}

// BAD PRACTICE TO DO THIS IN REACT,
// TODO: NEED TO REWRITE TO USE GSAP. Can then use gsap.context(), revert for reset, and kill for pause.
// THIS IS ALSO STOPPING THE ABILITY TO RESET THE ANIMATION PROPERLY
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

function updateCurrentNode(node) {
  if (!nodeIsAStartOrTarget(node) && !node.isWeighted) {
    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
  }
}
