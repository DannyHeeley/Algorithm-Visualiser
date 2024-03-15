import { memo } from "react";
import { extraClassNameFor } from "./NodeHelper.js";

export const Node = memo(({ node, onMouseDown, onMouseEnter, onMouseUp }) => {
      return (
        <div
          id={`node-${node.row}-${node.col}`}
          className={`node ${extraClassNameFor(node)}`}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseUp={onMouseUp}
        >
          {
            // JSX Conditional rendering
            node.distance !== Infinity && (<div className="djisktras-map-value">{`${node.distance}`}</div>)
          }
        </div>
      );
  }
);

// TODO: Implement the below bad attempt at flow-map

// const arrow = (node) => {
//   return node.col > node.cameFrom.col
//     ? "&rarr;"
//     : node.col < node.cameFrom.col
//       ? "	&larr;"
//       : node.row < node.cameFrom.row
//         ? "&uarr;"
//         : "&darr;";
// };