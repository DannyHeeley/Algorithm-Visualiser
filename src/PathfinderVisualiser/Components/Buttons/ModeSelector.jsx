import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSelector } from './hooks/useSelector';
import { GridMode } from "../../../App";

export const ModeSelector = ({ gridState, setGridState, algorithmState, setAlgorithmState }) => {
	const { handleModeChange } = useSelector(gridState);

	const { GAMEOFLIFE, PATHFINDING, SORTING } = GridMode;
	
  return (
		<Box>
			<FormControl
				id='mode-selector'
				sx={{
					display: 'grid',
					gridRow: '1/2',
					gridColumn: '1/2',
					backgroundColor: '#f6fff0',
					position: 'absolute',
					placeSelf: 'center',
					marginLeft: '20px',
					marginTop: '10px',
					width: '10.2%',
					minWidth: '160px',
					borderRadius: '5px',
					fontSize: '5px',
				}}>
				<InputLabel
					sx={{
						color: 'white',
						backgroundColor: 'rgba(66, 0, 75, 0.904)',
						border: '1px solid rgb(102, 18, 18)',
					}}>
					Mode
				</InputLabel>
				<Select
					sx={{
						fontSize: 'clamp(0.6rem, 0.65vw, 1vw)',
						minWidth: '160px',
					}}
					value={gridState.mode}
					label='Mode'
					onChange={(event) =>
						handleModeChange(event, setGridState, algorithmState, setAlgorithmState)
					}>
					<MenuItem
						value={PATHFINDING}
						sx={{
							fontSize: '13px',
						}}>
						Pathfinding Algorithms
					</MenuItem>
					<MenuItem
						value={SORTING}
						sx={{
							fontSize: '13px',
						}}>
						Sorting Algorithms
					</MenuItem>
					<MenuItem
						value={GAMEOFLIFE}
						sx={{
							fontSize: '13px',
						}}>
						Conway's Game of Life
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
  );
}
