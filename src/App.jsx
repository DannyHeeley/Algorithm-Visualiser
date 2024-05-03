import { useEffect, useState } from 'react';
import { AlgorithmVisualiser } from './PathfinderVisualiser/AlgorithmVisualiser';
import { gameOfLife } from './PathfinderVisualiser/modes/GameOfLife/gameOfLife.js';
import { animatePathfinding } from './PathfinderVisualiser/modes/Pathfinding/pathfindingAnimation.js';
import { animateGameOfLife } from './PathfinderVisualiser/modes/GameOfLife/gameOfLifeAnimation.js';
import { initialiseNode } from './PathfinderVisualiser/Components/Node/NodeHelper';
import { generateRandomUnsortedValues } from './PathfinderVisualiser/modes/Sorting/sortHelper.js';

import './App.css';
import './PathfinderVisualiser/Components/Node/Node.css';
import './PathfinderVisualiser/AlgorithmVisualiser.css';
import './PathfinderVisualiser/Components/Buttons/Buttons.css';
import './PathfinderVisualiser/Components/Legend.css';
import './PathfinderVisualiser/Components/Grid/Grid.css';
import './PathfinderVisualiser/Components/Rules.css';
import './PathfinderVisualiser/Components/TickCounter.css';
import { GAME_OF_LIFE_PATTERNS } from './PathfinderVisualiser/modes/GameOfLife/GAME_OF_LIFE_PATTERNS.js';
import { PATHFINDING_ALGORITHMS } from './PathfinderVisualiser/modes/Pathfinding/PATHFINDING_ALGORITHMS.js';

const App = () => {
	// TODO: Lower state that is only used in one component
	const [appState, setAppState] = useState({
		grid: [],
		currentMode: GridModes.PATHFINDING_MODE,
		currentPattern: GAME_OF_LIFE_PATTERNS.COPPERHEAD,
		currentAlgorithm: PATHFINDING_ALGORITHMS.DJIKSTRA.algorithm,
		currentAnimation: animatePathfinding,
		algorithmButtonText: PATHFINDING_ALGORITHMS.DJIKSTRA.name,
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
