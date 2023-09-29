import React, { useState } from "react";
import { useDiscreteSlider } from "./Components/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { useButtons } from "./Components/Buttons.jsx";
import { useGridComponent } from "./Grid";
import "./PathfinderVisualiser.css";

export default function PathfinderVisualiser({ algorithms }) {
  const [keyCounter, setKeyCounter] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWallToggled, setIsWallToggled] = useState(true);
  const [algorithmName, setAlgorithmName] = useState("DIJKSTRA'S");
  const [algorithm, setAlgorithm] = useState(
    () => algorithms.dijkstra.algorithm
  );
  const [algorithmAnimation, setAnimation] = useState(
    () => algorithms.dijkstra.animation
  );

  const { Grid, grid, setGrid, initialiseGrid } = useGridComponent();

  const { ToggleAlgorithm, ToggleWall, ResetButton, VisualiseButton } =
    useButtons();

  const { DiscreteSlider, fps } = useDiscreteSlider();

  return (
    <div className="pathfinder-container">
      <div className="app-title">ALGORITHM VISUALISER </div>
      <ToggleAlgorithm
        algorithms={algorithms}
        isAnimating={isAnimating}
        setAnimation={setAnimation}
        algorithmName={algorithmName}
        setAlgorithm={setAlgorithm}
        setAlgorithmName={setAlgorithmName}
      ></ToggleAlgorithm>
      <ToggleWall
        setIsWallToggled={setIsWallToggled}
        isAnimating={isAnimating}
      ></ToggleWall>
      <Legend></Legend>
      <div className="info">
        <span>Click on a start or target node to change its position</span>
      </div>
      <Grid
        keyCounter={keyCounter}
        isWallToggled={isWallToggled}
        isAnimating={isAnimating}
      ></Grid>
      <ResetButton
        setKeyCounter={setKeyCounter}
        setGrid={setGrid}
        isAnimating={isAnimating}
        initialiseGrid={initialiseGrid}
      ></ResetButton>
      <DiscreteSlider isAnimating={isAnimating} />
      <VisualiseButton
        fps={fps}
        grid={grid}
        algorithm={algorithm}
        algorithmAnimation={algorithmAnimation}
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      ></VisualiseButton>
    </div>
  );
}
