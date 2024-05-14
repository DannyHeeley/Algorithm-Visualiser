import { swapValues, updateStateForStep } from "../sortHelper";

export const bubbleSort = (list, setAppState) => {
	let i = 0;
	let j = 0;
	let sortingInterval = setInterval(() => {
		if (i < list.length - 1) {
			if (j < list.length - 1 - i) {
				if (list[j] > list[j + 1]) {
					swapValues(list, j, j + 1)
					updateStateForStep(setAppState, list, sortingInterval);
				}
				j++;
			} else {
				i++;
				j = 0;
			}
		} else {
			clearInterval(sortingInterval);
		}
	}, 100);	
	return list;
};

