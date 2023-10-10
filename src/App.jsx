import { useEffect, useState } from "react";
import { useReducer } from "react";

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
  const [algorithms, setAlgorithms] = useState({
    dijkstra: { algorithm: dijkstra, animation: animateDijkstra },
    aStar: { algorithm: aStar, animation: animateAStar },
    currentAlgorithm: dijkstra,
    currentAnimation: animateDijkstra,
  });

  const initialState = {
    nodeState: {
      startNodeRow: 10,
      startNodeCol: 15,
      isStartNodeSet: true,
      targetNodeRow: 10,
      targetNodeCol: 35,
      isTargetNodeSet: true,
      mouseIsPressed: false,
    },
    gridState: {
      grid: [],
      isAnimating: false,
      fps: 60,
      needsReset: false,
      isWallToggled: true,
      algorithmNameText: "DIJKSTRA'S",
      gridInitialised: false,
    },
  };

  useEffect(() => {
    gridDispatch({ type: ActionType.INITIALISE_GRID, initialiseGrid });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-container">
      <PathfinderVisualiser
        initialState={initialState}
        algorithms={algorithms}
        setAlgorithms={setAlgorithms}
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

const ActionType = {
  TOGGLE_MOUSE: "TOGGLE_MOUSE",
  SELECT_NODE: "SELECT_NODE",
  DESELECT_NODE: "DESELECT_NODE",
  HANDLE_WALL: "HANDLE_WALL",
};
