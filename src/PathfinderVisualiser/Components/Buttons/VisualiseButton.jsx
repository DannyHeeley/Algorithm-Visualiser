import { gameOfLife } from "../../../gameOfLife.js";
import { startAndTargetNodesSet } from "../Node/NodeHelper.js";

export const VisualiseButton = ({
  algorithm,
  algorithmAnimation,
  gridState,
  setGridState,
  initialiseGrid,
}) => {
  let visitedNodesInOrder, shortestPathNodesInOrder
  const visualiseAlgorithm = () => {
    if (gridState.isAnimating || gridState.needsReset || !startAndTargetNodesSet(gridState)) return;
    toggleIsAnimating(setGridState);
    toggleNeedsReset(setGridState);
    setTimeout(() => {
      const startNode = gridState.grid[gridState.startNodeRow]?.[gridState.startNodeCol];
      const targetNode = gridState.grid[gridState.targetNodeRow]?.[gridState.targetNodeCol];
      if (algorithm !== gameOfLife) {
        // Current pathfinder algorithm
        [visitedNodesInOrder, shortestPathNodesInOrder] = algorithm(
          gridState.grid,
          startNode,
          targetNode
        );
        algorithmAnimation(
          visitedNodesInOrder,
          shortestPathNodesInOrder,
          gridState
        );
      } else {
        const nextGenerationGrid = algorithm(gridState.grid);
        // gameOflife algorithm
        algorithmAnimation(
          visitedNodesInOrder,
          shortestPathNodesInOrder,
          gridState,
        );
      }

    }, 0);
    toggleIsAnimating(setGridState);
    console.log(algorithm)
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

