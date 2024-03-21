import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { animateConways } from "../../algorithms/conwaysAnimation";
import { animatePathfinding } from "../../algorithms/pathfindingAnimation";


export const DropdownSelector = ({ mode, setGridState, algorithmState, setAlgorithmState }) => {

  const handleChange = (event) => {
    if (event.target.value === "conways") {
      setGridState((prevGridState) => ({
        ...prevGridState,
        mode: "conways",
      }));
      setAlgorithmState((prevAlgorithmState) => ({
        ...prevAlgorithmState,
        currentAlgorithm: algorithmState.gameOfLife,
        animation: animateConways,
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
        fullWidth
        sx={{
          backgroundColor: "#f6fff0",
          position: "absolute",
          left: 450,
          top: 118,
          marginTop: "8px",
          maxWidth: "250px",
          borderRadius: "5px",
          //display: "none",
        }}
      >
        <InputLabel id="dropdown-selector">Mode</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={mode}
          label="Mode"
          onChange={handleChange}
        >
          <MenuItem value={"pathfinding"}>Pathfinding Algorithms</MenuItem>
          <MenuItem value={"sorting"}>Sorting Algorithms</MenuItem>
          <MenuItem value={"conways"}>Conway's Game of Life</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
