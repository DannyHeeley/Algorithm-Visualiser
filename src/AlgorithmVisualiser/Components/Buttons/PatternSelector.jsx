import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { GAME_OF_LIFE_PATTERNS } from '../../AppModes/GameOfLife/GAME_OF_LIFE_PATTERNS';
import { usePatternSelector } from './hooks/usePatternSelector';

export const PatternSelector = ({ appState, setAppState }) => {

	const handlePatternChange = usePatternSelector(appState, setAppState);
	const patterns = Object.values(GAME_OF_LIFE_PATTERNS);

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
				marginRight: '5px',
			}}>
			<FormControl sx={{ width: '100%' }}>
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
					value={appState.CURRENT_PATTERN}
					label='CURRENT_MODE'
					onChange={(event) => handlePatternChange(event)}>
					{patterns.map((PATTERN, index) => {
						return (
							<MenuItem
								sx={{ fontSize: '13px' }}
								key={index}
								value={PATTERN}>
								{PATTERN.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</Box>
	);
};
