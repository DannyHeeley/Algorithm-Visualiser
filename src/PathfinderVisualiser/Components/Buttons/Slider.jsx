import { Slider, Box } from "@mui/material";

export const DiscreteSlider = ({ gridState, setGridState }) => {
  const handleSliderChange = (event, newValue) => {
    setGridState((prevGridState) => ({
      ...prevGridState,
      animationSpeed: newValue,
    }));
    event.stopPropagation();
  };
    return (
      <div className="slider">
        <div className="slider-label">Animation Speed:</div>
        <Box sx={{ width: 400 }}>
          <Slider
            aria-label="animationSpeed"
            value={gridState.animationSpeed}
            onChange={() => { 
              if (gridState.isAnimating) return;
              handleSliderChange;
            }}
            step={10}
            min={10}
            max={120}
            color="secondary"
          />
        </Box>
      </div>
    );
  };

