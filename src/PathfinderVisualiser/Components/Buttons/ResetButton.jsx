import PropTypes from "prop-types";

export const ResetButton = ({ initialiseGrid, gridState, setGridState }) => {
  return (
    <button
      className="reset"
      onClick={() => {
        if (gridState.isAnimating) return;
        setGridState((prevNodeState) => ({
          ...prevNodeState,
          grid: initialiseGrid(),
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
  gridState: PropTypes.shape({
    isAnimating: PropTypes.bool.isRequired,
    needsReset: PropTypes.bool.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
};
