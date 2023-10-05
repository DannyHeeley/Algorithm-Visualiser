/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";

import "./Node.css";

export const useNode = () => {
  const initialiseNode = (col, row, isStart, isTarget, gScore) => {
    return {
      col,
      row,
      isStart,
      isTarget,
      isWall: false,
      isWeighted: false,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
      gScore,
      fScore: Infinity,
      cameFrom: null,
    };
  };

  const NodeComponent = (
    { col, row, onMouseDown, onMouseEnter, onMouseUp, extraClassName },
    nodeRef
  ) => {
    return (
      <div
        ref={nodeRef}
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
      ></div>
    );
  };

  const Node = React.memo(forwardRef(NodeComponent));

  return {
    initialiseNode,
    Node,
  };
};
