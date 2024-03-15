import { useRef } from "react";
import { DiscreteSlider } from "./Components/Buttons/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { ToggleWallButton } from "./Components/Buttons/ToggleWallButton.jsx";
import { ResetButton } from "./Components/Buttons/ResetButton.jsx";
import { VisualiseButton } from "./Components/Buttons/VisualiseButton.jsx";
import { ToggleAlgorithmButton } from "./Components/Buttons/ToggleAlgorithmButton.jsx";
import { Grid } from "./Components/Grid.jsx";

export default function PathfinderVisualiser({
  algorithmState,
  setAlgorithmState,
  gridState,
  setGridState,
  initialiseGrid,
}) {
  // nodeRefs here is used for animation purposes.
  // This is passed from the node (child) back to the parent (This component) with forwardsRef
  const nodeRefs = useRef({});
  return (
    <>
      <div className="pathfinder-container">
        <div className="app-title">ALGORITHM VISUALISER</div>
        <ToggleAlgorithmButton
          gridState={gridState}
          setGridState={setGridState}
          algorithmState={algorithmState}
          setAlgorithmState={setAlgorithmState}
        ></ToggleAlgorithmButton>
        <ToggleWallButton
          gridState={gridState}
          setGridState={setGridState}
        ></ToggleWallButton>
        <Legend></Legend>
        <div className="info">
          <span>Click on a start or target node to change its position</span>
        </div>
        <Grid
          gridState={gridState}
          setGridState={setGridState}
          nodeRefs={nodeRefs}
        ></Grid>
        <ResetButton
          initialiseGrid={initialiseGrid}
          gridState={gridState}
          setGridState={setGridState}
          nodeRefs={nodeRefs}
        ></ResetButton>
        <DiscreteSlider gridState={gridState} setGridState={setGridState} />
        <VisualiseButton
          gridState={gridState}
          setGridState={setGridState}
          algorithm={algorithmState.currentAlgorithm}
          algorithmAnimation={algorithmState.animation}
          nodeRefs={nodeRefs}
        ></VisualiseButton>
      </div>
    </>
  );
}


