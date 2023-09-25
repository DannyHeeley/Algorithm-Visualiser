import React, { useState } from "react";
import "./App.css";
import PathfinderVisualiser from "./PathfinderVisualiser/PathfinderVisualiser";
import { dijkstra } from "./algorithms/dijkstra/dijkstra";
import { aStar } from "./algorithms/aStar/aStar.js";

function App() {
  const algorithms = {
    dijkstra: dijkstra,
    aStar: aStar,
  };
  return (
    <div className="app-container">
      <PathfinderVisualiser algorithms={algorithms}></PathfinderVisualiser>
    </div>
  );
}

export default App;
