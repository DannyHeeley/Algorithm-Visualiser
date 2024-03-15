import { Node } from "./Node/Node";
import { extraClassNameFor } from "./Node/NodeHelper.js";
import { useMouseEvents } from "../useMouseEvents";

export const Grid = ({ gridState, setGridState, nodeRefs }) => {
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents();
  return (
    <div className="grid-container">
      {gridState.grid.map((row, rowIdx) => (

        <div key={rowIdx}>
          
          {row.map((node, nodeIdx) => {

            // Initialises an object to store all the nodes for each individual row
            if (!nodeRefs.current[node.row]) nodeRefs.current[node.col] = {};

            return (
              <Node
                // When it renders a node component, assign a reference to the node.
                // - After React creates the DOM node and puts it on the screen, 
                // - React will set the current property of the ref object to that DOM node.
                ref={(ref) => (nodeRefs.current[node.row][node.col] = ref)}
                key={nodeIdx}
                {...node}

                onMouseDown={() => {
                  if (gridState.isAnimating || gridState.needsReset) return;
                  handleMouseDown(node, gridState, setGridState);
                }}
                onMouseEnter={() => {
                  if (gridState.isAnimating || gridState.needsReset) return;
                  handleMouseEnter(node, gridState, setGridState);
                }}
                onMouseUp={() => {
                  if (gridState.isAnimating || gridState.needsReset) return;
                  handleMouseUp(setGridState);
                }}
                extraClassName={extraClassNameFor(node)}
              ></Node>

            );
          })}
        </div>
      ))
      }
    </div>
  );
};

