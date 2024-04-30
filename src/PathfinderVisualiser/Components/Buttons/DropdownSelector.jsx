import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { startGameOfLife } from "../../algorithms/GameOfLife/gameOfLifeAnimation";
import { animatePathfinding } from "../../algorithms/Pathfinding/pathfindingAnimation";
import { initialiseGrid } from "../../../App";

export const DropdownSelector = ({ gridState, setGridState, algorithmState, setAlgorithmState }) => {
  const handleChange = (event) => {
    const newGrid = initialiseGrid(gridState);
    if (event.target.value === "gameoflife") {
      setGridState((prevGridState) => ({
        ...prevGridState,
        grid: newGrid,
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
        grid: newGrid,
        mode: "pathfinding",
      }));
      setAlgorithmState((prevAlgorithmState) => ({
        ...prevAlgorithmState,
        currentAlgorithm: algorithmState.dijkstra,
        animation: animatePathfinding,
      }));
      return
    } 
    if (event.target.value === "sorting") {
      setGridState((prevGridState) => ({
        ...prevGridState,
        grid: newGrid,
        mode: "sorting",
      }));
      setAlgorithmState((prevAlgorithmState) => ({
        ...prevAlgorithmState,
        currentAlgorithm: null, //TODO: Set this correctly once algorithms implemented
        animation: null, //TODO: Set this correctly once algorithms implemented
      }));
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
          placeSelf: "center",
          marginLeft: "20px",
          marginTop: "10px",
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
            fontSize: "clamp(0.6rem, 0.65vw, 1vw)",
            minWidth: "160px",
          }}
          value={gridState.mode}
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
