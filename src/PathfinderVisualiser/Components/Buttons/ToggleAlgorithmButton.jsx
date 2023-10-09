import PropTypes from "prop-types";

export const ToggleAlgorithmButton = ({
  algorithms,
  gridState,
  setGridState,
  setAlgorithms,
}) => {
  const changeAlgorithm = () => {
    if (gridState.isAnimating || gridState.needsReset) return;
    if (gridState.algorithmName === "DIJKSTRA'S") {
      setGridState((prevNodeState) => ({
        ...prevNodeState,
        algorithmAnimation: "A*",
      }));
      setAlgorithms((prevAlgorithmsState) => ({
        ...prevAlgorithmsState,
        currentAlgorithm: algorithms.aStar.algorithm,
        currentAnimation: algorithms.aStar.animation,
      }));
    } else if (gridState.algorithmName === "A*") {
      setGridState((prevNodeState) => ({
        ...prevNodeState,
        algorithmAnimation: "DIJKSTRA'S",
      }));
      setAlgorithms((prevAlgorithmsState) => ({
        ...prevAlgorithmsState,
        currentAlgorithm: algorithms.dijkstra.algorithm,
        currentAnimation: algorithms.dijkstra.animation,
      }));
    }
  };
  return (
    <div className="toggle-algorithm">
      <button className="toggle-algorithm-button" onClick={changeAlgorithm}>
        &#129518;
      </button>
      <div className="algorithm-text">Algorithm: {gridState.algorithmName}</div>
    </div>
  );
};

ToggleAlgorithmButton.propTypes = {
  algorithms: PropTypes.shape({
    dijkstra: PropTypes.shape({
      algorithm: PropTypes.func.isRequired,
      animation: PropTypes.func.isRequired,
    }).isRequired,
    aStar: PropTypes.shape({
      algorithm: PropTypes.func.isRequired,
      animation: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  setAlgorithms: PropTypes.func.isRequired,
  gridState: PropTypes.shape({
    isAnimating: PropTypes.bool.isRequired,
    needsReset: PropTypes.bool.isRequired,
    algorithmName: PropTypes.string.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
};
