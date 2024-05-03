import { initialiseGrid } from '../../../../App';
import { initialiseGridWithPattern } from '../../../AppModes/GameOfLife/patternHandler';
import { GridModes } from '../../../../App';

export const useSelector = (appState, setAppState) => {
	const { PATHFINDING_MODE, GAME_OF_LIFE_MODE, SORTING_MODE } = GridModes;
	const { COPPERHEAD, TWO_ENGINE_CORDERSHIP, GOSPER_GLIDER_GUN, GLIDER, SIR_ROBIN, SNARK_LOOP, ACHIMSP11 } = GAME_OF_LIFE_MODE.PATTERNS;
	const DJIKSTRA = PATHFINDING_MODE.ALGORITHMS;
	const animatePathfinding = PATHFINDING_MODE;
	const gameOfLife = GAME_OF_LIFE_MODE.algorithm;
	const animateGameOfLife = GAME_OF_LIFE_MODE.animation;

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
					null // TODO: Update this line once sorting AppModes have been implemented
				);
		}
	};

	const handlePatternChange = (event) => {
		switch (event.target.value) {
			case COPPERHEAD:
				return changePattern(COPPERHEAD);
			case TWO_ENGINE_CORDERSHIP:
				return changePattern(TWO_ENGINE_CORDERSHIP);
			case GOSPER_GLIDER_GUN:
				return changePattern(GOSPER_GLIDER_GUN);
			case GLIDER:
				return changePattern(GLIDER);
			case SIR_ROBIN:
				return changePattern(SIR_ROBIN);
			case SNARK_LOOP:
				return changePattern(SNARK_LOOP);
			case ACHIMSP11:
				return changePattern(ACHIMSP11);
		}
	};

	const changeMode = (newMode, newAlgorithm, newAnimation) => {
		let newGrid = initialiseGrid(appState);
		console.log(COPPERHEAD)
		setAppState((prevState) => ({
			...prevState,
			grid:
				newMode === GAME_OF_LIFE_MODE
					? initialiseGridWithPattern(COPPERHEAD, newGrid)
					: newGrid,
			currentMode: newMode,
			currentAlgorithm: newAlgorithm,
			currentAnimation: newAnimation,
		}));
	};

	const changePattern = (newPatternObj) => {
		return setAppState((prevState) => ({
			...prevState,
			grid: initialiseGridWithPattern(newPatternObj, initialiseGrid(appState)),
			currentPattern: newPattern,
		}));
	};

	return { handleModeChange, handlePatternChange };
};
