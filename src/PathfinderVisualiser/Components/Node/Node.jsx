import { forwardRef, memo } from "react";

export const Node = memo(
  forwardRef(
    (
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
    }
  )
);
