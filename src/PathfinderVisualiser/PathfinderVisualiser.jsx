import { useRef } from "react";
import PropTypes from "prop-types";
import { useDiscreteSlider } from "./Components/Buttons/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { ToggleWallButton } from "./Components/Buttons/ToggleWallButton.jsx";
import { ResetButton } from "./Components/Buttons/ResetButton.jsx";
import { VisualiseButton } from "./Components/Buttons/VisualiseButton.jsx";
import { ToggleAlgorithmButton } from "./Components/Buttons/ToggleAlgorithmButton.jsx";
import { Grid } from "./Components/Grid.jsx";
import "./PathfinderVisualiser.css";

export default function PathfinderVisualiser({
  algorithms,
  setAlgorithms,
  nodeState,
  setNodeState,
  gridState,
  setGridState,
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
          gridState={gridState}
          setGridState={setGridState}
          setAlgorithms={setAlgorithms}
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
          nodeState={nodeState}
          setNodeState={setNodeState}
          nodeRefs={nodeRefs}
        ></Grid>
        <ResetButton
          initialiseGrid={initialiseGrid}
          nodeState={nodeState}
          gridState={gridState}
          setGridState={setGridState}
        ></ResetButton>
        <DiscreteSlider gridState={gridState} setGridState={setGridState} />
        <VisualiseButton
          gridState={gridState}
          setGridState={setGridState}
          algorithm={algorithms.currentAlgorithm}
          algorithmAnimation={algorithms.currentAnimation}
          nodeRefs={nodeRefs}
          nodeState={nodeState}
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
  nodeState: PropTypes.object.isRequired,
  setNodeState: PropTypes.func.isRequired,
  gridState: PropTypes.shape({
    grid: PropTypes.array.isRequired,
    gridInitialised: PropTypes.bool.isRequired,
    isAnimating: PropTypes.bool.isRequired,
    isWallToggled: PropTypes.bool.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
  initialiseGrid: PropTypes.func.isRequired,
};
