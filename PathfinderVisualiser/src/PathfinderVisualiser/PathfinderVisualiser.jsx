import React, { useState, useEffect } from "react";
import { Node, initialiseNode } from "./Node/Node";
import "./PathfinderVisualiser.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

export default function PathfinderVisualiser() {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [targetNodeRow, setTargetNodeRow] = useState(10);
  const [targetNodeCol, setTargetNodeCol] = useState(35);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const [canClick, setCanClick] = useState(true);
  const [resetRequired, setResetRequired] = useState(false);

  useEffect(() => {
    const newGrid = initialiseGrid(
      startNodeCol,
      startNodeRow,
      targetNodeCol,
      targetNodeRow
    );
    setGrid(newGrid);
  }, [resetCounter]);

  const handleMouseDown = (row, col) => {
    if (row === startNodeRow && col === startNodeCol) {
      this.className = "node";
      this.isStart = false;
    }
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const visualiseDijkstra = () => {
    if (!resetRequired) {
      setCanClick(false);
      const startNode = grid[startNodeRow][startNodeCol];
      const targetNode = grid[targetNodeRow][targetNodeCol];
      const visitedNodesInOrder = dijkstra(grid, startNode, targetNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(targetNode);
      animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
      setResetRequired(true);
    }
  };

  const handleReset = () => {
    if (!canClick) return;
    setResetCounter((prevCounter) => prevCounter + 1);
    grid.forEach((row) => {
      row.forEach((node) => {
        node.className = "node";
        node.isWall = false;
      });
    });
    setResetRequired(false);
  };

  return (
    <div className="app-container">
      <button onClick={visualiseDijkstra}>
        Visualise Dijkstra's Algorithm
      </button>
      <button onClick={handleReset}>Reset</button>
      <div
        className="grid-container"
        style={{ pointerEvents: !canClick ? "none" : "auto" }}
      >
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const { row, col, isTarget, isStart, isWall, isVisited } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isTarget={isTarget}
                  isStart={isStart}
                  isWall={isWall}
                  isVisited={isVisited}
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
  setCanClick(true);
};
const isStartOrTarget = (node) => {
  return node.isStart || node.isFinish;
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
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
