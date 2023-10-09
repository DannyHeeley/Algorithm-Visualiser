import PropTypes from "prop-types";

export const ResetButton = ({
  initialiseGrid,
  nodeState,
  gridState,
  setGridState,
}) => {
  return (
    <button
      className="reset"
      onClick={() => {
        if (gridState.isAnimating) return;
        setGridState((prevState) => ({
          ...prevState,
          grid: initialiseGrid(nodeState),
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
  nodeState: PropTypes.object.isRequired,
  gridState: PropTypes.shape({
    isAnimating: PropTypes.bool.isRequired,
    needsReset: PropTypes.bool.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
};
