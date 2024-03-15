import { startAndTargetNodesSet } from "../Node/NodeHelper.js";

export const VisualiseButton = ({
  algorithm,
  algorithmAnimation,
  gridState,
  setGridState,
}) => {
  const visualiseAlgorithm = () => {
    if (gridState.isAnimating || gridState.needsReset || !startAndTargetNodesSet(gridState)) return;
    toggleIsAnimating(setGridState);
    toggleNeedsReset(setGridState);
    setTimeout(() => {
      const startNode = gridState.grid[gridState.startNodeRow]?.[gridState.startNodeCol];
      const targetNode = gridState.grid[gridState.targetNodeRow]?.[gridState.targetNodeCol];
      const [visitedNodesInOrder, shortestPathNodesInOrder] = algorithm(gridState.grid, startNode, targetNode);
      algorithmAnimation(
        visitedNodesInOrder,
        shortestPathNodesInOrder,
        gridState.animationSpeed,
      );
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

