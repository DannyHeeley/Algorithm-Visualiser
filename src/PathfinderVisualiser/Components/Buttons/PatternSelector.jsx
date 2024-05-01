import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "./hooks/useSelector";
import { GameOfLifePatterns } from "../../algorithms/GameOfLife/patterns";

export const PatternSelector = ({ gridState, setGridState }) => {
	const { handlePatternChange } = useSelector(gridState); 
	const patterns = Object.values(GameOfLifePatterns)
	console.log(patterns)
    return (
		<Box>
			<FormControl
				id='pattern-selector'
				sx={{
					display: 'grid',
					gridRow: '7/8',
					gridColumn: '1/2',
					backgroundColor: '#f6fff0',
					position: 'absolute',
					placeSelf: 'center',
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
					value={gridState.pattern}
					label='Mode'
					onChange={(event) => handlePatternChange(event, setGridState)}>
					{patterns.map((pattern, index) => {
						return <MenuItem
							key={index}
							value={pattern}
							sx={{
								fontSize: '13px',
							}}>
							{pattern.name}
						</MenuItem>
					})}
				</Select>
			</FormControl>
		</Box>
	);
};
