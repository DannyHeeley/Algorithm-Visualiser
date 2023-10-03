const animateDijkstra = (
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  setIsAnimating,
  fps,
  nodeRefs
) => {
  let now;
  let then = Date.now();
  const interval = 1000 / fps;
  let i = 0;

  function frame() {
    if (i >= visitedNodesInOrder.length) {
      animateShortestPath(nodesInShortestPathOrder, nodeRefs);
      setIsAnimating((prevState) => !prevState);
      return;
    }

    requestAnimationFrame(frame);
    now = Date.now();
    const delta = now - then;

    if (delta > interval) {
    const node = visitedNodesInOrder[i];
    if (!isStartOrTarget(node) && !node.isWeighted) {
      nodeRefs.current[node.row][node.col].className = "node node-visited";
    }
    then = now - (delta % interval);
    i++;
    }
  }
  frame();
}


const animateShortestPath = (nodesInShortestPathOrder, nodeRefs) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (isStartOrTarget(node)) return;
      if (node.isWeighted) {
        nodeRefs.current[node.row][node.col].className = "node node-weighted-shortest-path";
      } else {
        nodeRefs.current[node.row][node.col].className = "node node-shortest-path";

      }
    }, 50 * i);
  }
};

const isStartOrTarget = (node) => {
  return node.isStart || node.isTarget;
};

export { animateDijkstra };
