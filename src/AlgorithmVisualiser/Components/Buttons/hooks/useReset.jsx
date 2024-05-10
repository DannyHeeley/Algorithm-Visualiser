import { generateRandomUnsortedValues } from '../../../AppModes/Sorting/sortHelper';
import { AppModes } from '../../../AppModes/AppModes';
import { initialiseGridWithPattern } from '../../../AppModes/GameOfLife/patternHandler';

export const useReset = (initialiseGrid, appState, setAppState) => {
	const { PATHFINDING_MODE, SORTING_MODE, GAME_OF_LIFE_MODE } = AppModes;
	
	const handleReset = () => {
		switch (appState.currentMode) {
			case SORTING_MODE:
				return setAppState((prevState) => {
					return {
						...prevState,
						randomUnsortedValues: generateRandomUnsortedValues(),
						grid: initialiseGrid(appState),
						needsReset: false,
						isAnimating: false,
					};
				});
			case PATHFINDING_MODE:
				if (appState.isAnimating) return;
				resetAllNodes(appState);
				return setAppState((prevState) => {
					return {
						...prevState,
						startNodeCol: 13,
						startNodeRow: 13,
						targetNodeCol: 34,
						targetNodeRow: 13,
						grid: initialiseGrid(appState),
						needsReset: false,
						isAnimating: false,
					};
				});
			case GAME_OF_LIFE_MODE:
				clearInterval(appState.intervalId);
				return setAppState((prevState) => {
					return {
						...prevState,
						grid: initialiseGridWithPattern(appState.CURRENT_PATTERN, initialiseGrid(appState)),
						needsReset: false,
						isAnimating: false,
						currentTick: 0,
					};
				});
		}
	};
	
	const resetAllNodes = (appState) => {
		appState.grid.forEach((row) => {
			row.forEach((node) => {
				if (!node.isTarget && !node.isStart) {
					document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
				}
			});
		});
	};
	return handleReset;
};
