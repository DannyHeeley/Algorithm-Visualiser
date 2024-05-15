import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useModeSelector } from './hooks/useModeSelector';
import { APP_MODES } from '../../AppModes/APP_MODES';

export const ModeSelector = ({ appState, setAppState }) => {
	
	const handleModeChange = useModeSelector(appState, setAppState);
	const appModes = Object.values(APP_MODES);

	return (
		<Box
			sx={{
				display: 'flex',
				gridRow: '1/2',
				gridColumn: '1/2',
				backgroundColor: '#f6fff0',
				placeSelf: 'center',
				width: '75%',
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
					Mode
				</InputLabel>
				<Select
					sx={{
						fontSize: 'clamp(0.6rem, 0.65vw, 1vw)',
					}}
					value={appState.CURRENT_MODE}
					label='CURRENT_MODE'
					onChange={(event) => handleModeChange(event)}>
					{appModes.map((mode, index) => {
						return (
							<MenuItem
								key={index}
								value={mode}
								sx={{
									fontSize: '13px',
								}}>
								{mode.name}
							</MenuItem>)
						})}
				</Select>
			</FormControl>
		</Box>
	);
};
