import { memo } from "react";

export const Node = memo(({col, row, onMouseDown, onMouseEnter, onMouseUp, extraClassName}) => {
      return (
        <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
      ></div>
    );
  }
);
