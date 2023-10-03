import { useState, useEffect } from "react";
import { useNode } from "./Node/Node";

export const useGridComponent = () => {
  const [grid, setGrid] = useState([]);
  const [startNodeRow, setStartNodeRow] = useState(10);
  const [startNodeCol, setStartNodeCol] = useState(15);
  const [isStartNodeSet, setIsStartNodeSet] = useState(true);
  const [targetNodeRow, setTargetNodeRow] = useState(10);
  const [targetNodeCol, setTargetNodeCol] = useState(35);
  const [isTargetNodeSet, setIsTargetNodeSet] = useState(true);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const { initialiseNode, Node } = useNode();

  useEffect(() => {
    const newGrid = initialiseGrid();
    setGrid(newGrid);
  }, []);

  const Grid = ({ isWallToggled, isAnimating, nodeRefs }) => {
    return (
      <div className="grid-container">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx}>
            {row.map((node, nodeIdx) => {
              const {
                row,
                col,
                isTarget,
                isStart,
                isWall,
                isVisited,
                isWeighted,
                mouseIsPressed,
                gScore,
                fScore,
                cameFrom,
              } = node;
              if (!nodeRefs.current[row]) nodeRefs.current[row] = {};
              return (
                <Node
                  ref={(ref) => (nodeRefs.current[row][col] = ref)}
                  key={nodeIdx}
                  row={row}
                  col={col}
                  isTarget={isTarget}
                  isStart={isStart}
                  isWall={isWall}
                  isVisited={isVisited}
                  isWeighted={isWeighted}
                  gScore={gScore}
                  fScore={fScore}
                  cameFrom={cameFrom}
                  mouseIsPressed={mouseIsPressed}
                  onMouseDown={(row, col) =>
                    handleMouseDown(row, col, isWallToggled, isAnimating)
                  }
                  onMouseEnter={(row, col) =>
                    handleMouseEnter(row, col, isWallToggled, isAnimating)
                  }
                  onMouseUp={handleMouseUp}
                ></Node>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const getNewGridFor = (nodeType, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      [nodeType]: !node[nodeType],
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const initialiseGrid = () => {
    return Array.from({ length: 20 }, (_, row) =>
      Array.from({ length: 50 }, (_, col) =>
        initialiseNode(
          col,
          row,
          startNodeCol,
          startNodeRow,
          targetNodeCol,
          targetNodeRow
        )
      )
    );
  };

  function selectNode(nodeType, row, col) {
    const newGrid = getNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    if (nodeType === NodeType.START) {
      setStartNodeCol(col);
      setStartNodeRow(row);
      setIsStartNodeSet((prevState) => !prevState);
      return;
    }
    if (nodeType === NodeType.TARGET) {
      setTargetNodeCol(col);
      setTargetNodeRow(row);
      setIsTargetNodeSet((prevState) => !prevState);
      return;
    }
  }

  function deselectNode(nodeType, row, col) {
    const newGrid = getNewGridFor(nodeType, row, col);
    setGrid(newGrid);
    if (nodeType === NodeType.START) {
      setStartNodeCol(null);
      setStartNodeRow(null);
      setIsStartNodeSet((prevState) => !prevState);
      return;
    }
    if (nodeType === NodeType.TARGET) {
      setTargetNodeCol(null);
      setTargetNodeRow(null);
      setIsTargetNodeSet((prevState) => !prevState);
      return;
    }
  }

  function handleWall(nodeType, row, col) {
    const newGrid = getNewGridFor(nodeType, row, col);
    setGrid(newGrid);
  }

  const handleMouseDown = (row, col, isWallToggled, isAnimating) => {
    if (isAnimating) return;
    setMouseIsPressed(true);
    if (!isStartNodeSet && row !== targetNodeRow && col !== targetNodeCol) {
      return selectNode(NodeType.START, row, col);
    } else if (
      !isTargetNodeSet &&
      row !== startNodeRow &&
      col !== startNodeCol
    ) {
      return selectNode(NodeType.TARGET, row, col);
    } else if (row === startNodeRow && col === startNodeCol) {
      return deselectNode(NodeType.START, row, col);
    } else if (row === targetNodeRow && col === targetNodeCol) {
      return deselectNode(NodeType.TARGET, row, col);
    } else if (isWallToggled) {
      return handleWall(NodeType.WALL, row, col);
    } else if (!isWallToggled) {
      return handleWall(NodeType.WEIGHTED, row, col);
    }
  };

  const handleMouseEnter = (row, col, isWallToggled, isAnimating) => {
    if (
      !mouseIsPressed ||
      isAnimating ||
      (col === startNodeCol && row === startNodeRow) ||
      (col === targetNodeCol && row === targetNodeRow)
    ) {
      return;
    }
    if ((isStartNodeSet || isTargetNodeSet) && isWallToggled) {
      return setGrid(getNewGridFor(NodeType.WALL, row, col));
    } else if ((isStartNodeSet || isTargetNodeSet) && !isWallToggled) {
      return setGrid(getNewGridFor(NodeType.WEIGHTED, row, col));
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  return {
    Grid,
    grid,
    setGrid,
    initialiseGrid,
    startNodeCol,
    startNodeRow,
    targetNodeCol,
    targetNodeRow,
  };
};
const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
};
