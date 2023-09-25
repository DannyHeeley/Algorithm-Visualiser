import React, { useState } from "react";
import "./App.css";
import PathfinderVisualiser from "./PathfinderVisualiser/PathfinderVisualiser";
import { dijkstra } from "./algorithms/dijkstra/dijkstra";

function App() {
  return (
    <div className="app-container">
      <PathfinderVisualiser algorithm={dijkstra}></PathfinderVisualiser>
    </div>
  );
}

export default App;
