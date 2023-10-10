import PropTypes from "prop-types";

export const ResetButton = ({ initialiseGrid, initialState }) => {
  return (
    <button
      className="reset"
      onClick={() => {
        if (initialState.gridState.isAnimating) return;
        setGridState((prevState) => ({
          ...prevState,
          grid: initialiseGrid(initialState.nodeState),
          needsReset: false,
        }));
      }}
    >
      Reset ⭯
    </button>
  );
};

ResetButton.propTypes = {
  initialiseGrid: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
};
