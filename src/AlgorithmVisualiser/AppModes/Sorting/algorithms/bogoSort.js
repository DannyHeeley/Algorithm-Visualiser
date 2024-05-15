import { swapValues, updateStateForStep } from "../sortHelper";
import { isSorted } from "../sortHelper";

export const bogoSort = (list, setAppState, animationSpeed) => {
	const shuffle = (arr) => {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			swapValues(arr, i, j);
		}
		return arr;
	};
	let sortingInterval = setInterval(() => {
		if (!isSorted(list)) {
			list = shuffle([...list]);
			updateStateForStep(setAppState, list, sortingInterval);
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return list;
};
