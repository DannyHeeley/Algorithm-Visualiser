import { useEffect, useState } from "react";

import PathfinderVisualiser from "./PathfinderVisualiser/PathfinderVisualiser";
import { dijkstra } from "./algorithms/dijkstra/dijkstra";
import { aStar } from "./algorithms/aStar/aStar.js";
import { animateAStar } from "./algorithms/aStar/aStarAnimation";
import { animateDijkstra } from "./algorithms/dijkstra/dijkstraAnimation";

import "./App.css";
import "./PathfinderVisualiser/Components/Node/Node.css";
import "./PathfinderVisualiser/PathfinderVisualiser.css";
import "./PathfinderVisualiser/Components/Buttons/Buttons.css";
import "./PathfinderVisualiser/Components/Legend.css";

const App = () => {
  const [gridState, setGridState] = useState({
    grid: [],
    isAnimating: false,
    fps: 60,
    needsReset: false,
    isWallToggled: true,
    algorithmNameText: "DIJKSTRA'S",
    gridInitialised: false,
  });

  const [nodeState, setNodeState] = useState({
    startNodeRow: 10,
    startNodeCol: 15,
    isStartNodeSet: true,
    targetNodeRow: 10,
    targetNodeCol: 35,
    isTargetNodeSet: true,
    mouseIsPressed: false,
  });

  const [algorithms, setAlgorithms] = useState({
    dijkstra: { algorithm: dijkstra, animation: animateDijkstra },
    aStar: { algorithm: aStar, animation: animateAStar },
    currentAlgorithm: dijkstra,
    currentAnimation: animateDijkstra,
  });

  useEffect(() => {
    const newGrid = initialiseGrid(nodeState);
    setGridState((prevGridState) => ({
      ...prevGridState,
      grid: newGrid,
      gridInitialised: true,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <PathfinderVisualiser
        algorithms={algorithms}
        setAlgorithms={setAlgorithms}
        nodeState={nodeState}
        setNodeState={setNodeState}
        gridState={gridState}
        setGridState={setGridState}
        initialiseGrid={initialiseGrid}
      ></PathfinderVisualiser>
    </div>
  );
};

const initialiseGrid = (nodeState) => {
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

const initialiseNode = (col, row, isStart, isTarget, gScore) => {
  return {
    col,
    row,
    isStart,
    isTarget,
    isWall: false,
    isWeighted: false,
    isVisited: false,
    distance: Infinity,
    previousNode: null,
    gScore,
    fScore: Infinity,
    cameFrom: null,
  };
};

export default App;
