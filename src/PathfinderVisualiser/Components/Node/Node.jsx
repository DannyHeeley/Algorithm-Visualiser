import { forwardRef, memo } from "react";

export const Node = memo(
  forwardRef(
    (
      { col, row, onMouseDown, onMouseEnter, onMouseUp, extraClassName },
      nodeRef
    ) => {
      return (
        <div
          // This ref is passed back to the parent (Grid component)
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
