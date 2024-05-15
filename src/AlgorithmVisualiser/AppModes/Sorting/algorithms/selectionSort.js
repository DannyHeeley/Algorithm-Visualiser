import { updateStateForStep } from "../sortHelper";

export const selectionSort = (list, setAppState, animationSpeed) => {
	let i = 0;
	let indexOfMinimumVal = 0;

	let sortingInterval = setInterval(() => {
		if (i < list.length - 1) {
			indexOfMinimumVal = i;
			for (let j = i + 1; j < list.length; j++) {
				if (list[j] < list[indexOfMinimumVal]) {
					indexOfMinimumVal = j;
				}
			}
			if (indexOfMinimumVal !== i) {
				[list[indexOfMinimumVal], list[i]] = [list[i], list[indexOfMinimumVal]];
				updateStateForStep(setAppState, list, sortingInterval);
			}
			i++;
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);

	return list;
};
