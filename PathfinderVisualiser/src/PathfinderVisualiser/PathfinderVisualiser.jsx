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
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const newGrid = useInitialiseGrid(
      startNodeCol,
      startNodeRow,
      targetNodeCol,
      targetNodeRow
    );
    setGrid(newGrid);
  }, [resetCounter]);

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

  const handleMouseDown = (row, col) => {
    console.log(isWallToggled);
    if (isAnimating) return;
    // Only allow placing the start node if it is not set
    if (!isStartNodeSet) {
      if (row !== targetNodeRow || col !== targetNodeCol) {
        return selectStartNode(row, col);
      }
      return;
    }
    // Only allow placing the target node if it is not set
    if (!isTargetNodeSet) {
      if (row !== startNodeRow || col !== startNodeCol) {
        return selectTargetNode(row, col);
      }
      return;
    }
    // If the target node is set, deselect it
    if (row === startNodeRow && col === startNodeCol) {
      return deselectStartNode(row, col);
    }
    // If target node is set, deselect it
    if (row === targetNodeRow && col === targetNodeCol) {
      return deselectTargetNode(row, col);
    }
    if (isWallToggled) {
      return handleDrawWalls(row, col);
    }
    if (!isWallToggled) {
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
      const newGrid = useGetNewGridFor(GridType.IS_WEIGHTED, grid, row, col);
      setGrid(newGrid);
    }
  };
  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

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
    const newGrid = useGetNewGridFor(GridType.IS_WEIGHTED, grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }
  function handleDrawWalls(row, col) {
    const newGrid = useGetNewGridFor(GridType.IS_WALL, grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

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
    setResetCounter((prevCounter) => prevCounter + 1);
    grid.forEach((row) => {
      row.forEach((node) => {
        node.className = "node";
        node.isWall = false;
      });
    });
    setIsAnimating((prevState) => !prevState);
  };

  return (
    <div className="app-container">
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
