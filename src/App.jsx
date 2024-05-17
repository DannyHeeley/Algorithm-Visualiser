import { useEffect, useState } from 'react';
import { AlgorithmVisualiser } from './AlgorithmVisualiser/AlgorithmVisualiser';
import { useNodeHelper } from './AlgorithmVisualiser/Components/Grid/Node/useNodeHelper.jsx';
import { generateRandomUnsortedArray } from './AlgorithmVisualiser/AppModes/Sorting/sortHelper.js';
import { APP_MODES } from './AlgorithmVisualiser/AppModes/APP_MODES.js';
import { initialiseGridWithPattern } from './AlgorithmVisualiser/AppModes/GameOfLife/patternHandler.js';

import './App.css';
import './AlgorithmVisualiser/Components/Grid/Node/Node.css';
import './AlgorithmVisualiser/AlgorithmVisualiser.css';
import './AlgorithmVisualiser/Components/Buttons/Buttons.css';
import './AlgorithmVisualiser/Components/Info/Legend.css';
import './AlgorithmVisualiser/Components/Grid/Grid.css';
import './AlgorithmVisualiser/Components/Info/TickCounter.css';

const App = () => {

	const [appState, setAppState] = useState({
		grid: [],
		CURRENT_MODE: APP_MODES.PATHFINDING_MODE,
		CURRENT_PATTERN: APP_MODES.GAME_OF_LIFE_MODE.PATTERNS.NO_PATTERN,
		CURRENT_ALGORITHM: APP_MODES.PATHFINDING_MODE.ALGORITHMS.DJIKSTRA,
		DRAW_TYPE: APP_MODES.PATHFINDING_MODE.DRAW_TYPE.WALL,
		startNodeRow: 13,
		startNodeCol: 15,
		targetNodeRow: 13,
		targetNodeCol: 34,
		animationSpeed: 60,
		currentTick: 0,
		intervalId: null,
		isStartNodeSet: true,
		isTargetNodeSet: true,
		isAnimating: false,
		mouseIsPressed: false,
		needsReset: false,
		randomValuesArray: null,
	});

	useEffect(() => (
		setAppState((prevState) => ({
			...prevState,
			randomValuesArray: generateRandomUnsortedArray(),
		}))
	), [])

	useEffect(() => {
		const newGrid =
			appState.CURRENT_MODE === APP_MODES.GAME_OF_LIFE_MODE
				? initialiseGridWithPattern(appState.CURRENT_PATTERN, initialiseGrid(appState))
				: initialiseGrid(appState);
		setAppState((prevState) => ({
			...prevState,
			grid: newGrid,
		}));
	}, [appState.CURRENT_MODE]);

	return (
		<div className='app-container'>
			<AlgorithmVisualiser
				appState={appState}
				setAppState={setAppState}
			></AlgorithmVisualiser>
		</div>
	);
};

export const initialiseGrid = (appState) => {
	const { initialiseNode } = useNodeHelper();
	return Array.from({ length: appState.CURRENT_MODE.GRID_DIMENSIONS.numOfRows }, (_, row) =>
		Array.from({ length: appState.CURRENT_MODE.GRID_DIMENSIONS.numOfCols }, (_, col) => {
			return initialiseNode(col, row, appState);
		})
	);
};

export default App;
