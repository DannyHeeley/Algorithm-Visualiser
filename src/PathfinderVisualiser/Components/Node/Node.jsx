import React, { forwardRef } from "react";
import "./Node.css";

export const useNode = () => {
  const initialiseNode = (
    col,
    row,
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow
  ) => {
    return {
      col,
      row,
      isStart: row === startNodeRow && col === startNodeCol,
      isTarget: row === targetNodeRow && col === targetNodeCol,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      isWeighted: false,
      previousNode: null,
      gScore: row == startNodeRow && col === startNodeCol ? 0 : Infinity,
      fScore: Infinity,
      cameFrom: null,
    };
  };

  const NodeComponent = (
    {
      col,
      row,
      isTarget,
      isStart,
      isWall,
      isWeighted,
      isVisited,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    },
    nodeRef
  ) => {
    const extraClassName = isTarget
      ? "node-target"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : isVisited
      ? "node-visited"
      : isWeighted
      ? "node-weighted"
      : "node";
    return (
      <div
        ref={nodeRef}
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  };

  const Node = React.memo(forwardRef(NodeComponent));

  return {
    initialiseNode,
    Node,
  };
};
