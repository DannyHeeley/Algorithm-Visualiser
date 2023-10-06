import { useRef } from "react";
import PropTypes from "prop-types";
import { useDiscreteSlider } from "./Components/Slider.jsx";
import { Legend } from "./Components/Legend.jsx";
import { useButtons } from "./Components/Buttons.jsx";
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
  console.log("PathfinderVisualiser Mounted");

  const nodeRefs = useRef({});

  const {
    ToggleAlgorithmButton,
    ToggleWallButton,
    ResetButton,
    VisualiseButton,
  } = useButtons();

  const { DiscreteSlider } = useDiscreteSlider();

  return (
    <>
      <div className="pathfinder-container">
        <div className="app-title">ALGORITHM VISUALISER </div>
        <ToggleAlgorithmButton
          algorithms={algorithms}
          gridState={gridState}
          setGridState={setGridState}
          setAnimation={setAlgorithms}
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
          initialiseGrid={initialiseGrid}
        ></Grid>
        <ResetButton
          gridState={gridState}
          setGridState={setGridState}
          initialiseGrid={initialiseGrid}
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
