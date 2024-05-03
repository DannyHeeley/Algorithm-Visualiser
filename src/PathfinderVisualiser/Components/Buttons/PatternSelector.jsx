import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useSelector } from './hooks/useSelector';
import { GAME_OF_LIFE_PATTERNS } from '../../AppModes/GameOfLife/GAME_OF_LIFE_PATTERNS';

export const PatternSelector = ({ appState, setAppState }) => {
	const { handlePatternChange } = useSelector(appState, setAppState);
	const GAME_OF_LIFE_PATTERNS = Object.values(GAME_OF_LIFE_PATTERNS);
	return (
		<Box
			sx={{
				display: 'flex',
				gridColumn: '1/2',
				gridRow: '2/3',
				backgroundColor: '#f6fff0',
				placeSelf: 'center',
				width: '75%',
				minWidth: '150px',
				borderRadius: '5px',
				fontSize: '5px',
				marginRight: '5px'
			}}>
			<FormControl>
				<InputLabel
					sx={{
						color: 'white',
						backgroundColor: 'rgba(66, 0, 75, 0.904)',
						border: '1px solid rgb(102, 18, 18)',
					}}>
					Pattern
				</InputLabel>
				<Select
					sx={{
						fontSize: 'clamp(0.6rem, 0.65vw, 1vw)',
						width: '100%',
					}}
					value={appState.currentPattern}
					label='currentMode'
					onChange={(event) => handlePatternChange(event)}>
					{GAME_OF_LIFE_PATTERNS.map((currentPattern, index) => {
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
