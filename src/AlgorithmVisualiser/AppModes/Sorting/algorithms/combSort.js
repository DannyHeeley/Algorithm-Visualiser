import { swapValues, updateStateForStep } from "../sortHelper";

export const combSort = (list, setAppState) => {
	const getNextGap = (gap) => {
		gap = Math.floor(gap / 1.3);
		return gap < 1 ? 1 : gap;
	};
	let gap = list.length;
	let swapped = true;
	let sortingInterval = setInterval(() => {
		if (gap > 1 || swapped) {
			gap = getNextGap(gap);
			swapped = false;
			for (let i = 0; i < list.length - gap; i++) {
				if (list[i] > list[i + gap]) {
					swapValues(list, i, i + gap)
					swapped = true;
					updateStateForStep(setAppState, list, sortingInterval);
				}
			}
		} else {
			clearInterval(sortingInterval);
		}
	}, 100);
	return list;
};
