import { AnimationSpeedSlider } from './Components/Buttons/Slider.jsx';
import { Legend } from './Components/Legend.jsx';
import { Rules } from './Components/Rules.jsx';
import { ToggleWallButton } from './Components/Buttons/ToggleWallButton.jsx';
import { ResetButton } from './Components/Buttons/ResetButton.jsx';
import { VisualiseButton } from './Components/Buttons/VisualiseButton.jsx';
import { ToggleAlgorithmButton } from './Components/Buttons/ToggleAlgorithmButton.jsx';
import { Grid } from './Components/Grid/Grid.jsx';
import { ModeSelector } from './Components/Buttons/ModeSelector.jsx';
import { GridMode } from '../App.jsx';
import { TickCounter } from './Components/TickCounter.jsx';
import { PatternSelector } from './Components/Buttons/PatternSelector.jsx';

export const AlgorithmVisualiser = ({ algorithmState, setAlgorithmState, gridState, setGridState, initialiseGrid }) => {
	return (
		<>
			<div
				className='pathfinder-container'>
				<div className='app-title'>ALGORITHM VISUALISER</div>
				<ModeSelector
					gridState={gridState}
					setGridState={setGridState}
					algorithmState={algorithmState}
					setAlgorithmState={setAlgorithmState}></ModeSelector>
				<Grid
					gridState={gridState}
					setGridState={setGridState}></Grid>
				<ResetButton
					initialiseGrid={initialiseGrid}
					gridState={gridState}
					setGridState={setGridState}></ResetButton>
				<VisualiseButton
					initialiseGrid={initialiseGrid}
					gridState={gridState}
					setGridState={setGridState}
					algorithmState={algorithmState}></VisualiseButton>
				{gridState.mode === GridMode.PATHFINDING && (
					<>
						<ToggleAlgorithmButton
							gridState={gridState}
							setGridState={setGridState}
							algorithmState={algorithmState}
							setAlgorithmState={setAlgorithmState}></ToggleAlgorithmButton>
						<ToggleWallButton
							gridState={gridState}
							setGridState={setGridState}></ToggleWallButton>
						<Legend></Legend>
						<div className='info'>
							<span>Click on a start or target node to change its position</span>
						</div>
						<AnimationSpeedSlider
							gridState={gridState}
							setGridState={setGridState}
						/>
					</>
				)}
				{gridState.mode === GridMode.GAMEOFLIFE && (
					<>
						<PatternSelector
							gridState={gridState}
							setGridState={setGridState}></PatternSelector>
						<Rules></Rules>
						<TickCounter gridState={gridState}></TickCounter>
					</>
				)}
			</div>
		</>
	);
};
