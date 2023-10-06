import { useNode } from "./Node/Node";
import { useMouseEvents } from "../useMouseEvents";
import PropTypes from "prop-types";

export const Grid = ({
  nodeState,
  setNodeState,
  gridState,
  setGridState,
  nodeRefs,
}) => {
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents();
  const { Node } = useNode();
  const grid = gridState.grid;

  console.log("Grid Mounted");

  if (grid.length === 0) {
    return <div>Loading...</div>;
  } else {
    console.log("GridComponent - Grid is rendering");
    console.log("GridComponent - Grid rendered: ", grid);
  }

  return (
    <div className="grid-container">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
            if (!nodeRefs.current[node.row]) nodeRefs.current[node.col] = {};
            const extraClassName = node.isTarget
              ? "node-target"
              : node.isStart
              ? "node-start"
              : node.isWall
              ? "node-wall"
              : node.isVisited
              ? "node-visited"
              : node.isWeighted
              ? "node-weighted"
              : "";
            return (
              <Node
                ref={(ref) => (nodeRefs.current[node.row][node.col] = ref)}
                key={nodeIdx}
                extraClassName={extraClassName}
                {...node}
                onMouseDown={() =>
                  handleMouseDown(
                    node,
                    nodeState,
                    setGridState,
                    gridState.isWallToggled,
                    gridState.isAnimating,
                    setNodeState
                  )
                }
                onMouseEnter={() =>
                  handleMouseEnter(
                    node,
                    nodeState,
                    gridState.isWallToggled,
                    gridState.isAnimating,
                    setGridState
                  )
                }
                onMouseUp={() => handleMouseUp(setNodeState)}
              ></Node>
            );
          })}
        </div>
      ))}
    </div>
  );
};

Grid.propTypes = {
  nodeState: PropTypes.object.isRequired,
  setNodeState: PropTypes.func.isRequired,
  nodeRefs: PropTypes.object.isRequired,
  gridState: PropTypes.shape({
    isAnimating: PropTypes.bool.isRequired,
    isWallToggled: PropTypes.bool.isRequired,
    grid: PropTypes.array.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
  initialiseGrid: PropTypes.func.isRequired,
};
