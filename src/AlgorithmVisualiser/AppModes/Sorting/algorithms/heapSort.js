import { swapElementsAtIndices, updateStateForStep } from '../sortHelper';

export const heapSort = (array, setAppState, animationSpeed) => {
	let currentStep = 0;
	let sortingInterval;
	const steps = [];

	const buildMaxHeap = () => {
		const n = array.length;
		for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
			heapify(n, i);
		}
	};

	const heapify = (n, i) => {
		let largest = i;
		const left = 2 * i + 1;
		const right = 2 * i + 2;
		if (left < n && array[left] > array[largest]) {
			largest = left;
		}
		if (right < n && array[right] > array[largest]) {
			largest = right;
		}
		if (largest !== i) {
			swapElementsAtIndices(array, i, largest);
			heapify(n, largest);
		}
	};

	buildMaxHeap();

	const sortArray = () => {
		const n = array.length;
		for (let i = n - 1; i > 0; i--) {
			swapElementsAtIndices(array, 0, i);
			steps.push([...array]);
			heapify(i, 0);
		}
		steps.push([...array]);
	};

	sortArray();
	console.log(steps)
	sortingInterval = setInterval(() => {
		if (currentStep < steps.length) {
			updateStateForStep(setAppState, steps[currentStep], sortingInterval);
			currentStep++;
		} else {
			clearInterval(sortingInterval);
		}
	}, animationSpeed);

	return array;
};
