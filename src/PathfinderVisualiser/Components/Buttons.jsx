import { useState } from "react";
import PropTypes from "prop-types";
import { getNodesInShortestPathOrder } from "../../algorithms/dijkstra/dijkstra.js";

export const useButtons = () => {
  const [wallTypeText, setWallTypeText] = useState("Draw Walls");
  const [wallType, setWallType] = useState("wall-type-wall");

  console.log("UseButtons mounted");

  const ToggleAlgorithmButton = ({
    algorithms,
    gridState,
    setGridState,
    setAlgorithms,
  }) => {
    const changeAlgorithm = () => {
      if (gridState.isAnimating || gridState.needsReset) return;
      if (gridState.algorithmName === "DIJKSTRA'S") {
        setGridState((prevNodeState) => ({
          ...prevNodeState,
          algorithmAnimation: "A*",
        }));
        setAlgorithms((prevAlgorithmsState) => ({
          ...prevAlgorithmsState,
          currentAlgorithm: algorithms.aStar.algorithm,
          currentAnimation: algorithms.aStar.animation,
        }));
      } else if (gridState.algorithmName === "A*") {
        setGridState((prevNodeState) => ({
          ...prevNodeState,
          algorithmAnimation: "DIJKSTRA'S",
        }));
        setAlgorithms((prevAlgorithmsState) => ({
          ...prevAlgorithmsState,
          currentAlgorithm: algorithms.dijkstra.algorithm,
          currentAnimation: algorithms.dijkstra.animation,
        }));
      }
    };
    return (
      <div className="toggle-algorithm">
        <button className="toggle-algorithm-button" onClick={changeAlgorithm}>
          &#129518;
        </button>
        <div className="algorithm-text">
          Algorithm: {gridState.algorithmName}
        </div>
      </div>
    );
  };

  ToggleAlgorithmButton.propTypes = {
    algorithms: PropTypes.shape({
      dijkstra: PropTypes.shape({
        algorithm: PropTypes.func.isRequired,
        animation: PropTypes.func.isRequired,
      }).isRequired,
      aStar: PropTypes.shape({
        algorithm: PropTypes.func.isRequired,
        animation: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    setAlgorithms: PropTypes.func.isRequired,
    gridState: PropTypes.shape({
      isAnimating: PropTypes.bool.isRequired,
      needsReset: PropTypes.bool.isRequired,
      algorithmName: PropTypes.string.isRequired,
    }).isRequired,
    setGridState: PropTypes.func.isRequired,
  };

  const ToggleWallButton = ({ gridState, setGridState }) => {
    const toggleWallType = (wallTypeText) => {
      if (gridState.isAnimating || gridState.needsReset) return;
      if (wallTypeText === "Draw Walls") {
        setWallTypeText("Draw Weight");
        setWallType("wall-type-weight");
      } else if (wallTypeText === "Draw Weight") {
        setWallTypeText("Draw Walls");
        setWallType("wall-type-wall");
      }
      setGridState((prevNodeState) => ({
        ...prevNodeState,
        isWallToggled: !gridState.isWallToggled,
      }));
    };
    return (
      <div className="toggle-wall">
        <button className={wallType} onClick={toggleWallType}>
          <div className="">&#9999;&#65039;</div>
        </button>
        <div className="toggle-text">{wallTypeText}</div>
      </div>
    );
  };

  ToggleWallButton.propTypes = {
    gridState: PropTypes.shape({
      isAnimating: PropTypes.bool.isRequired,
      needsReset: PropTypes.bool.isRequired,
      isWallToggled: PropTypes.bool.isRequired,
    }).isRequired,
    setGridState: PropTypes.func.isRequired,
  };

  const ResetButton = ({ initialiseGrid, gridState, setGridState }) => {
    return (
      <button
        className="reset"
        onClick={() => {
          if (gridState.isAnimating) return;
          setGridState((prevNodeState) => ({
            ...prevNodeState,
            grid: initialiseGrid(),
            needsReset: false,
          }));
        }}
      >
        Reset ⭯
      </button>
    );
  };

  ResetButton.propTypes = {
    initialiseGrid: PropTypes.func.isRequired,
    gridState: PropTypes.shape({
      isAnimating: PropTypes.bool.isRequired,
      needsReset: PropTypes.bool.isRequired,
    }).isRequired,
    setGridState: PropTypes.func.isRequired,
  };

  const VisualiseButton = ({
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
        const nodesInShortestPathOrder =
          getNodesInShortestPathOrder(targetNode);
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

  return {
    ToggleAlgorithmButton,
    ToggleWallButton,
    ResetButton,
    VisualiseButton,
  };
};
