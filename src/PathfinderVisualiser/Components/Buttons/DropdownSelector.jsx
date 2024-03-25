import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { startGameOfLife } from "../../algorithms/gameOfLifeAnimation";
import { animatePathfinding } from "../../algorithms/pathfindingAnimation";

export const DropdownSelector = ({ mode, setGridState, algorithmState, setAlgorithmState }) => {
  const handleChange = (event) => {
    if (event.target.value === "gameoflife") {
      setGridState((prevGridState) => ({
        ...prevGridState,
        mode: "gameoflife",
      }));
      setAlgorithmState((prevAlgorithmState) => ({
        ...prevAlgorithmState,
        currentAlgorithm: algorithmState.gameOfLife,
        animation: startGameOfLife,
      }));
      return;
    }
    if (event.target.value === "pathfinding") {
      setGridState((prevGridState) => ({
        ...prevGridState,
        mode: "pathfinding",
      }));
      setAlgorithmState((prevAlgorithmState) => ({
        ...prevAlgorithmState,
        currentAlgorithm: algorithmState.dijkstra,
        animation: animatePathfinding,
      }));
    } 
    if (event.target.value === "sorting") {
      return;
    }
  };

  return (
    <Box>
      <FormControl
        sx={{
          display: "grid",
          gridRow: "1/2",
          gridColumn: "1/2",
          backgroundColor: "#f6fff0",
          position: "absolute",
          marginLeft: "20px",
          width: "10.2%",
          minWidth: "160px",
          borderRadius: "5px",
          fontSize: "5px",
        }}
      >
        <InputLabel
          id="dropdown-selector"
          sx={{
            color: "white",
            backgroundColor: "rgba(66, 0, 75, 0.904)",
            border: "1px solid rgb(102, 18, 18)",
          }}
        >
          Mode
        </InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          sx={{
            fontSize: "10px",
            minWidth: "160px",
          }}
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem
            value={"pathfinding"}
            sx={{
              fontSize: "13px",
            }}
          >
            Pathfinding Algorithms
          </MenuItem>
          <MenuItem
            value={"sorting"}
            sx={{
              fontSize: "13px",
            }}
          >
            Sorting Algorithms
          </MenuItem>
          <MenuItem
            value={"gameoflife"}
            sx={{
              fontSize: "13px",
            }}
          >
            Conway's Game of Life
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
