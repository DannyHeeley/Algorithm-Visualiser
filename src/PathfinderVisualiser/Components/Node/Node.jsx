import { memo } from "react";
import { handleExtraClassNameFor } from "./NodeHelper.js";

// gridMode parameter prevents drawing when set to gameoflife or sorting?
export const Node = memo(
  ({
    node,
    gridMode,
    randomUnsortedValues,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  }) => {
    return (
      <div
        id={`node-${node.row}-${node.col}`}
        className={`node ${handleExtraClassNameFor(
          node,
          gridMode,
          randomUnsortedValues
        )}`}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseUp={onMouseUp}
      ></div>
    );
  }
);

