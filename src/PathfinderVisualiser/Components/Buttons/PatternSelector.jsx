import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "./hooks/useSelector";
import { GameOfLifePatterns } from "../../algorithms/GameOfLife/patterns";

export const PatternSelector = ({ appState, setAppState }) => {
	const { handlePatternChange } = useSelector(appState, setAppState);
	const patterns = Object.values(GameOfLifePatterns);
	return (
		<Box>
			<FormControl
				id='currentPattern-selector'
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
					currentMode
				</InputLabel>
				<Select
					sx={{
						fontSize: 'clamp(0.6rem, 0.65vw, 1vw)',
						minWidth: '160px',
					}}
					value={appState.currentPattern}
					label='currentMode'
					onChange={(event) => handlePatternChange(event)}>
					{patterns.map((currentPattern, index) => {
						return (
							<MenuItem
								key={index}
								value={currentPattern}
								sx={{
									fontSize: '13px',
								}}>
								{currentPattern.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
};
