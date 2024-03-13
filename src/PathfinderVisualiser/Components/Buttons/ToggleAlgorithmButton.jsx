export const ToggleAlgorithmButton = ({
  gridState,
  setGridState,
  algorithmState,
  setAlgorithmState,
}) => {
  const changeAlgorithm = () => {
    if (gridState.isAnimating || gridState.needsReset) return;
    handleChangeText(setGridState, gridState);
    handleChangeAlgorithm(setAlgorithmState, gridState, algorithmState);
  };
  return (
    <div className="toggle-algorithm">
      <button className="toggle-algorithm-button" onClick={changeAlgorithm}>
        &#129518;
      </button>
      <div className="algorithm-text">
        Algorithm: <div className="text-value">{gridState.algorithmNameText}</div>
      </div>
    </div>
  );
};

function handleChangeAlgorithm(setAlgorithmState, gridState, algorithmState) {
  setAlgorithmState((prevAlgorithmsState) => ({
    ...prevAlgorithmsState,
    currentAlgorithm: gridState.algorithmNameText === "DIJKSTRA'S"
      ? algorithmState.aStar4Way
      : gridState.algorithmNameText === "A* 4-WAY"
      ? algorithmState.aStar8Way
      : algorithmState.djikstra,
  }));
}

function handleChangeText(setGridState, gridState) {
  setGridState((prevGridState) => ({
    ...prevGridState,
    algorithmNameText: gridState.algorithmNameText === "DIJKSTRA'S"
      ? "A* 4-WAY"
      : gridState.algorithmNameText === "A* 4-WAY" 
        ? "A* 8-WAY"
        : "DIJKSTRA'S",
  }));
}
