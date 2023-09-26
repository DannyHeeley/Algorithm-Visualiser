import React, { useState, useEffect } from "react";
import { Node } from "./Node/Node";
import { useGridComponent } from "./Grid";
import { getNodesInShortestPathOrder } from "../algorithms/dijkstra/dijkstra.js";
import { animateDijkstra } from "../algorithms/dijkstra/dijkstraAnimation";
//import { animateAStar } from "../algorithms/aStar/aStarAnimation";

import "./PathfinderVisualiser.css";

export default function PathfinderVisualiser({ algorithms }) {
  const [grid, setGrid] = useState([]);
  const [toggleText, setToggleText] = useState("Draw Walls");
  const [isWallToggled, setIsWallToggled] = useState(true);
  const [wallType, setWallType] = useState("wall-type-wall");
  const [isAnimating, setIsAnimating] = useState(false);
  const [algorithmName, setAlgorithmName] = useState("Dijkstra");
  const [algorithm, setAlgorithm] = useState(() => algorithms.dijkstra);

  const {
    initialiseGrid,
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = useGridComponent(grid, setGrid, isWallToggled, isAnimating);

  useEffect(() => {
    const newGrid = initialiseGrid(
      startNodeCol,
      startNodeRow,
      targetNodeCol,
      targetNodeRow
    );
    setGrid(newGrid);
  }, []);

  const visualiseAlgorithm = () => {
    if (isAnimating) return;
    setIsAnimating((prevState) => !prevState);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const targetNode = grid[targetNodeRow][targetNodeCol];
      console.log(algorithm);
      const visitedNodesInOrder = algorithm(grid, startNode, targetNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
      console.log(isAnimating);
      animateDijkstra(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        setIsAnimating
      );
      console.log(isAnimating);
    }, 0);
  };

  const toggleWallType = () => {
    console.log(isAnimating);
    if (isAnimating) return;
    if (toggleText === "Draw Walls") {
      setToggleText("Draw Weight");
    } else if (toggleText === "Draw Weight") {
      setToggleText("Draw Walls");
    }
    if (wallType === "wall-type-wall") {
      setWallType("wall-type-weight");
    } else if (wallType === "wall-type-weight") {
      setWallType("wall-type-wall");
    }
    setIsWallToggled((prevState) => !prevState);
  };

  const handleResetButton = () => {
    if (isAnimating) return;
    grid.forEach((row) => {
      row.forEach((node) => {
        node.className = "node";
        node.isWall = false;
      });
    });
    setIsAnimating((prevState) => !prevState);
  };

  const changeAlgorithm = () => {
    if (isAnimating) return;
    if (algorithmName === "Dijkstra") {
      setAlgorithmName("A*");
      setAlgorithm(algorithms.aStar);
    } else if (algorithmName === "A*") {
      setAlgorithmName("Dijkstra");
      setAlgorithm(algorithms.dijkstra);
    }
  };

  return (
    <div className="pathfinder-container">
      <div className="app-title">ALGORITHM VISUALISER</div>
      <div className="toggle-algorithm">
        <button className="toggle-algorithm-button" onClick={changeAlgorithm}>
          +
        </button>
        <div className="algorithm-text">Algorithm: {algorithmName}</div>
      </div>
      <div className="toggle-wall">
        <button className={wallType} onClick={toggleWallType}>
          <div className="no-display">+</div>
        </button>
        <div className="toggle-text">{toggleText}</div>
      </div>
      <div className="legend">
        <h3 className="legend-title">Legend:</h3>
        <div className="legend-item">
          <div className="legend-icon start"></div>
          <p className="legend-text">Start Node</p>
        </div>
        <div className="legend-item">
          <div className="legend-icon target"></div>
          <p className="legend-text">Target Node</p>
        </div>
        <div className="legend-item">
          <div className="legend-icon visited"></div>
          <p className="legend-text">Visited Node</p>
        </div>
        <div className="legend-item">
          <div className="legend-icon shortest"></div>
          <p className="legend-text">Shortest Path</p>
        </div>
        <div className="legend-item">
          <div className="legend-icon wall"></div>
          <p className="legend-text">Walls</p>
        </div>
        <div className="legend-item">
          <div className="legend-icon weighted"></div>
          <p className="legend-text">Weighted Node</p>
        </div>
      </div>
      <div className="grid-container">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const {
                row,
                col,
                isTarget,
                isStart,
                isWall,
                isVisited,
                isWeighted,
                mouseIsPressed,
                gScore,
                fScore,
                cameFrom,
              } = node;
              return (
                <Node
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isTarget={isTarget}
                  isStart={isStart}
                  isWall={isWall}
                  isVisited={isVisited}
                  isWeighted={isWeighted}
                  gScore={gScore}
                  fScore={fScore}
                  cameFrom={cameFrom}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={handleMouseDown}
                  onMouseEnter={handleMouseEnter}
                  onMouseUp={handleMouseUp}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
      <button className="reset" onClick={handleResetButton}>
        Reset
      </button>
      <button className="visualise" onClick={visualiseAlgorithm}>
        Visualise Algorithm
      </button>
    </div>
  );
}
