import { useRef } from "react";
import PropTypes from "prop-types";
import { useDiscreteSlider } from "./Components/Buttons/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { ToggleWallButton } from "./Components/Buttons/ToggleWallButton.jsx";
import { ResetButton } from "./Components/Buttons/ResetButton.jsx";
import { VisualiseButton } from "./Components/Buttons/VisualiseButton.jsx";
import { ToggleAlgorithmButton } from "./Components/Buttons/ToggleAlgorithmButton.jsx";
import { Grid } from "./Components/Grid.jsx";

export default function PathfinderVisualiser({
  algorithms,
  setAlgorithms,
  initialState,
  initialiseGrid,
}) {
  const nodeRefs = useRef({});

  const { DiscreteSlider } = useDiscreteSlider();

  return (
    <>
      <div className="pathfinder-container">
        <div className="app-title">ALGORITHM VISUALISER </div>
        <ToggleAlgorithmButton
          algorithms={algorithms}
          gridState={initialState.gridState}
          setAlgorithms={setAlgorithms}
        ></ToggleAlgorithmButton>
        <ToggleWallButton gridState={initialState.gridState}></ToggleWallButton>
        <Legend></Legend>
        <div className="info">
          <span>Click on a start or target node to change its position</span>
        </div>
        <Grid grid={initialState.gridState.grid} nodeRefs={nodeRefs}></Grid>
        <ResetButton
          initialiseGrid={initialiseGrid}
          initialState={initialState}
        ></ResetButton>
        <DiscreteSlider gridState={initialState.gridState} />
        <VisualiseButton
          algorithm={algorithms.currentAlgorithm}
          algorithmAnimation={algorithms.currentAnimation}
          nodeRefs={nodeRefs}
          gridState={initialState.gridState}
          nodeState={initialState.nodeState}
        ></VisualiseButton>
      </div>
    </>
  );
}

PathfinderVisualiser.propTypes = {
  algorithms: PropTypes.shape({
    dijkstra: PropTypes.shape({
      algorithm: PropTypes.func.isRequired,
      animation: PropTypes.func.isRequired,
    }).isRequired,
    aStar: PropTypes.shape({
      algorithm: PropTypes.func.isRequired,
      animation: PropTypes.func.isRequired,
    }).isRequired,
    currentAlgorithm: PropTypes.func.isRequired,
    currentAnimation: PropTypes.func.isRequired,
  }).isRequired,
  setAlgorithms: PropTypes.func.isRequired,
  initialState: PropTypes.shape({
    nodeState: PropTypes.shape({
      startNodeRow: PropTypes.number.isRequired,
      startNodeCol: PropTypes.number.isRequired,
      isStartNodeSet: PropTypes.bool.isRequired,
      targetNodeRow: PropTypes.number.isRequired,
      targetNodeCol: PropTypes.number.isRequired,
      isTargetNodeSet: PropTypes.bool.isRequired,
      mouseIsPressed: PropTypes.bool.isRequired,
    }).isRequired,
    gridState: PropTypes.shape({
      grid: PropTypes.array.isRequired,
      isAnimating: PropTypes.bool.isRequired,
      fps: PropTypes.number.isRequired,
      needsReset: PropTypes.bool.isRequired,
      isWallToggled: PropTypes.bool.isRequired,
      algorithmNameText: PropTypes.string.isRequired,
      gridInitialised: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  initialiseGrid: PropTypes.func.isRequired,
};
