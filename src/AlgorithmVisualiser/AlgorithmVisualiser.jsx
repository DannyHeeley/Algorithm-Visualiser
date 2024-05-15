import { AnimationSpeedSlider } from './Components/Buttons/Slider.jsx';
import { Legend } from './Components/Info/Legend.jsx';
import { Rules } from './Components/Info/Rules.jsx';
import { DrawTypeButton } from './Components/Buttons/DrawTypeButton.jsx';
import { ResetButton } from './Components/Buttons/ResetButton.jsx';
import { VisualiseButton } from './Components/Buttons/VisualiseButton.jsx';
import { ToggleAlgorithmButton } from './Components/Buttons/ToggleAlgorithmButton.jsx';
import { Grid } from './Components/Grid/Grid.jsx';
import { ModeSelector } from './Components/Buttons/ModeSelector.jsx';
import { initialiseGrid } from '../App.jsx';
import { APP_MODES } from './AppModes/APP_MODES.js';
import { TickCounter } from './Components/Info/TickCounter.jsx';
import { PatternSelector } from './Components/Buttons/PatternSelector.jsx';
import { SortingInfo } from './Components/Info/sortingInfo.jsx';

export const AlgorithmVisualiser = ({ appState, setAppState }) => {
	const { GAME_OF_LIFE_MODE, PATHFINDING_MODE, SORTING_MODE } = APP_MODES;
	return (
		<>
			<div className='pathfinder-container'>
				<div className='app-title'>ALGORITHM VISUALISER</div>
				<ModeSelector
					appState={appState}
					setAppState={setAppState}></ModeSelector>
				<Grid
					appState={appState}
					setAppState={setAppState}></Grid>
				<ResetButton
					initialiseGrid={initialiseGrid}
					appState={appState}
					setAppState={setAppState}></ResetButton>
				<VisualiseButton
					appState={appState}
					setAppState={setAppState}></VisualiseButton>
				<AnimationSpeedSlider
					appState={appState}
					setAppState={setAppState}
				/>
				{appState.CURRENT_MODE === PATHFINDING_MODE && (
					<>
						<ToggleAlgorithmButton
							appState={appState}
							setAppState={setAppState}></ToggleAlgorithmButton>
						<DrawTypeButton
							appState={appState}
							setAppState={setAppState}></DrawTypeButton>
						<Legend></Legend>
						<div className='info'>
							<span>Click on a start or target node to change its position</span>
						</div>
					</>
				)}
				{appState.CURRENT_MODE === SORTING_MODE && (
					<>
						<ToggleAlgorithmButton
							appState={appState}
							setAppState={setAppState}></ToggleAlgorithmButton>
						<SortingInfo appState={appState}></SortingInfo>
					</>
				)}
				{appState.CURRENT_MODE === GAME_OF_LIFE_MODE && (
					<>
						<PatternSelector
							appState={appState}
							setAppState={setAppState}></PatternSelector>
						<Rules></Rules>
						<TickCounter appState={appState}></TickCounter>
					</>
				)}
			</div>
		</>
	);
};
