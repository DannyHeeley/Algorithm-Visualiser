import { Slider, Box } from "@mui/material";
import PropTypes from "prop-types";

export const useDiscreteSlider = () => {
  console.log("UseDiscreteSlider mounted");
  const generateMarks = (start, stop, step) => {
    const marks = [];
    for (let i = start; i <= stop; i += step) {
      marks.push({
        value: i,
        label: `${i}fps`,
      });
    }
    return marks;
  };

  const marks = generateMarks(10, 100, 10);

  const DiscreteSlider = ({ gridState, setGridState }) => {
    const handleSliderChange = (event, newValue) => {
      if (gridState.isAnimating || gridState.needsReset) return;
      setGridState((prevNodeState) => ({
        ...prevNodeState,
        fps: newValue,
      }));
      event.stopPropagation();
    };
    return (
      <div className="slider">
        <Box sx={{ width: 400 }}>
          <Slider
            aria-label="fps"
            value={gridState.fps}
            onChange={handleSliderChange}
            step={10}
            min={10}
            max={60}
            valueLabelDisplay="auto"
            marks={marks}
            color="secondary"
            sx={{
              "& .MuiSlider-valueLabel": {
                color: "white",
                font: "Courier New, courier, Lucida Sans Typewriter, Lucida Typewriter, monospace",
              },
              "& .MuiSlider-markLabel": {
                color: "white",
              },
            }}
          />
        </Box>
      </div>
    );
  };

  DiscreteSlider.propTypes = {
    gridState: PropTypes.shape({
      isAnimating: PropTypes.bool.isRequired,
      needsReset: PropTypes.bool.isRequired,
      fps: PropTypes.number.isRequired,
    }).isRequired,
    setGridState: PropTypes.func.isRequired,
  };

  return {
    DiscreteSlider,
  };
};
