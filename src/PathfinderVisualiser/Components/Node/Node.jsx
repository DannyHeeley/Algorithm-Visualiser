/* eslint-disable react/prop-types */
import { forwardRef, memo } from "react";

import "./Node.css";

export const Node = memo(
  forwardRef(
    (
      { col, row, onMouseDown, onMouseEnter, onMouseUp, extraClassName },
      nodeRef
    ) => {
      //console.log(`Node ${row}-${col} - onMouseDown`);
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
    }
  )
);
