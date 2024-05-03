import { generateRandomUnsortedValues } from '../../../AppModes/Sorting/sortHelper';
import { GridModes } from '../../../../App';

export const useReset = () => {
	const { PATHFINDING_MODE, SORTING_MODE, GAME_OF_LIFE_MODE } = GridModes;
	const handleReset = (initialiseGrid, appState, setAppState) => {
		if (appState.isAnimating) return;
		if (appState.currentMode === SORTING_MODE) {
			setAppState((prevState) => {
				return {
					...prevState,
					randomUnsortedValues: generateRandomUnsortedValues(),
					grid: initialiseGrid(prevState),
					needsReset: false,
					isAnimating: false,
				};
			});
		} else if (appState.currentMode === PATHFINDING_MODE) {
			resetAllNodes(appState);
			setAppState((prevState) => {
				return {
					...prevState,
					startNodeCol: 13,
					startNodeRow: 13,
					targetNodeCol: 34,
					targetNodeRow: 13,
					grid: initialiseGrid(prevState),
					needsReset: false,
					isAnimating: false,
				};
			});
		} else if (appState.currentMode === GAME_OF_LIFE_MODE) {
			resetAllNodes();
			clearInterval(appState.intervalId);
			setAppState((prevState) => {
				return {
					...prevState,
					grid: initialiseGrid(prevState),
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
	return { handleReset };
};
