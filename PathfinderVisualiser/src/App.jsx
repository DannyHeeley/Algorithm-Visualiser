import React, { useState } from "react";
import "./App.css";
import PathfinderVisualiser from "./PathfinderVisualiser/PathfinderVisualiser";
import { dijkstra } from "./algorithms/dijkstra/dijkstra";
import { aStar } from "./algorithms/aStar/aStar.js";
import { animateAStar } from "./algorithms/aStar/aStarAnimation";
import { animateDijkstra } from "./algorithms/dijkstra/dijkstraAnimation";

function App() {
  const algorithms = {
    dijkstra: { algorithm: dijkstra, animation: animateDijkstra },
    aStar: { algorithm: aStar, animation: animateAStar },
  };
  return (
    <div className="app-container">
      <PathfinderVisualiser algorithms={algorithms}></PathfinderVisualiser>
    </div>
  );
}

export default App;
