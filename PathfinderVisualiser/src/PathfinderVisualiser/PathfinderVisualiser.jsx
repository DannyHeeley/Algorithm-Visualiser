import React, { useState, useEffect } from "react";
import { useNode } from "./Node/Node";
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
  const [algorithmName, setAlgorithmName] = useState("DIJKSTRA'S");
  const [algorithm, setAlgorithm] = useState(() => algorithms.dijkstra);
  const [keyCounter, setKeyCounter] = useState(0);

  const {
    initialiseGrid,
    startNodeCol,
    startNodeRow,
    isStartNodeSet,
    targetNodeCol,
    targetNodeRow,
    isTargetNodeSet,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  } = useGridComponent(grid, setGrid, isWallToggled, isAnimating);

  const { Node } = useNode();

  useEffect(() => {
    const newGrid = initialiseGrid(
      startNodeCol,
      startNodeRow,
      targetNodeCol,
      targetNodeRow
    );
    setGrid(newGrid);
  }, []);

  const visualiseAlgorithm = (grid, isAnimating) => {
    if (isAnimating) return;
    setIsAnimating((prevState) => !prevState);
    setTimeout(() => {
      const startNode = grid[startNodeRow]?.[startNodeCol];
      const targetNode = grid[targetNodeRow]?.[targetNodeCol];
      const visitedNodesInOrder = algorithm(grid, startNode, targetNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
      animateDijkstra(
        visitedNodesInOrder,
        nodesInShortestPathOrder,
        setIsAnimating
      );
    }, 0);
  };

  const toggleWallType = (isAnimating, toggleText, wallType) => {
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

  const changeAlgorithm = (isAnimating, algorithmName, algorithms) => {
    if (isAnimating) return;
    if (algorithmName === "DIJKSTRA'S") {
      setAlgorithmName("A*");
      setAlgorithm(algorithms.aStar);
    } else if (algorithmName === "A*") {
      setAlgorithmName("DIJKSTRA'S");
      setAlgorithm(algorithms.dijkstra);
    }
  };

  return (
    <div className="pathfinder-container">
      <div className="app-title">ALGORITHM VISUALISER </div>
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
      <div className="toggle-wall">
        <button
          className={wallType}
          onClick={() => toggleWallType(isAnimating, toggleText, wallType)}
        >
          <div className="">&#9999;&#65039;</div>
        </button>
        <div className="toggle-text">{toggleText}</div>
      </div>
      <div className="legend">
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
      <div className="info">
        <span>Click on a start or target node to change its position</span>
      </div>
      <div className="grid-container" key={keyCounter}>
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
                  onMouseDown={() =>
                    handleMouseDown(
                      row,
                      col,
                      isAnimating,
                      isWallToggled,
                      isStartNodeSet,
                      isTargetNodeSet,
                      startNodeCol,
                      startNodeRow,
                      targetNodeCol,
                      targetNodeRow
                    )
                  }
                  onMouseEnter={() =>
                    handleMouseEnter(
                      row,
                      col,
                      startNodeCol,
                      startNodeRow,
                      isWallToggled,
                      isStartNodeSet,
                      isTargetNodeSet,
                      mouseIsPressed
                    )
                  }
                  onMouseUp={handleMouseUp}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
      <button
        className="reset"
        onClick={() => {
          setGrid(
            initialiseGrid(
              startNodeCol,
              startNodeRow,
              targetNodeCol,
              targetNodeRow
            ),
            setKeyCounter((prevState) => prevState++)
          );
        }}
      >
        Reset ⭯
      </button>
      <button
        className="visualise"
        onClick={() => visualiseAlgorithm(grid, isAnimating)}
      >
        Visualise Algorithm &#128104;&#127995;&#8205;&#128187;
      </button>
    </div>
  );
}
