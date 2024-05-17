import { swapElementsAtIndices, updateStateForStep } from "../sortHelper";

export const combSort = (array, setAppState, animationSpeed) => {
	const getNextGap = (gap) => {
		gap = Math.floor(gap / 1.3);
		return gap < 1 ? 1 : gap;
	};
	let gap = array.length;
	let swapped = true;
	let sortingInterval = setInterval(() => {
		if (gap > 1 || swapped) {
			gap = getNextGap(gap);
			swapped = false;
			for (let i = 0; i < array.length - gap; i++) {
				if (array[i] > array[i + gap]) {
					swapElementsAtIndices(array, i, i + gap);
					swapped = true;
					updateStateForStep(setAppState, array, sortingInterval);
				}
			}
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return array;
};
