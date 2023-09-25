const animateDijkstra = (
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  setIsAnimating
) => {
  let i = 0;
  function frame() {
    if (i >= visitedNodesInOrder.length) {
      animateShortestPath(nodesInShortestPathOrder);
      setIsAnimating((prevState) => !prevState);
      return;
    }
    const node = visitedNodesInOrder[i];
    if (!isStartOrTarget(node) && !node.isWeighted) {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }
    i++;
    requestAnimationFrame(frame);
  }
  frame();
};

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (isStartOrTarget(node)) return;
      if (node.isWeighted) {
document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-weighted-shortest-path";
      } else {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-shortest-path";
      }

    }, 50 * i);
  }
};

const isStartOrTarget = (node) => {
  return node.isStart || node.isTarget;
};

export { animateDijkstra };
