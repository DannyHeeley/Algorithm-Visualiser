import { useEffect, useState } from 'react';
import { AlgorithmVisualiser } from './PathfinderVisualiser/AlgorithmVisualiser';
import { gameOfLife } from './PathfinderVisualiser/AppModes/GameOfLife/gameOfLife.js';
import { animatePathfinding } from './PathfinderVisualiser/AppModes/Pathfinding/pathfindingAnimation.js';
import { animateGameOfLife } from './PathfinderVisualiser/AppModes/GameOfLife/gameOfLifeAnimation.js';
import { initialiseNode } from './PathfinderVisualiser/Components/Grid/Node/NodeHelper.js';
import { generateRandomUnsortedValues } from './PathfinderVisualiser/AppModes/Sorting/sortHelper.js';
import { GAME_OF_LIFE_PATTERNS } from './PathfinderVisualiser/AppModes/GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { PATHFINDING_ALGORITHMS } from './PathfinderVisualiser/AppModes/Pathfinding/PATHFINDING_ALGORITHMS.js';

import './App.css';
import './PathfinderVisualiser/Components/Grid/Node/Node.css';
import './PathfinderVisualiser/AlgorithmVisualiser.css';
import './PathfinderVisualiser/Components/Buttons/Buttons.css';
import './PathfinderVisualiser/Components/Info/Legend.css';
import './PathfinderVisualiser/Components/Grid/Grid.css';
import './PathfinderVisualiser/Components/Info/Rules.css';
import './PathfinderVisualiser/Components/Info/TickCounter.css';


const App = () => {
	// TODO: Lower state that is only used in one component
	const [appState, setAppState] = useState({
		grid: [],
		currentMode: GridModes.PATHFINDING_MODE,
		CURRENT_PATTERN: GAME_OF_LIFE_PATTERNS.COPPERHEAD,
		currentAlgorithm: GridModes.PATHFINDING_MODE.ALGORITHMS.DJIKSTRA.algorithm,
		currentAnimation: animatePathfinding,
		algorithmButtonText: GridModes.PATHFINDING_MODE.ALGORITHMS.DJIKSTRA.name,
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
	return Array.from({ length: 25 }, (_, row) =>
		Array.from({ length: 50 }, (_, col) => {
			return initialiseNode(col, row, appState);
		})
	);
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

export const GridModes = {
	PATHFINDING_MODE: {
		name: 'PATHFINDING',
		ALGORITHMS: PATHFINDING_ALGORITHMS,
		animation: animatePathfinding,
	},
	SORTING_MODE: {
		name: 'SORTING'
	},
	GAME_OF_LIFE_MODE: {
		name: 'GAMEOFLIFE',
		algorithm: gameOfLife,
		animation: animateGameOfLife,
		PATTERNS: GAME_OF_LIFE_PATTERNS
	},
};

export default App;
