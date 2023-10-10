import { Node } from "./Node/Node";
import { useMouseEvents } from "../useMouseEvents";
import PropTypes from "prop-types";

export const Grid = ({ grid, nodeRefs }) => {
  const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents();

  if (grid.length === 0) {
    return <div>Loading...</div>;
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
                onMouseDown={() => {
                  handleMouseDown(node);
                }}
                onMouseEnter={() => {
                  handleMouseEnter(node);
                }}
                onMouseUp={() => {
                  handleMouseUp(node);
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
  grid: PropTypes.array.isRequired,
  nodeRefs: PropTypes.object.isRequired,
};
