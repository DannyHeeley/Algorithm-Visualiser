
import { swapElementsAtIndices } from "../sortHelper";
import { updateStateForStep } from "../sortHelper";

export const gnomeSort = (array, setAppState, animationSpeed) => {
	let index = 0;
	let sortingInterval = setInterval(() => {
		if (index < array.length) {
			if (index === 0) {
				index++;
			}
			if (array[index] >= array[index - 1]) {
				index++;
			} else {
				swapElementsAtIndices(array, index, index - 1);
				index--;
				updateStateForStep(setAppState, array, sortingInterval);
			}
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return array;
};

