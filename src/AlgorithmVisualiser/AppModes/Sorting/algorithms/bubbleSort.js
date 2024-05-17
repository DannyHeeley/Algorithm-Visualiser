import { swapElementsAtIndices, updateStateForStep } from "../sortHelper";

export const bubbleSort = (array, setAppState, animationSpeed) => {
	let i = 0;
	let j = 0;
	let sortingInterval = setInterval(() => {
		if (i < array.length - 1) {
			if (j < array.length - 1 - i) {
				if (array[j] > array[j + 1]) {
					swapElementsAtIndices(array, j, j + 1);
					updateStateForStep(setAppState, array, sortingInterval);
				}
				j++;
			} else {
				i++;
				j = 0;
			}
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return array;
};

