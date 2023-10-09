import { useState } from "react";
import PropTypes from "prop-types";

export const ToggleWallButton = ({ gridState, setGridState }) => {
  const [wallTypeText, setWallTypeText] = useState("Draw Walls");
  const [wallType, setWallType] = useState("wall-type-wall");
  const toggleWallType = () => {
    if (gridState.isAnimating || gridState.needsReset) return;
    if (wallTypeText === "Draw Walls") {
      setWallTypeText("Draw Weight");
      setWallType("wall-type-weight");
    } else if (wallTypeText === "Draw Weight") {
      setWallTypeText("Draw Walls");
      setWallType("wall-type-wall");
    }
    setGridState((prevNodeState) => ({
      ...prevNodeState,
      isWallToggled: !gridState.isWallToggled,
    }));
  };
  return (
    <div className="toggle-wall">
      <button className={wallType} onClick={toggleWallType}>
        <div className="">&#9999;&#65039;</div>
      </button>
      <div className="toggle-text">{wallTypeText}</div>
    </div>
  );
};

ToggleWallButton.propTypes = {
  gridState: PropTypes.shape({
    isAnimating: PropTypes.bool.isRequired,
    needsReset: PropTypes.bool.isRequired,
    isWallToggled: PropTypes.bool.isRequired,
  }).isRequired,
  setGridState: PropTypes.func.isRequired,
};
