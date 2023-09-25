import React, { useState, useEffect } from "react";
import { Node } from "./Node/Node";
import { useInitialiseGrid, useGetNewGridFor, GridType } from "./Grid";
import { getNodesInShortestPathOrder } from "../algorithms/dijkstra/dijkstra.js";
import { animateDijkstra } from "../algorithms/dijkstra/dijkstraAnimation";

import "./PathfinderVisualiser.css";

export default function PathfinderVisualiser({ algorithm }) {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [isStartNodeSet, setIsStartNodeSet] = useState(true);
  const [targetNodeRow, setTargetNodeRow] = useState(10);
  const [targetNodeCol, setTargetNodeCol] = useState(35);
  const [isTargetNodeSet, setIsTargetNodeSet] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [toggleText, setToggleText] = useState("Draw Walls");
  const [isWallToggled, setIsWallToggled] = useState(true);
  const [wallType, setWallType] = useState("wall-type-wall");

  useEffect(() => {
    const newGrid = useInitialiseGrid(
      startNodeCol,
      startNodeRow,
      targetNodeCol,
      targetNodeRow
    );
    setGrid(newGrid);
  }, [resetCounter]);

  const handleMouseDown = (row, col) => {
    if (row === startNodeRow && col === startNodeCol && isStartNodeSet) {
      return deselectStartNode(row, col);
    } else if (
      row === targetNodeRow &&
      col === targetNodeCol &&
      isTargetNodeSet
    ) {
      return deselectTargetNode(row, col);
    } else if (!isStartNodeSet) {
      return selectStartNode(row, col);
    } else if (!isTargetNodeSet) {
      return selectTargetNode(row, col);
    } else if (isStartNodeSet && isTargetNodeSet && isWallToggled) {
      return handleDrawWalls(row, col);
    } else {
      return handleDrawWeight(row, col);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (col === startNodeCol && row === startNodeRow) {
      return;
    }
    if (!mouseIsPressed) return;
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled) {
      const newGrid = useGetNewGridFor(GridType.IS_WALL, grid, row, col);
      setGrid(newGrid);
    }
    if ((isStartNodeSet || isTargetNodeSet) && !isWallToggled) {
      const newGrid = useGetNewGridFor(GridType.IS_WEIGHT, grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualiseAlgorithm = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const targetNode = grid[targetNodeRow][targetNodeCol];
    const visitedNodesInOrder = algorithm(grid, startNode, targetNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const toggleWallTypeText = () => {
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
    setResetCounter((prevCounter) => prevCounter + 1);
    grid.forEach((row) => {
      row.forEach((node) => {
        node.className = "node";
        node.isWall = false;
      });
    });
  };

  return (
    <div className="app-container">
      <div className="toggle-algorithm">
        <button onClick={null}>+</button>
        <div className="algorithm-text">Algorithm: {algorithm.name}</div>
      </div>
      <div className="toggle-wall">
        <button className={wallType} onClick={toggleWallTypeText}>
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
                isWeight,
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
                  isWeight={isWeight}
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

  function selectStartNode(row, col) {
    setStartNodeRow(row);
    setStartNodeCol(col);
    const newGrid = useGetNewGridFor(GridType.IS_START, grid, row, col);
    setGrid(newGrid);
    setIsStartNodeSet((prevState) => {
      console.log("IsStartNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function deselectStartNode(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_START, grid, row, col);
    setGrid(newGrid);
    setIsStartNodeSet((prevState) => {
      console.log("IsStartNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function selectTargetNode(row, col) {
    setTargetNodeRow(row);
    setTargetNodeCol(col);
    const newGrid = useGetNewGridFor(GridType.IS_TARGET, grid, row, col);
    setGrid(newGrid);
    setIsTargetNodeSet((prevState) => {
      console.log("IsTargetNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function deselectTargetNode(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_TARGET, grid, row, col);
    setGrid(newGrid);
    setIsTargetNodeSet((prevState) => {
      console.log("IsTargetNodeSet:", !prevState);
      return !prevState;
    });
    return;
  }
  function handleDrawWeight(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_WEIGHT, grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }
  function handleDrawWalls(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_WALL, grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }
}
