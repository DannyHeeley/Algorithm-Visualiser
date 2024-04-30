import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { startGameOfLife } from "../../algorithms/GameOfLife/gameOfLifeAnimation";
import { animatePathfinding } from "../../algorithms/Pathfinding/pathfindingAnimation";
import { initialiseGrid } from "../../../App";
import { initialiseGridWithPattern } from "../../algorithms/GameOfLife/parseRle";
import { gameOfLifePatterns } from "../../algorithms/GameOfLife/patterns";

export const PatternSelector = ({ gridState }) => {
  const handleChange = (event) => {};

  return (
    <Box>
          <FormControl
            id="pattern-selector"
            sx={{
                display: "grid",
                gridRow: "7/8",
                gridColumn: "1/2",
                backgroundColor: "#f6fff0",
                position: "absolute",
                placeSelf: "center",
                marginTop: "10px",
                width: "10.2%",
                minWidth: "160px",
                borderRadius: "5px",
                fontSize: "5px",
            }}
        >
        <InputLabel

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
            value={"copperhead"}
            sx={{
            fontSize: "13px",
            }}
        >
        COPPERHEAD
        </MenuItem>
        <MenuItem
            value={"twoenginecordership"}
            sx={{
            fontSize: "13px",
            }}
        >
        TWOENGINECORDERSHIP
        </MenuItem>
        <MenuItem
            value={"gosperglidergun"}
            sx={{
            fontSize: "13px",
            }}
        >
        GOSPERGLIDERGUN
        </MenuItem>
        <MenuItem
            value={"glider"}
            sx={{
            fontSize: "13px",
            }}
        >
        GLIDER
        </MenuItem>
        <MenuItem
            value={"sirrobin"}
            sx={{
            fontSize: "13px",
            }}
        >
        SIRROBIN
        </MenuItem>
        <MenuItem
            value={"snarkloop"}
            sx={{
            fontSize: "13px",
            }}
        >
        SNARKLOOP
        </MenuItem>
        </Select>
        </FormControl>
        </Box>
    );
};
