import { Slider, Box } from "@mui/material";

export const AnimationSpeedSlider = ({ gridState, setGridState }) => {
  return (
    <div className="slider">
      <div className="slider-label">Animation Speed:</div>
      <Box sx={{ width: 400 }}>
        <Slider
          aria-label="animationSpeed"
          value={gridState.animationSpeed}
          onChange={(event, value) => { 
            if (gridState.isAnimating) return;
            setGridState((prevGridState) => ({
              ...prevGridState,
              animationSpeed: value,
            }));
            event.stopPropagation();
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

