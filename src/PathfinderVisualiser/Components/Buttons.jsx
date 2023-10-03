import React, { useState } from "react";
import { useGridComponent } from "./Grid";
import { getNodesInShortestPathOrder } from "../../algorithms/dijkstra/dijkstra.js";

export const useButtons = () => {
  const [toggleText, setToggleText] = useState("Draw Walls");
  const [wallType, setWallType] = useState("wall-type-wall");
  const [needsReset, setNeedsReset] = useState(false);

  const { startNodeCol, startNodeRow, targetNodeCol, targetNodeRow } =
    useGridComponent();

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
        <button
          className="toggle-algorithm-button"
          onClick={() =>
            changeAlgorithm(isAnimating, algorithmName, algorithms)
          }
        >
          &#129518;
        </button>
        <div className="algorithm-text">Algorithm: {algorithmName}</div>
      </div>
    );
  };

  const ToggleWall = ({ setIsWallToggled, isAnimating }) => {
    const toggleWallType = (isAnimating, toggleText) => {
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
        <button
          className={wallType}
          onClick={() => toggleWallType(isAnimating, toggleText)}
        >
          <div className="">&#9999;&#65039;</div>
        </button>
        <div className="toggle-text">{toggleText}</div>
      </div>
    );
  };

  const ResetButton = ({ setGrid, isAnimating, initialiseGrid }) => {
    return (
      <button
        className="reset"
        onClick={() => {
          if (isAnimating) return;
          setGrid(
            initialiseGrid(),
            setNeedsReset((prevState) => !prevState)
          );
        }}
      >
        Reset ⭯
      </button>
    );
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
      if (startNodeCol === null && startNodeRow === null) return;
      if (targetNodeCol === null && targetNodeRow === null) return;
      if (isAnimating || needsReset) return;
      setIsAnimating((prevState) => !prevState);
      setNeedsReset((prevState) => !prevState);
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
      <button
        className="visualise"
        onClick={() => {
          visualiseAlgorithm();
        }}
      >
        Visualise Algorithm &#128104;&#127995;&#8205;&#128187;
      </button>
    );
  };

  return {
    ToggleAlgorithm,
    ToggleWall,
    ResetButton,
    VisualiseButton,
  };
};
