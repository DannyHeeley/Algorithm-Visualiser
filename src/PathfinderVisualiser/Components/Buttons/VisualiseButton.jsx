import PropTypes from "prop-types";
import { getNodesInShortestPathOrder } from "../../../algorithms/dijkstra/dijkstra.js";

export const VisualiseButton = ({
  algorithm,
  algorithmAnimation,
  nodeRefs,
  nodeState,
  gridState,
  setGridState,
}) => {
  const visualiseAlgorithm = () => {
    if (!nodeState.isStartNodeSet || !nodeState.isTargetNodeSet) return;
    if (gridState.isAnimating || gridState.needsReset) return;

    setGridState((prevNodeState) => ({
      ...prevNodeState,
      isAnimating: true,
      needsReset: true,
    }));

    setTimeout(() => {
      const startNode =
        gridState.grid[nodeState.startNodeRow]?.[nodeState.startNodeCol];
      const targetNode =
        gridState.grid[nodeState.targetNodeRow]?.[nodeState.targetNodeCol];
      const visitedNodesInOrder = algorithm(
        gridState.grid,
        startNode,
        targetNode
      );
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
      algorithmAnimation(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        setGridState,
        gridState.fps,
        nodeRefs
      );
    }, 0);
  };
  return (
    <button className="visualise" onClick={visualiseAlgorithm}>
      Visualise Algorithm &#128104;&#127995;&#8205;&#128187;
    </button>
  );
};

VisualiseButton.propTypes = {
  algorithm: PropTypes.func.isRequired,
  algorithmAnimation: PropTypes.func.isRequired,
  nodeRefs: PropTypes.object.isRequired,
  nodeState: PropTypes.object.isRequired,
  gridState: PropTypes.shape({
    isAnimating: PropTypes.bool.isRequired,
    needsReset: PropTypes.bool.isRequired,
    grid: PropTypes.array.isRequired,
    fps: PropTypes.number.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
};
