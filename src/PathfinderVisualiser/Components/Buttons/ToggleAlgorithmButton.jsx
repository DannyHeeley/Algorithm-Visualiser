import PropTypes from "prop-types";

export const ToggleAlgorithmButton = ({
  algorithms,
  gridState,
  setGridState,
  setAlgorithms,
}) => {
  const changeAlgorithm = () => {
    if (gridState.isAnimating || gridState.needsReset) return;
    setGridState((prevGridState) => ({
      ...prevGridState,
      algorithmNameText:
        gridState.algorithmNameText === "A*" ? "DIJKSTRA'S" : "A*",
    }));
    setAlgorithms((prevAlgorithmsState) => ({
      ...prevAlgorithmsState,
      currentAlgorithm:
        gridState.algorithmNameText === "DIJKSTRA'S"
          ? algorithms.aStar.algorithm
          : algorithms.dijkstra.algorithm,
      currentAnimation:
        gridState.algorithmNameText === "DIJKSTRA'S"
          ? algorithms.aStar.animation
          : algorithms.dijkstra.animation,
    }));
  };

  return (
    <div className="toggle-algorithm">
      <button className="toggle-algorithm-button" onClick={changeAlgorithm}>
        &#129518;
      </button>
      <div className="algorithm-text">
        Algorithm: {gridState.algorithmNameText}
      </div>
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
    algorithmNameText: PropTypes.string.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
};
