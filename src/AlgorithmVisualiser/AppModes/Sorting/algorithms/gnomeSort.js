
import { swapValues } from "../sortHelper";
import { updateStateForStep } from "../sortHelper";

export const gnomeSort = (list, setAppState) => {
	let index = 0;
	let sortingInterval = setInterval(() => {
		if (index < list.length) {
			if (index === 0 ) {
				index++;
			}
			if (list[index] >= list[index - 1]) {
				index++
			} else {
				swapValues(list, index, index - 1);
				index--;
				updateStateForStep(setAppState, list, sortingInterval);
			}
		} else {
			clearInterval(sortingInterval);
		}
	}, 100);
	return list;
};

