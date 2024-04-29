import { useEffect, useState } from "react";
import { AlgorithmVisualiser }  from "./PathfinderVisualiser/AlgorithmVisualiser";
import { dijkstra } from "./PathfinderVisualiser/algorithms/dijkstra.js";
import { aStar4Way } from "./PathfinderVisualiser/algorithms/aStar_4Way.js";
import { aStar8Way } from "./PathfinderVisualiser/algorithms/aStar_8Way.js";
import { greedyBestFirstSearch } from "./PathfinderVisualiser/algorithms/greedyBestFirstSearch.js";
import { gameOfLife } from "./PathfinderVisualiser/algorithms/gameOfLife.js";
import { animatePathfinding } from "./PathfinderVisualiser/algorithms/pathfindingAnimation.js";
import { startGameOfLife } from "./PathfinderVisualiser/algorithms/gameOfLifeAnimation.js";
import { initialiseNode } from "./PathfinderVisualiser/Components/Node/NodeHelper";
import { generateRandomUnsortedValues } from "./PathfinderVisualiser/Components/Node/NodeHelper";

import "./App.css";
import "./PathfinderVisualiser/Components/Node/Node.css";
import "./PathfinderVisualiser/AlgorithmVisualiser.css";
import "./PathfinderVisualiser/Components/Buttons/Buttons.css";
import "./PathfinderVisualiser/Components/Legend.css";
import "./PathfinderVisualiser/Components/Grid/Grid.css";
import "./PathfinderVisualiser/Components/Rules.css"

const App = () => {

  const [gridState, setGridState] = useState({
    mode: GridMode.PATHFINDING,
    algorithmNameText: "DIJKSTRA'S",
    grid: [],
    mouseIsPressed: false,
    isStartNodeSet: true,
    isTargetNodeSet: true,
    startNodeRow: 10,
    startNodeCol: 15,
    targetNodeRow: 10,
    targetNodeCol: 35,
    animationSpeed: 60,
    maxGenerations: 50,
    isAnimating: false,
    needsReset: false,
    isWallToggled: true,
    randomUnsortedValues: generateRandomUnsortedValues(),
  });


  const [algorithmState, setAlgorithmState] = useState({
    dijkstra: dijkstra,
    greedyBestFirst: greedyBestFirstSearch,
    aStar4Way: aStar4Way,
    aStar8Way: aStar8Way,
    animatePathfinding: animatePathfinding,
    gameOfLife: gameOfLife,
    startGameOfLife: startGameOfLife,
    currentAlgorithm: dijkstra,
    animation: animatePathfinding,
  });

  useEffect(() => {
    const newGrid = initialiseGrid(gridState);
    setGridState((prevGridState) => ({
      ...prevGridState,
      grid: newGrid,
    }));
  }, []);

  return (
    <div className="app-container">
      <AlgorithmVisualiser
        algorithmState={algorithmState}
        setAlgorithmState={setAlgorithmState}
        gridState={gridState}
        setGridState={setGridState}
        initialiseGrid={initialiseGrid}
      ></AlgorithmVisualiser>
    </div>
  );
};

export const initialiseGrid = (gridState) => {
  return Array.from({ length: 20 }, (_, row) =>
    Array.from({ length: 50 }, (_, col) => {
      return initialiseNode(col, row, gridState);
    })
  );
};

export const GridMode = {
  PATHFINDING: "pathfinding",
  SORTING: "sorting",
  GAMEOFLIFE: "gameoflife"
};

export default App;