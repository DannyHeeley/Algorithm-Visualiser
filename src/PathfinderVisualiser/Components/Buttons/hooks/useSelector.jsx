import { initialiseGrid } from '../../../../App';
import { initialiseGridWithPattern } from '../../../algorithms/GameOfLife/parsePattern';
import { GameOfLifePatterns } from '../../../algorithms/GameOfLife/patterns';
import { GridMode } from '../../../../App';
import { AccordionSummary } from '@mui/material';

export const useSelector = (gridState) => {
	const { COPPERHEAD, TWOENGINECORDERSHIP, GOSPERGLIDERGUN, GLIDER, SIRROBIN, SNARKLOOP, ACHIMSP11} = GameOfLifePatterns;
	const { GAMEOFLIFE, PATHFINDING, SORTING } = GridMode;

	let newGrid = initialiseGrid(gridState);

	const handleModeChange = (event, setGridState, algorithmState, setAlgorithmState) => {
		switch (event.target.value) {
			case GAMEOFLIFE:
				const xOffset = COPPERHEAD.offset.x;
				const yOffset = COPPERHEAD.offset.y;
				newGrid = initialiseGridWithPattern(newGrid, COPPERHEAD, xOffset, yOffset);
				return changeMode(
					GAMEOFLIFE,
					newGrid,
					algorithmState.animateGameOfLife,
					setGridState,
					algorithmState.gameOfLife,
					setAlgorithmState
				);
			case PATHFINDING:
				return changeMode(
					PATHFINDING,
					newGrid,
					algorithmState.animatePathfinding,
					setGridState,
					algorithmState.djikstra,
					setAlgorithmState
				);
			case SORTING:
				return changeMode(
					SORTING,
					newGrid,
					null, // TODO: Update this line once sorting algorithms have been implemented
					setGridState,
					null,
					setAlgorithmState
				);
		}
	};

	const handlePatternChange = (event, setGridState) => {
		switch (event.target.value) {
			case COPPERHEAD:
				return changePattern(COPPERHEAD, newGrid, setGridState);
			case TWOENGINECORDERSHIP:
				return changePattern(TWOENGINECORDERSHIP, newGrid, setGridState);
			case GOSPERGLIDERGUN:
				return changePattern(GOSPERGLIDERGUN, newGrid, setGridState);
			case GLIDER:
				return changePattern(GLIDER, newGrid, setGridState);
			case SIRROBIN:
				return changePattern(SIRROBIN, newGrid, setGridState);
			case SNARKLOOP:
				return changePattern(SNARKLOOP, newGrid, setGridState);
			case ACHIMSP11: 
				return changePattern(ACHIMSP11, newGrid, setGridState);
		}
	};

	const changeMode = (newMode, newGrid, newAnimation, setGridState, newAlgorithm, setAlgorithmState) => {
		setGridState((prevGridState) => ({
			...prevGridState,
			grid: newGrid,
			mode: newMode,
		}));
		setAlgorithmState((prevAlgorithmState) => ({
			...prevAlgorithmState,
			currentAlgorithm: newAlgorithm,
			currentAnimation: newAnimation,
		}));
	};

	const changePattern = (newPattern, newGrid, setGridState, xOffset=0, yOffset=0) => {
		return setGridState((prevGridState) => ({
			...prevGridState,
			grid: initialiseGridWithPattern(newGrid, newPattern, xOffset, yOffset),
			pattern: newPattern,
		}));
	};

	return { handleModeChange, handlePatternChange };
};

