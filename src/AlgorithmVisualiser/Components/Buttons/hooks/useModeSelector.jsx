import { initialiseGrid } from '../../../../App';
import { APP_MODES } from '../../../AppModes/APP_MODES';

export const useModeSelector = (appState, setAppState) => {

	const { PATHFINDING_MODE, GAME_OF_LIFE_MODE, SORTING_MODE } = APP_MODES;
	const { DJIKSTRA } = PATHFINDING_MODE.ALGORITHMS;
	const { BUBBLE_SORT } = SORTING_MODE.ALGORITHMS;
	const gameOfLife = GAME_OF_LIFE_MODE.algorithm;
	let newGrid = initialiseGrid(appState);

	const handleModeChange = (event) => {
		switch (event.target.value) {
			case GAME_OF_LIFE_MODE:
				return changeMode(GAME_OF_LIFE_MODE, gameOfLife, newGrid);
			case PATHFINDING_MODE:
				return changeMode(PATHFINDING_MODE, DJIKSTRA, newGrid);
			case SORTING_MODE:
				return changeMode(SORTING_MODE, BUBBLE_SORT, newGrid);
		}
	
	};

	const changeMode = (newMode, newAlgorithm, newGrid) => {
		clearInterval(appState.intervalId);
		return setAppState((prevState) => ({
			...prevState,
			grid: newGrid,
			CURRENT_MODE: newMode,
			CURRENT_ALGORITHM: newAlgorithm,
			isStartNodeSet: newMode === PATHFINDING_MODE ? true : false,
			isTargetNodeSet: newMode === PATHFINDING_MODE ? true : false,
		}));
	};

	return handleModeChange;
};


