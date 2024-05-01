import { useEffect, useState } from 'react';
import { AlgorithmVisualiser } from './PathfinderVisualiser/AlgorithmVisualiser';
import { dijkstra } from './PathfinderVisualiser/algorithms/Pathfinding/dijkstra.js';
import { aStar4Way } from './PathfinderVisualiser/algorithms/Pathfinding/aStar_4Way.js';
import { aStar8Way } from './PathfinderVisualiser/algorithms/Pathfinding/aStar_8Way.js';
import { greedyBestFirstSearch } from './PathfinderVisualiser/algorithms/Pathfinding/greedyBestFirstSearch.js';
import { gameOfLife } from './PathfinderVisualiser/algorithms/GameOfLife/gameOfLife.js';
import { animatePathfinding } from './PathfinderVisualiser/algorithms/Pathfinding/pathfindingAnimation.js';
import { animateGameOfLife } from './PathfinderVisualiser/algorithms/GameOfLife/gameOfLifeAnimation.js';
import { initialiseNode } from './PathfinderVisualiser/Components/Node/NodeHelper';
import { generateRandomUnsortedValues } from './PathfinderVisualiser/algorithms/Sorting/sortHelper.js';

import './App.css';
import './PathfinderVisualiser/Components/Node/Node.css';
import './PathfinderVisualiser/AlgorithmVisualiser.css';
import './PathfinderVisualiser/Components/Buttons/Buttons.css';
import './PathfinderVisualiser/Components/Legend.css';
import './PathfinderVisualiser/Components/Grid/Grid.css';
import './PathfinderVisualiser/Components/Rules.css';
import './PathfinderVisualiser/Components/TickCounter.css';
import { GameOfLifePatterns } from './PathfinderVisualiser/algorithms/GameOfLife/patterns.js';

const App = () => {
	const [gridState, setGridState] = useState({
		mode: GridMode.PATHFINDING,
		algorithmNameText: "DIJKSTRA'S",
		grid: [],
		mouseIsPressed: false,
		isStartNodeSet: true,
		isTargetNodeSet: true,
		startNodeRow: 10,
		startNodeCol: 15,
		targetNodeRow: 10,
		targetNodeCol: 35,
		animationSpeed: 60,
		maxGenerations: 500,
		currentTick: 0,
		pattern: GameOfLifePatterns.COPPERHEAD,
		intervalId: null,
		isAnimating: false,
		needsReset: false,
		isWallToggled: true,
		randomUnsortedValues: generateRandomUnsortedValues(),
	});

	const [algorithmState, setAlgorithmState] = useState({
		// TODO: Update this to use the new file PathfindingAlgorithms
		dijkstra: dijkstra,
		greedyBestFirst: greedyBestFirstSearch,
		aStar4Way: aStar4Way,
		aStar8Way: aStar8Way,
		animatePathfinding: animatePathfinding,
//------------------------------------------
		gameOfLife: gameOfLife,
		animateGameOfLife: animateGameOfLife,
//------------------------------------------
		currentAlgorithm: dijkstra,
		currentAnimation: animatePathfinding,
	});

	useEffect(() => {
		const newGrid = initialiseGrid(gridState);
		setGridState((prevGridState) => ({
			...prevGridState,
			grid: newGrid,
		}));
	}, []);

	return (
		<div className='app-container'>
			<AlgorithmVisualiser
				algorithmState={algorithmState}
				setAlgorithmState={setAlgorithmState}
				gridState={gridState}
				setGridState={setGridState}
				initialiseGrid={initialiseGrid}></AlgorithmVisualiser>
		</div>
	);
};

export const initialiseGrid = (gridState) => {
	return Array.from({ length: 20 }, (_, row) =>
		Array.from({ length: 50 }, (_, col) => {
			return initialiseNode(col, row, gridState);
		})
	);
};

export const GridMode = {
	PATHFINDING: 'PATHFINDING',
	SORTING: 'SORTING',
	GAMEOFLIFE: 'GAMEOFLIFE',
};

export default App;
