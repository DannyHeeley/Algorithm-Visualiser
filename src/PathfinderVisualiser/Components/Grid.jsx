import { Node } from "./Node/Node";
import { extraClassNameFor } from "./Node/NodeHelper.js";
import { useMouseEvents } from "../useMouseEvents";

export const Grid = ({ gridState, setGridState }) => {
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents();
  return (
    <div className="grid-container">
      {gridState.grid.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
            return (
              <Node
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

