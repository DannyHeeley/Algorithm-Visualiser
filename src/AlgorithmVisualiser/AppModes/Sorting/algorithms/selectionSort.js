import { updateStateForStep } from "../sortHelper";

export const selectionSort = (array, setAppState, animationSpeed) => {
	let i = 0;
	let indexOfMinimumVal = 0;

	let sortingInterval = setInterval(() => {
		if (i < array.length - 1) {
			indexOfMinimumVal = i;
			for (let j = i + 1; j < array.length; j++) {
				if (array[j] < array[indexOfMinimumVal]) {
					indexOfMinimumVal = j;
				}
			}
			if (indexOfMinimumVal !== i) {
				[array[indexOfMinimumVal], array[i]] = [array[i], array[indexOfMinimumVal]];
				updateStateForStep(setAppState, array, sortingInterval);
			}
			i++;
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);

	return array;
};
