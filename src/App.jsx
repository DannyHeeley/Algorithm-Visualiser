import { useEffect, useState } from 'react';
import { AlgorithmVisualiser } from './AlgorithmVisualiser/AlgorithmVisualiser';
import { animatePathfinding } from './AlgorithmVisualiser/AppModes/Pathfinding/pathfindingAnimation.js';
import { useNodeHelper } from './AlgorithmVisualiser/Components/Grid/Node/useNodeHelper.jsx';
import { generateRandomUnsortedValues } from './AlgorithmVisualiser/AppModes/Sorting/sortHelper.js';
import { GAME_OF_LIFE_PATTERNS } from './AlgorithmVisualiser/AppModes/GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { AppModes } from './AlgorithmVisualiser/AppModes/AppModes.js';

import './App.css';
import './AlgorithmVisualiser/Components/Grid/Node/Node.css';
import './AlgorithmVisualiser/AlgorithmVisualiser.css';
import './AlgorithmVisualiser/Components/Buttons/Buttons.css';
import './AlgorithmVisualiser/Components/Info/Legend.css';
import './AlgorithmVisualiser/Components/Grid/Grid.css';
import './AlgorithmVisualiser/Components/Info/Rules.css';
import './AlgorithmVisualiser/Components/Info/TickCounter.css';


const App = () => {
	// TODO: Lower state that is only used in one component
	const [appState, setAppState] = useState({
		grid: [],
		currentMode: AppModes.PATHFINDING_MODE,
		CURRENT_PATTERN: GAME_OF_LIFE_PATTERNS.COPPERHEAD,
		currentAlgorithm: AppModes.PATHFINDING_MODE.ALGORITHMS.DJIKSTRA.algorithm,
		currentAnimation: animatePathfinding,
		algorithmButtonText: AppModes.PATHFINDING_MODE.ALGORITHMS.DJIKSTRA.name,
		startNodeRow: 13,
		startNodeCol: 15,
		targetNodeRow: 13,
		targetNodeCol: 34,
		animationSpeed: 60,
		maxGenerations: 500,
		currentTick: 0,
		intervalId: null,
		isStartNodeSet: true,
		isTargetNodeSet: true,
		isAnimating: false,
		mouseIsPressed: false,
		needsReset: false,
		drawType: 'wall',
		randomUnsortedValues: generateRandomUnsortedValues(),
	});

	useEffect(() => {
		const newGrid = initialiseGrid(appState);
		setAppState((prevState) => ({
			...prevState,
			grid: newGrid,
		}));
	}, []);

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
	return Array.from({ length: 25 }, (_, row) =>
		Array.from({ length: 50 }, (_, col) => {
			return initialiseNode(col, row, appState);
		})
	);
};

export const deepCopyGrid = (grid) => {
	return grid.map((row) => {
		return row.map((node) => ({ ...node }));
	});
};

// TODO: Create hook for these
export const toggleNeedsReset = (setAppState) => {
	setAppState((prevState) => ({
		...prevState,
		needsReset: !prevState.needsReset,
	}));
};

export const toggleIsAnimating = (setAppState) => {
	setAppState((prevState) => ({
		...prevState,
		isAnimating: !prevState.isAnimating,
	}));
};

export default App;
