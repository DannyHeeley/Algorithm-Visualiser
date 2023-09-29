import { Slider, Box } from "@mui/material";
import React, { useState } from "react";

export const useDiscreteSlider = () => {
  const [fps, setFps] = useState(60);
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

  const DiscreteSlider = ({ isAnimating, needsReset }) => {
    const handleSliderChange = (event, newValue) => {
      if (isAnimating || needsReset) return;
      setFps(newValue);
    };
    return (
      <div className="slider">
        <Box sx={{ width: 400 }}>
          <Slider
            aria-label="fps"
            value={fps}
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
              },
              "& .MuiSlider-markLabel": {
                color: "white",
              },
              "& .MuiSlider-valueLabel": {
                font: "Courier New, courier, Lucida Sans Typewriter, Lucida Typewriter, monospace",
              },
            }}
          />
        </Box>
      </div>
    );
  };
  return {
    DiscreteSlider,
    fps,
  };
};
