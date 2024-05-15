import { swapValues, updateStateForStep } from "../sortHelper";

export async function quickSort(list, setAppState, animationSpeed) {
	async function partition(low, high) {
		let pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
		let pivot = list[pivotIndex];
		swapValues(list, pivotIndex, high);
		pivotIndex = high;

		let i = low - 1;
		for (let j = low; j < high; j++) {
			if (list[j] < pivot) {
				i++;
				swapValues(list, i, j);
				await new Promise((resolve) => setTimeout(resolve, animationSpeed));
				updateStateForStep(setAppState, list);
			}
		}
		i++;
		swapValues(list, i, pivotIndex); // Move pivot to its final position
		await new Promise((resolve) => setTimeout(resolve, animationSpeed));
		updateStateForStep(setAppState, list);
		return i;
	}

	async function sort(low, high) {
		if (low < high) {
			let pi = await partition(low, high);
			await sort(low, pi - 1);
			await sort(pi + 1, high);
		}
	}

	await sort(0, list.length - 1);
}
