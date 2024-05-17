import { swapElementsAtIndices, updateStateForStep } from "../sortHelper";
import { isSorted } from "../sortHelper";

export const bogoSort = (array, setAppState, animationSpeed) => {
	const shuffle = (arr) => {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			swapElementsAtIndices(arr, i, j);
		}
		return arr;
	};
	let sortingInterval = setInterval(() => {
		if (!isSorted(array)) {
			array = shuffle([...array]);
			updateStateForStep(setAppState, array, sortingInterval);
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return array;
};
