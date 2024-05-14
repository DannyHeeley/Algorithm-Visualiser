import { Slider, Box } from '@mui/material';

export const AnimationSpeedSlider = ({ appState, setAppState }) => {
	return (
		<div className='slider'>
			<div className='slider-label'>Animation Speed:</div>
			<Box sx={{ width: 400 }}>
				<Slider
					aria-label='animationSpeed'
					value={appState.animationSpeed}
					onChange={(event, value) => {
						handleSliderChange(value, appState, setAppState);
						event.stopPropagation();
					}}
					step={10}
					min={10}
					max={120}
					color='secondary'
				/>
			</Box>
		</div>
	);
};

const handleSliderChange = (value, appState, setAppState) => {
	if (appState.isAnimating) return;
	setAppState((prevState) => ({
		...prevState,
		animationSpeed: value,
	}));
};
