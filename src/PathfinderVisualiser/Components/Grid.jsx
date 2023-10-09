import { Node } from "./Node/Node";
import { useMouseEvents } from "../useMouseEvents";
import PropTypes from "prop-types";

export const Grid = ({
  gridState,
  setGridState,
  nodeState,
  setNodeState,
  nodeRefs,
}) => {
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents();

  if (gridState.grid.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-container">
      {gridState.grid.map((row, rowIdx) => (
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
                onMouseDown={() => {
                  handleMouseDown(
                    node,
                    nodeState,
                    setNodeState,
                    gridState,
                    setGridState
                  );
                }}
                onMouseEnter={() => {
                  handleMouseEnter(node, nodeState, gridState, setGridState);
                }}
                onMouseUp={() => {
                  handleMouseUp(setNodeState);
                }}
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
};
