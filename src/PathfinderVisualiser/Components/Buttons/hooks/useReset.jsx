import { generateRandomUnsortedValues } from '../../../algorithms/Sorting/sortHelper';
import { GridMode } from '../../../../App';

export const useReset = () => {
	const handleReset = (initialiseGrid, gridState, setGridState) => {
		if (gridState.isAnimating) return;
		if (gridState.mode === GridMode.SORTING) {
			setGridState((prevState) => {
				return {
					...prevState,
					randomUnsortedValues: generateRandomUnsortedValues(),
					grid: initialiseGrid(prevState),
					needsReset: false,
					isAnimating: false,
				};
			});
		} else if (gridState.mode === GridMode.PATHFINDING) {
			resetAllNodes(gridState);
			return setGridState((prevState) => {
				return {
					...prevState,
					startNodeCol: 15,
					startNodeRow: 10,
					grid: initialiseGrid(prevState),
					needsReset: false,
					isAnimating: false,
				};
			});
		} else if (gridState.mode === GridMode.GAMEOFLIFE) {
			resetAllNodes();
			clearInterval(gridState.intervalId);
			return setGridState((prevState) => {
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
	const resetAllNodes = (gridState) => {
		gridState.grid.forEach((row) => {
			row.forEach((node) => {
				if (!node.isTarget && !node.isStart) {
					document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
				}
			});
		});
	};
	return { handleReset };
};
