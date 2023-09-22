import React, { useState, useEffect } from "react";
import { Node, initialiseNode } from "./Node/Node";
import "./PathfinderVisualiser.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

export default function PathfinderVisualiser() {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [isStartNodeSet, setIsStartNodeSet] = useState(true);
  const [targetNodeRow, setTargetNodeRow] = useState(10);
  const [targetNodeCol, setTargetNodeCol] = useState(35);
  const [isTargetNodeSet, setIsTargetNodeSet] = useState(true);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const [isWallToggled, toggleWall] = useState(true);
  const [toggleText, setToggleText] = useState("Draw Walls"); // Initialize state

  useEffect(() => {
    const newGrid = initialiseGrid(
      startNodeCol,
      startNodeRow,
      targetNodeCol,
      targetNodeRow,
      isStartNodeSet,
      isTargetNodeSet
    );
    setGrid(newGrid);
  }, [resetCounter]);

  const GridType = {
    IS_START: "isStart",
    IS_TARGET: "isTarget",
    IS_WALL: "isWall",
    IS_WEIGHT: "isWeight",
  };

  const handleMouseDown = (row, col) => {
    if (col === startNodeCol && row === startNodeRow && isStartNodeSet) {
      const newGrid = getNewGridFor(GridType.IS_START, grid, row, col);
      setGrid(newGrid);
      setIsStartNodeSet((prevState) => {
        console.log("Updated:", !prevState);
        return !prevState;
      });
      return;
    } else if (
      !isStartNodeSet &&
      row != targetNodeRow &&
      col != targetNodeCol
    ) {
      setStartNodeRow(row);
      setStartNodeCol(col);
      const newGrid = getNewGridFor(GridType.IS_START, grid, row, col);
      setGrid(newGrid);
      setIsStartNodeSet((prevState) => {
        console.log("Updated:", !prevState);
        return !prevState;
      });
      return;
    } else if (
      col === targetNodeCol &&
      row === targetNodeRow &&
      isTargetNodeSet &&
      isStartNodeSet
    ) {
      const newGrid = getNewGridFor(GridType.IS_TARGET, grid, row, col);
      setGrid(newGrid);
      setIsTargetNodeSet((prevState) => {
        console.log("Updated:", !prevState);
        return !prevState;
      });
      return;
    } else if (!isTargetNodeSet && row != startNodeRow && col != startNodeCol) {
      setTargetNodeRow(row);
      setTargetNodeCol(col);
      const newGrid = getNewGridFor(GridType.IS_TARGET, grid, row, col);
      setGrid(newGrid);
      setIsTargetNodeSet((prevState) => {
        console.log("Updated:", !prevState);
        return !prevState;
      });
      return;
    }
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled === true) {
      const newGrid = getNewGridFor(GridType.IS_WALL, grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled === false) {
      const newGrid = getNewGridFor(GridType.IS_WEIGHT, grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (col === startNodeCol && row === startNodeRow) {
      return;
    }
    if (!mouseIsPressed) return;
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled === true) {
      const newGrid = getNewGridFor(GridType.IS_WALL, grid, row, col);
      setGrid(newGrid);
    }
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled === false) {
      const newGrid = getNewGridFor(GridType.IS_WEIGHT, grid, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualiseDijkstra = () => {
    const startNode = grid[startNodeRow][startNodeCol];
    const targetNode = grid[targetNodeRow][targetNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const handleToggleText = () => {
    if (toggleText === "Draw Walls") {
      setToggleText("Draw Weight");
    } else if (toggleText === "Draw Weight") {
      setToggleText("Draw Walls");
    }
    toggleWall((prevState) => !prevState);
  };

  const handleReset = () => {
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
      <button onClick={visualiseDijkstra}>
        Visualise Dijkstra's Algorithm
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleToggleText}>Toggle</button>
      <div className="toggle-text">{toggleText}</div>
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
              } = node;
              return (
                <Node
                  key={nodeIdx}
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
                  row={row}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    const node = visitedNodesInOrder[i];
    setTimeout(() => {
      if (isStartOrTarget(node)) return;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, 10 * i);
  }
};

const animateShortestPath = (nodesInShortestPathOrder) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    const node = nodesInShortestPathOrder[i];
    setTimeout(() => {
      if (isStartOrTarget(node)) return;
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-shortest-path";
    }, 50 * i);
  }
};

const isStartOrTarget = (node) => {
  return node.isStart || node.isTarget;
};

const getNewGridFor = (gridType, grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    [gridType]: !node[gridType],
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const initialiseGrid = (
  startNodeCol,
  startNodeRow,
  targetNodeCol,
  targetNodeRow
) =>
  Array.from({ length: 20 }, (_, row) =>
    Array.from({ length: 50 }, (_, col) =>
      initialiseNode(
        col,
        row,
        startNodeCol,
        startNodeRow,
        targetNodeCol,
        targetNodeRow
      )
    )
  );
