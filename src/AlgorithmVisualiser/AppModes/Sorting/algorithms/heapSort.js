import { updateStateForStep } from "../sortHelper";

export const heapSort = (list, setAppState, animationSpeed) => {
	buildMaxHeap(list, setAppState);

	let n = list.length;

	let sortingInterval = setInterval(() => {
		if (n > 1) {
			// Swap root (max element) with last element
			[list[0], list[n - 1]] = [list[n - 1], list[0]];
			n--;
			heapify(list, n, 0, setAppState);
			updateStateForStep(setAppState, list, sortingInterval);
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);
	return list;
};

const buildMaxHeap = (arr, setAppState) => {
	const n = arr.length;
	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(arr, n, i, setAppState);
	}
};

const heapify = (arr, n, i, setAppState) => {
	let largest = i;
	const left = 2 * i + 1;
	const right = 2 * i + 2;
	if (left < n && arr[left] > arr[largest]) {
		largest = left;
	}
	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}
	if (largest !== i) {
		[arr[i], arr[largest]] = [arr[largest], arr[i]];
		heapify(arr, n, largest, setAppState);
	}
};
