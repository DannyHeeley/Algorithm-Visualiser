import { updateStateForStep, swapElementsAtIndices } from "../sortHelper";

export const insertionSort = (array, setAppState, animationSpeed) => {
	let i = 1;

	let sortingInterval = setInterval(() => {
		if (i < array.length) {
			let j = i - 1;
			while (j >= 0 && array[j] > array[j + 1]) {
				swapElementsAtIndices(array, j, j + 1);
				j--;
			}
			updateStateForStep(setAppState, array, sortingInterval);
			i++;
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);

	return array;
};

