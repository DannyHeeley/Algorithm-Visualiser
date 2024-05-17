import { swapElementsAtIndices, updateStateForStep } from '../sortHelper';

export function quickSort(array, setAppState, animationSpeed) {
	animationSpeed = animationSpeed / 3;
	let stack = [];
	stack.push([0, array.length - 1]);

	let step = 0;
	let low = -1;
	let high = -1;
	let pivotIndex = -1;
	let pivot = -1;
	let i = -1;
	let j = -1;

	const sortingInterval = setInterval(() => {
		if (stack.length === 0 && step === 0) {
			clearInterval(sortingInterval);
			return;
		}

		// Initialize the partition, select the pivot, and prepare indices.
		if (step === 0) {
			if (stack.length === 0) {
				clearInterval(sortingInterval);
				return;
			}
			[low, high] = stack.pop();
			if (low < high) {
				pivotIndex = Math.floor(Math.random() * (high - low + 1)) + low;
				pivot = array[pivotIndex];
				swapElementsAtIndices(array, pivotIndex, high);
				updateStateForStep(setAppState, array, sortingInterval);
				pivotIndex = high;
				i = low - 1;
				j = low;
				step = 1;
			}
		}

		// Partition the array by comparing elements to the pivot and swapping when necessary.
		if (step === 1) {
			if (j < high) {
				if (array[j] < pivot) {
					i++;
					swapElementsAtIndices(array, i, j);
					updateStateForStep(setAppState, array, sortingInterval);
				}
				j++;
			} else {
				step = 2;
			}
		}

		// Place the pivot in its correct position and manage subarray boundaries for further sorting.
		if (step === 2) {
			i++;
			swapElementsAtIndices(array, i, pivotIndex);
			updateStateForStep(setAppState, array, sortingInterval);
			if (i - 1 > low) {
				stack.push([low, i - 1]);
			}
			if (i + 1 < high) {
				stack.push([i + 1, high]);
			}
			step = 0;
		}
	}, animationSpeed);
}
