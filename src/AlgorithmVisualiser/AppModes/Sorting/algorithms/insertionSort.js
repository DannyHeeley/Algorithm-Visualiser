import { updateStateForStep, swapValues } from "../sortHelper";

export const insertionSort = (list, setAppState) => {
	let i = 1;

	let sortingInterval = setInterval(() => {
		if (i < list.length) {
			let j = i - 1;
			while (j >= 0 && list[j] > list[j + 1]) {
				swapValues(list, j, j + 1);
				j--;
			}
			updateStateForStep(setAppState, list, sortingInterval);
			i++;
		} else {
			clearInterval(sortingInterval);
		}
	}, 100);

	return list;
};

