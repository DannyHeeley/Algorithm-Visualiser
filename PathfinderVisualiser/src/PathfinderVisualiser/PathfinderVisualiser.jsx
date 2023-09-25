import React, { useState, useEffect } from "react";
import { Node } from "./Node/Node";
import { useGridComponent } from "./Grid";
import { getNodesInShortestPathOrder } from "../algorithms/dijkstra/dijkstra.js";
import { animateDijkstra } from "../algorithms/dijkstra/dijkstraAnimation";

import "./PathfinderVisualiser.css";

export default function PathfinderVisualiser({ algorithm }) {
  const [grid, setGrid] = useState([]);
  const [toggleText, setToggleText] = useState("Draw Walls");
  const [isWallToggled, setIsWallToggled] = useState(true);
  const [wallType, setWallType] = useState("wall-type-wall");
  const [isAnimating, setIsAnimating] = useState(false);

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
      const visitedNodesInOrder = algorithm(grid, startNode, targetNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
      animateDijkstra(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        setIsAnimating
      );
    }, 0);
  };

  const toggleWallType = () => {
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

  return (
    <div className="pathfinder-container">
      <div className="app-title">ALGORITHM VISUALISER</div>
      <div className="toggle-algorithm">
        <button onClick={null}>+</button>
        <div className="algorithm-text">Algorithm: {algorithm.name}</div>
      </div>
      <div className="toggle-wall">
        <button className={wallType} onClick={toggleWallType}>
          <div className="no-display">+</div>
        </button>
        <div className="toggle-text">{toggleText}</div>
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
