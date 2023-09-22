import React from "react";
import "./Node.css";

export function initialiseNode(
  col,
  row,
  startNodeCol,
  startNodeRow,
  targetNodeCol,
  targetNodeRow
) {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isTarget: row === targetNodeRow && col === targetNodeCol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeight: false,
    previousNode: null,
  };
}

export function Node({
  col,
  row,
  isTarget,
  isStart,
  isWall,
  isWeight,
  isVisited,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const extraClassName = isTarget
    ? "node-target"
    : isStart
    ? "node-start"
    : isWall
    ? "node-wall"
    : isVisited
    ? "node-visited"
    : isWeight
    ? "node-weight"
    : "node";
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    ></div>
  );
}
