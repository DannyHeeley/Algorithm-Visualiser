import { useState } from "react";
import PropTypes from "prop-types";

import { useGridComponent } from "./Grid";
import { getNodesInShortestPathOrder } from "../../algorithms/dijkstra/dijkstra.js";

export const useButtons = () => {
  console.log("UseButtons");
  const [toggleText, setToggleText] = useState("Draw Walls");
  const [wallType, setWallType] = useState("wall-type-wall");
  const [needsReset, setNeedsReset] = useState(false);

  const {
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow,
    isStartNodeSet,
    isTargetNodeSet,
  } = useGridComponent();

  const ToggleAlgorithm = ({
    algorithms,
    isAnimating,
    setAnimation,
    algorithmName,
    setAlgorithm,
    setAlgorithmName,
  }) => {
    const changeAlgorithm = () => {
      if (isAnimating || needsReset) return;
      if (algorithmName === "DIJKSTRA'S") {
        setAlgorithmName("A*");
        setAlgorithm(() => algorithms.aStar.algorithm);
        setAnimation(() => algorithms.aStar.animation);
      } else if (algorithmName === "A*") {
        setAlgorithmName("DIJKSTRA'S");
        setAlgorithm(() => algorithms.dijkstra.algorithm);
        setAnimation(() => algorithms.dijkstra.animation);
      }
    };
    return (
      <div className="toggle-algorithm">
        <button className="toggle-algorithm-button" onClick={changeAlgorithm}>
          &#129518;
        </button>
        <div className="algorithm-text">Algorithm: {algorithmName}</div>
      </div>
    );
  };

  ToggleAlgorithm.propTypes = {
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
    isAnimating: PropTypes.bool.isRequired,
    setAnimation: PropTypes.func.isRequired,
    algorithmName: PropTypes.string.isRequired,
    setAlgorithm: PropTypes.func.isRequired,
    setAlgorithmName: PropTypes.func.isRequired,
  };

  const ToggleWall = ({ setIsWallToggled, isAnimating }) => {
    const toggleWallType = (toggleText) => {
      if (isAnimating || needsReset) return;
      if (toggleText === "Draw Walls") {
        setToggleText("Draw Weight");
        setWallType("wall-type-weight");
      } else if (toggleText === "Draw Weight") {
        setToggleText("Draw Walls");
        setWallType("wall-type-wall");
      }
      setIsWallToggled((prevState) => !prevState);
    };
    return (
      <div className="toggle-wall">
        <button className={wallType} onClick={toggleWallType}>
          <div className="">&#9999;&#65039;</div>
        </button>
        <div className="toggle-text">{toggleText}</div>
      </div>
    );
  };

  ToggleWall.propTypes = {
    setIsWallToggled: PropTypes.func.isRequired,
    isAnimating: PropTypes.bool.isRequired,
  };

  const ResetButton = ({ setGrid, isAnimating, initialiseGrid }) => {
    return (
      <button
        className="reset"
        onClick={() => {
          if (isAnimating) return;
          setGrid(initialiseGrid());
          setNeedsReset(false);
        }}
      >
        Reset ⭯
      </button>
    );
  };

  ResetButton.propTypes = {
    setGrid: PropTypes.func.isRequired,
    isAnimating: PropTypes.bool.isRequired,
    initialiseGrid: PropTypes.func.isRequired,
  };

  const VisualiseButton = ({
    fps,
    grid,
    algorithm,
    algorithmAnimation,
    isAnimating,
    setIsAnimating,
    nodeRefs,
  }) => {
    const visualiseAlgorithm = () => {
      if (!isStartNodeSet || !isTargetNodeSet) return;
      if (isAnimating || needsReset) return;
      setIsAnimating(true);
      setNeedsReset(true);
      setTimeout(() => {
        const startNode = grid[startNodeRow]?.[startNodeCol];
        const targetNode = grid[targetNodeRow]?.[targetNodeCol];
        const visitedNodesInOrder = algorithm(grid, startNode, targetNode);
        const nodesInShortestPathOrder =
          getNodesInShortestPathOrder(targetNode);
        algorithmAnimation(
          visitedNodesInOrder,
          nodesInShortestPathOrder,
          setIsAnimating,
          fps,
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
    fps: PropTypes.number.isRequired,
    grid: PropTypes.array.isRequired,
    algorithm: PropTypes.func.isRequired,
    algorithmAnimation: PropTypes.func.isRequired,
    isAnimating: PropTypes.bool.isRequired,
    setIsAnimating: PropTypes.func.isRequired,
    nodeRefs: PropTypes.object.isRequired,
  };

  return {
    ToggleAlgorithm,
    ToggleWall,
    ResetButton,
    needsReset,
    VisualiseButton,
  };
};
