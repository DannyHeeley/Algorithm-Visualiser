import { initialiseGrid } from '../../../../App';
import { initialiseGridWithPattern } from '../../../AppModes/GameOfLife/patternHandler';
import { APP_MODES } from '../../../AppModes/APP_MODES';

export const useSelector = (appState, setAppState) => {
	const { PATHFINDING_MODE, GAME_OF_LIFE_MODE, SORTING_MODE } = APP_MODES;
	const { COPPERHEAD, TWO_ENGINE_CORDERSHIP, GOSPER_GLIDER_GUN, GLIDER, SIR_ROBIN, SNARK_LOOP, ACHIMSP11 } = GAME_OF_LIFE_MODE.PATTERNS;
	const DJIKSTRA = PATHFINDING_MODE.ALGORITHMS;
	const gameOfLife = GAME_OF_LIFE_MODE.algorithm;
	
	let newGrid = initialiseGrid(appState);

	const handleModeChange = (event) => {
		switch (event.target.value) {
			case GAME_OF_LIFE_MODE:
				initialiseGridWithPattern(appState.CURRENT_PATTERN, newGrid);
				changeMode(GAME_OF_LIFE_MODE, gameOfLife, newGrid);
				return;
			case PATHFINDING_MODE:
				return changeMode(PATHFINDING_MODE, DJIKSTRA, newGrid);
			case SORTING_MODE:
				return changeMode(
					SORTING_MODE,
					null, // TODO: Update this line once sorting APP_MODES have been implemented
					newGrid
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

	const changeMode = (newMode, newAlgorithm, newGrid) => {
		return setAppState((prevState) => ({
			...prevState,
			grid: newGrid,
			currentMode: newMode,
			currentAlgorithm: newAlgorithm,
			isStartNodeSet: newMode === PATHFINDING_MODE ? true : false,
			isTargetNodeSet: newMode === PATHFINDING_MODE ? true : false,
		}));
	};

	const changePattern = (newPatternObj) => {
		return setAppState((prevState) => ({
			...prevState,
			grid: initialiseGridWithPattern(newPatternObj, newGrid),
			CURRENT_PATTERN: newPatternObj,
		}));
	};
	return { handleModeChange, handlePatternChange };
};

// function logAllNodesThatAreCell(newGrid) {
// 	newGrid.forEach((row) => row.filter((node) => node.isAutomata).forEach((cell) => console.log("in handleModeChange: ", cell)));
// }

