import { generateRandomUnsortedArray } from '../../../AppModes/Sorting/sortHelper';
import { APP_MODES } from '../../../AppModes/APP_MODES';
import { initialiseGridWithPattern } from '../../../AppModes/GameOfLife/patternHandler';
import { useNodeHelper } from '../../Grid/Node/useNodeHelper';
import { generateRandomGameOfLifePattern } from '../../../AppModes/GameOfLife/GAME_OF_LIFE_PATTERNS';

export const useReset = (initialiseGrid, appState, setAppState) => {

	const { initialiseNode } = useNodeHelper();
	const { PATHFINDING_MODE, SORTING_MODE, GAME_OF_LIFE_MODE } = APP_MODES;

	const handleReset = () => {
		switch (appState.CURRENT_MODE) {
			case SORTING_MODE:
				clearInterval(appState.intervalId);
				return setAppState((prevState) => {
					return {
						...prevState,
						randomValuesArray: generateRandomUnsortedArray(),
						grid: initialiseGrid(appState),
						needsReset: false,
						animationSpeed: 60,
						isAnimating: false,
					};
				});
			case PATHFINDING_MODE:
				clearInterval(appState.intervalId)
				resetAllNodes(appState);
				return setAppState((prevState) => {
					return {
						...prevState,
						grid: initialiseGrid(appState),
						needsReset: false,
						animationSpeed: 60,
						isAnimating: false,
					};
				});
			case GAME_OF_LIFE_MODE:
				clearInterval(appState.intervalId);
				if (appState.CURRENT_PATTERN === GAME_OF_LIFE_MODE.PATTERNS.RANDOM) {
					appState.CURRENT_PATTERN.pattern = generateRandomGameOfLifePattern();
				}
				return setAppState((prevState) => {
					return {
						...prevState,
						grid: initialiseGridWithPattern(appState.CURRENT_PATTERN, initialiseGrid(appState)),
						needsReset: false,
						isAnimating: false,
						animationSpeed: 60,
						currentTick: 0,
					};
				});
		}
	};
	
	const resetAllNodes = (appState) => {
		appState.grid.forEach((row) => {
			row.forEach((node) => {
				if (!node.isTarget && !node.isStart) {
					initialiseNode(node.col, row, appState);
				}
			});
		});
	};

	return handleReset;
};

