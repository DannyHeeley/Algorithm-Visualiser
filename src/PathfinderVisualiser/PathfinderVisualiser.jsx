import React, { useState, useRef } from "react";
import { useDiscreteSlider } from "./Components/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { useButtons } from "./Components/Buttons.jsx";
import { useGridComponent } from "./Components/Grid.jsx";
import "./PathfinderVisualiser.css";

export default function PathfinderVisualiser({ algorithms }) {
  const [fps, setFps] = useState(60);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWallToggled, setIsWallToggled] = useState(true);
  const [algorithmName, setAlgorithmName] = useState("DIJKSTRA'S");
  const [algorithm, setAlgorithm] = useState(
    () => algorithms.dijkstra.algorithm
  );
  const [algorithmAnimation, setAnimation] = useState(
    () => algorithms.dijkstra.animation
  );
  const nodeRefs = useRef({});

  const { Grid, grid, setGrid, initialiseGrid } = useGridComponent();

  const { ToggleAlgorithm, ToggleWall, ResetButton, VisualiseButton } =
    useButtons();

  const { DiscreteSlider } = useDiscreteSlider();

  return (
    <>
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
          isWallToggled={isWallToggled}
          isAnimating={isAnimating}
          nodeRefs={nodeRefs}
        ></Grid>
        <ResetButton
          setGrid={setGrid}
          isAnimating={isAnimating}
          initialiseGrid={initialiseGrid}
        ></ResetButton>
        <DiscreteSlider isAnimating={isAnimating} fps={fps} setFps={setFps} />
        <VisualiseButton
          fps={fps}
          grid={grid}
          algorithm={algorithm}
          algorithmAnimation={algorithmAnimation}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          nodeRefs={nodeRefs}
        ></VisualiseButton>
      </div>
    </>
  );
}
