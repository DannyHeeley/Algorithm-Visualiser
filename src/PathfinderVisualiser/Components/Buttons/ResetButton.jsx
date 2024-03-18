export const ResetButton = ({ initialiseGrid, gridState, setGridState }) => {

  const resetVisitedNodes = () => {
    gridState.grid.forEach((row) => {
      row.forEach((node) => {
        if (!node.isTarget && !node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        }
      });
    });
  };

  const handleReset = () => {
    if (gridState.isAnimating) return;
    resetVisitedNodes();
    setGridState((prevState) => {
      return {
        ...prevState,
        grid: initialiseGrid(prevState),
        needsReset: false,
        isAnimating: false
      };
    });
  }

  return (
    <button
      className="reset"
      onClick={() => {
        handleReset();
      }}
    >
      Reset ⭯
    </button>
  );
};



