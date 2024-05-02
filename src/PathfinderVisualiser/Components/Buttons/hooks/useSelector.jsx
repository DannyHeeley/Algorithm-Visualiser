import { initialiseGrid } from '../../../../App';
import { initialiseGridWithPattern } from '../../../algorithms/GameOfLife/patternHandler';
import { GridModes } from '../../../../App';

export const useSelector = (appState, setAppState) => {
	const { PATHFINDING_MODE, GAME_OF_LIFE_MODE, SORTING_MODE } = GridModes;
	const { COPPERHEAD, TWOENGINECORDERSHIP, GOSPERGLIDERGUN, GLIDER, SIRROBIN, SNARKLOOP, ACHIMSP11 } = GAME_OF_LIFE_MODE.PATTERNS;
	const { gameOfLife, animateGameOfLife } = GAME_OF_LIFE_MODE;
	const DJIKSTRA = PATHFINDING_MODE.ALGORITHMS;
	const animatePathfinding = PATHFINDING_MODE;

	const handleModeChange = (event) => {
		switch (event.target.value) {
			case GAME_OF_LIFE_MODE:
				return changeMode(GAME_OF_LIFE_MODE, gameOfLife, animateGameOfLife);
			case PATHFINDING_MODE:
				return changeMode(PATHFINDING_MODE, DJIKSTRA, animatePathfinding);
			case SORTING_MODE:
				return changeMode(
					SORTING_MODE,
					null,
					null // TODO: Update this line once sorting algorithms have been implemented
				);
		}
	};

	const handlePatternChange = (event) => {
		switch (event.target.value) {
			case COPPERHEAD:
				return changePattern(COPPERHEAD);
			case TWOENGINECORDERSHIP:
				return changePattern(TWOENGINECORDERSHIP);
			case GOSPERGLIDERGUN:
				return changePattern(GOSPERGLIDERGUN);
			case GLIDER:
				return changePattern(GLIDER);
			case SIRROBIN:
				return changePattern(SIRROBIN);
			case SNARKLOOP:
				return changePattern(SNARKLOOP);
			case ACHIMSP11:
				return changePattern(ACHIMSP11);
		}
	};

	const changeMode = (newMode, newAlgorithm, newAnimation) => {
		setAppState((prevState) => ({
			...prevState,
			grid:
				newMode === GAME_OF_LIFE_MODE
					? initialiseGridWithPattern(COPPERHEAD, prevState, COPPERHEAD.offset.x, COPPERHEAD.offset.y)
					: initialiseGrid(prevState),
			currentMode: newMode,
			currentAlgorithm: newAlgorithm,
			currentAnimation: newAnimation,
		}));
	};

	const changePattern = (newPattern, xOffset = 0, yOffset = 0) => {
		return setAppState((prevState) => ({
			...prevState,
			grid: initialiseGridWithPattern(newPattern, prevState, xOffset, yOffset),
			currentPattern: newPattern,
		}));
	};

	return { handleModeChange, handlePatternChange };
};
