import { updateStateForStep } from "../sortHelper";

export const countingSort = (list, setAppState, animationSpeed) => {
	const maxValue = Math.max(...list);
	const counts = Array(maxValue + 1).fill(0);
	for (let i = 0; i < list.length; i++) {
		counts[list[i]]++;
	}
	let sortedIndex = 0;
	let currentIndex = 0;
	let sortingInterval = setInterval(() => {
		if (sortedIndex < list.length) {
			while (counts[sortedIndex] === 0) {
				sortedIndex++;
			}
			list[currentIndex] = sortedIndex;
			counts[sortedIndex]--;
			currentIndex++;
			updateStateForStep(setAppState, list, sortingInterval);
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return list;
};
