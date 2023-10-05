import { useState, useEffect } from "react";
import { useNode } from "./Node/Node";
import PropTypes from "prop-types";

export const useGridComponent = () => {
  const [grid, setGrid] = useState([]);
  const [nodeState, setNodeState] = useState({
    startNodeRow: 10,
    startNodeCol: 15,
    isStartNodeSet: true,
    targetNodeRow: 10,
    targetNodeCol: 35,
    isTargetNodeSet: true,
    mouseIsPressed: false,
  });

  const { initialiseNode, Node } = useNode();

  const NodeType = {
    START: "isStart",
    TARGET: "isTarget",
    WALL: "isWall",
    WEIGHTED: "isWeighted",
  };
  useEffect(() => {
    const newGrid = initialiseGrid();
    setGrid(newGrid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialiseGrid = () => {
    console.log("InitialiseGrid");
    return Array.from({ length: 20 }, (_, row) =>
      Array.from({ length: 50 }, (_, col) => {
        const isStart =
          row === nodeState.startNodeRow && col === nodeState.startNodeCol;
        const isTarget =
          row === nodeState.targetNodeRow && col === nodeState.targetNodeCol;
        const gScore =
          row == nodeState.startNodeRow && col === nodeState.startNodeCol
            ? 0
            : Infinity;
        return initialiseNode(col, row, isStart, isTarget, gScore);
      })
    );
  };

  const handleMouseDown = (node, isWallToggled, isAnimating) => {
    if (isAnimating) return;

    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: true,
    }));

    if (!nodeState.isStartNodeSet && node.isTarget) {
      selectNode(node, NodeType.START);
      return;
    } else if (!nodeState.isTargetNodeSet && node.isStart) {
      selectNode(node, NodeType.TARGET);
      return;
    } else if (node.isStart) {
      deselectNode(node, NodeType.START);
      return;
    } else if (node.isTarget) {
      deselectNode(node, NodeType.TARGET);
      return;
    } else if (isWallToggled) {
      handleWall(node, NodeType.WALL);
      return;
    } else if (!isWallToggled) {
      handleWall(node, NodeType.WEIGHTED);
      return;
    }
    console.log(
      "MouseDown: ",
      nodeState.isStartNodeSet,
      nodeState.isTargetNodeSet
    );
  };

  const handleMouseEnter = (node, isWallToggled, isAnimating) => {
    if (
      nodeState.mouseIsPressed &&
      !isAnimating &&
      nodeState.isStartNodeSet &&
      nodeState.isTargetNodeSet
    ) {
      setGrid((prevGrid) => {
        const nodeType = isWallToggled ? NodeType.WALL : NodeType.WEIGHTED;
        const newGrid = getNewGridFor(node, nodeType, prevGrid);
        return newGrid;
      });
    }
  };

  const handleMouseUp = () => {
    setNodeState((prevNodeState) => ({
      ...prevNodeState,
      mouseIsPressed: false,
    }));
  };

  const Grid = ({ isWallToggled, isAnimating, nodeRefs }) => {
    console.log("Grid is rendering");
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
                    handleMouseDown(node, isWallToggled, isAnimating)
                  }
                  onMouseEnter={() =>
                    handleMouseEnter(node, isWallToggled, isAnimating)
                  }
                  onMouseUp={() => handleMouseUp()}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const getNewGridFor = (oldNode, nodeType, prevGrid) => {
    const newGrid = prevGrid.slice();
    const thisNode = newGrid[oldNode.row][oldNode.col];
    const newNode = {
      ...thisNode,
      [nodeType]: !thisNode[nodeType],
    };
    newGrid[oldNode.row][oldNode.col] = newNode;
    return newGrid;
  };

  const selectNode = (node, nodeType) => {
    setGrid((prevGrid) => {
      const newGrid = getNewGridFor(node, nodeType, prevGrid);
      if (node.isStart) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          startNodeCol: node.col,
          startNodeRow: node.row,
          isStartNodeSet: true,
        }));
      }
      if (node.isTarget) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          targetNodeCol: node.col,
          targetNodeRow: node.row,
          isTargetNodeSet: true,
        }));
      }
      return newGrid;
    });
  };

  const deselectNode = (node, nodeType) => {
    setGrid((prevGrid) => {
      const newGrid = getNewGridFor(node, nodeType, prevGrid);
      if (node.isStart) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          startNodeCol: null,
          startNodeRow: null,
          isStartNodeSet: false,
        }));
      }
      if (node.isTarget) {
        setNodeState((prevNodeState) => ({
          ...prevNodeState,
          targetNodeCol: null,
          targetNodeRow: null,
          isTargetNodeSet: false,
        }));
      }
      return newGrid;
    });
  };

  const handleWall = (node, nodeType) => {
    setGrid((prevGrid) => getNewGridFor(node, nodeType, prevGrid));
  };

  Grid.propTypes = {
    isWallToggled: PropTypes.bool.isRequired,
    isAnimating: PropTypes.bool.isRequired,
    nodeRefs: PropTypes.object.isRequired,
  };

  return {
    Grid,
    grid,
    setGrid,
    initialiseGrid,
    ...nodeState,
  };
};
