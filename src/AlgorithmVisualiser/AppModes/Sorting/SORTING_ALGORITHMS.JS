import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import { selectionSort } from "./algorithms/selectionSort";

export const SORTING_ALGORITHMS = {
	BUBBLE_SORT: {
		name: 'Bubble Sort',
		algorithm: bubbleSort,
	},
	QUICK_SORT: {
		name: 'Quick Sort',
		algorithm: quickSort,
	},
	INSERTION_SORT: {
		name: 'Insertion Sort',
		algorithm: insertionSort,
	},
	MERGE_SORT: {
		name: 'Merge Sort',
		algorithm: mergeSort,
	},
	SELECTION_SORT: {
		name: 'Selection Sort',
		algorithm: selectionSort,
	}
}