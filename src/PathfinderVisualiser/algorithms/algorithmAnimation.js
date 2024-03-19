import { nodeIsAStartOrTarget } from '../Components/Node/NodeHelper.js';

export const algorithmAnimation = (
  visitedNodesInOrder,
  shortestPathNodesInOrder,
  gridState
) => {
  let i = 0;
  let intervalID;
  console.log(gridState.mode)
  if (gridState.mode === "pathfinding") animatePathfinding(visitedNodesInOrder, shortestPathNodesInOrder, intervalID, i);
  if (gridState.mode === "conways") animateConways(gridState);
  const animationInterval = 1000 / gridState.animationSpeed;
  // Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
  intervalID = setInterval(animatePathfinding, animationInterval);
  if (gridState.mode === "conways") {
    setTimeout(() => {
      clearInterval(intervalID);
    }, animationInterval * maxGenerations);
  }
};

const animatePathfinding = (visitedNodesInOrder, shortestPathNodesInOrder, intervalID, i) => {
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
};

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (nodeIsAStartOrTarget(node)) return;
      if (node.isWeighted) {
        // BAD PRACTICE TO DO THIS IN REACT,
        // TODO: NEED TO REWRITE TO USE SOMETHING OTHER THAN DIRECT DOM MANIPULATION.
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-weighted-shortest-path";
      } else {
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }
    }, 50 * i);
  }
};

const animateConways = (gridState) => {
  const calculateNextGeneration = algorithmAnimation;
  const nextGenGrid = calculateNextGeneration(gridState.grid);
  nextGenGrid.forEach((row) => {
        row.forEach((node) => {
            if (cell.isAlive) {
                // Update the appearance of alive cells
                updateCurrentNode(node, "alive");
            } else {
                // Update the appearance of dead cells
                updateCurrentNode(node, "dead");
            }
        });
    });
    setGridState(prevState => ({ ...prevState, grid: nextGenGrid }));
}


const updateCurrentNode = (node) => {
  if (!nodeIsAStartOrTarget(node) && !node.isWeighted) {
    if (gridState.mode === "conways") {
      const className = node.isAlive === true ? "node node-wall" : "node";
      document.getElementById(`node-${node.row}-${node.col}`).className = className
      return;
    }
    // BAD PRACTICE TO DO THIS IN REACT,
    // TODO: NEED TO REWRITE TO USE SOMETHING OTHER THAN DIRECT DOM MANIPULATION.
    document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
  }
};

