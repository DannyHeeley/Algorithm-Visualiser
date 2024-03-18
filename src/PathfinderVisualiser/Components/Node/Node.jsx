import { memo } from "react";
import { handleExtraClassNameFor } from "./NodeHelper.js";

export const Node = memo(({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
      return (
        <div
          id={`node-${node.row}-${node.col}`}
          className={`node ${handleExtraClassNameFor(node)}`}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseUp={onMouseUp}
        >
          {
            // JSX Conditional rendering
            //node.distance !== Infinity && (<div className="djisktras-map-value">{`${node.distance}`}</div>)
            // TODO: This is for a cost value displayed on the map but is not correctly implemented
          }
        </div>
      );
  }
);

