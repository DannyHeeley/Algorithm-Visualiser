import { Node } from "../Node/Node";
import { useMouseEvents } from "../../useMouseEvents";


export const Grid = ({ gridState, setGridState }) => {
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents();
  const gridMode = gridState.mode;
  const randomUnsortedValues = gridState.randomUnsortedValues;
  return (
    <div className="grid-container">
      {
        gridState.grid.map((row, rowId) => (
          <div key={rowId}>
            {
              row.map((node, nodeId) => {
                return (
                  <Node
                    key={nodeId}
                    gridMode={gridMode}
                    randomUnsortedValues={randomUnsortedValues}
                    node={{ ...node }}
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
                  ></Node>
                );
              })
            }
          </div>
        ))
      }
    </div>
  );
};


