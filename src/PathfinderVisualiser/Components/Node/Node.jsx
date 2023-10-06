/* eslint-disable react/prop-types */
import React, { forwardRef } from "react";

import "./Node.css";

export const useNode = () => {
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
    Node,
  };
};
