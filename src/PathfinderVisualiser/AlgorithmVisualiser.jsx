import { AnimationSpeedSlider } from "./Components/Buttons/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { ToggleWallButton } from "./Components/Buttons/ToggleWallButton.jsx";
import { ResetButton } from "./Components/Buttons/ResetButton.jsx";
import { VisualiseButton } from "./Components/Buttons/VisualiseButton.jsx";
import { ToggleAlgorithmButton } from "./Components/Buttons/ToggleAlgorithmButton.jsx";
import { Grid } from "./Components/Grid.jsx";
import { DropdownSelector } from "./Components/Buttons/DropdownSelector.jsx";
import { gameOfLife } from "../gameOfLife.js";

export const AlgorithmVisualiser = ({
  algorithmState,
  setAlgorithmState,
  gridState,
  setGridState,
  initialiseGrid,
}) => {
  return (
    <>
      <div className="pathfinder-container">
        <div className="app-title">
          <DropdownSelector
            className="dropdown-selector"
            mode={gridState.mode}
            setGridState={setGridState}
            algorithmState={algorithmState}
            setAlgorithmState={setAlgorithmState}
          ></DropdownSelector>
          ALGORITHM VISUALISER
        </div>
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
        {gridState.mode !== "conways" && (
          <Legend gridState={gridState}></Legend>
        )}
        {gridState.mode !== "conways" && (
          <div className="info">
            <span>Click on a start or target node to change its position</span>
          </div>
        )}
        <Grid gridState={gridState} setGridState={setGridState}></Grid>
        <ResetButton
          initialiseGrid={initialiseGrid}
          gridState={gridState}
          setGridState={setGridState}
        ></ResetButton>
        <AnimationSpeedSlider
          gridState={gridState}
          setGridState={setGridState}
        />
        <VisualiseButton
          initialiseGrid={initialiseGrid}
          gridState={gridState}
          setGridState={setGridState}
          algorithm={algorithmState.currentAlgorithm}
          animation={algorithmState.animation}
        ></VisualiseButton>
      </div>
    </>
  );
};
