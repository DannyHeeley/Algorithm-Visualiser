import { startAndTargetNodesSet } from "../Node/NodeHelper.js";

export const VisualiseButton = ({
  gridState,
  setGridState,
  algorithmState
}) => {
  if (gridState.isAnimating || gridState.needsReset || !startAndTargetNodesSet(gridState)) return;
  let visitedNodesInOrder, shortestPathNodesInOrder
  const algorithm = algorithmState.currentAlgorithm;
  const visualiseAlgorithm = () => {
    toggleIsAnimating(setGridState);
    toggleNeedsReset(setGridState);
    setTimeout(() => {
      const startNode = gridState.grid[gridState.startNodeRow]?.[gridState.startNodeCol];
      const targetNode = gridState.grid[gridState.targetNodeRow]?.[gridState.targetNodeCol];
      if (algorithm.name === 'gameOfLife') {
        algorithmState.animation(
          algorithmState.gameOfLife,
          gridState,
          setGridState
        );
      } else {
        [visitedNodesInOrder, shortestPathNodesInOrder] = algorithm(
          gridState.grid,
          startNode,
          targetNode
        );
        algorithmState.animation(
          visitedNodesInOrder,
          shortestPathNodesInOrder,
          gridState
        );
      }
    }, 0);
    toggleIsAnimating(setGridState);
  };
  return (
    <button className="visualise" onClick={visualiseAlgorithm}>
      Visualise Algorithm &#128104;&#127995;&#8205;&#128187;
    </button>
  );
};

function toggleNeedsReset(setGridState) {
  setGridState((prevGridState) => ({
    ...prevGridState,
    needsReset: !prevGridState.needsReset,
  }));
}

function toggleIsAnimating(setGridState) {
  setGridState((prevGridState) => ({
    ...prevGridState,
    isAnimating: !prevGridState.isAnimating,
  }));
}

