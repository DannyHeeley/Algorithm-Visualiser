import { updateStateForStep } from "../sortHelper";

export const countingSort = (array, setAppState, animationSpeed) => {
	const maxValue = Math.max(...array);
	const counts = Array(maxValue + 1).fill(0);
	for (let i = 0; i < array.length; i++) {
		counts[array[i]]++;
	}
	let sortedIndex = 0;
	let currentIndex = 0;
	let sortingInterval = setInterval(() => {
		if (sortedIndex < array.length) {
			while (counts[sortedIndex] === 0) {
				sortedIndex++;
			}
			array[currentIndex] = sortedIndex;
			counts[sortedIndex]--;
			currentIndex++;
			updateStateForStep(setAppState, array, sortingInterval);
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return array;
};
