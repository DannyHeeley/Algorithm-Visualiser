import { memo } from "react";
import { extraClassNameFor } from "./NodeHelper.js";

export const Node = memo(({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
      node.extraClassNameForAnimation = extraClassNameFor(node);
      return (
        <div
          id={`node-${node.row}-${node.col}`}
          className={`node ${node.extraClassNameForAnimation}`}
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

