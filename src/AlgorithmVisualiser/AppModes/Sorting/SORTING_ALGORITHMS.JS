import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { quickSort } from './algorithms/quickSort';
import { heapSort } from './algorithms/heapSort';
import { selectionSort } from './algorithms/selectionSort';
import { combSort } from './algorithms/combsort';
import { gnomeSort } from './algorithms/gnomeSort';
import { bogoSort } from './algorithms/bogoSort';
import { countingSort } from './algorithms/countingSort';

export const SORTING_ALGORITHMS = {
	BUBBLE_SORT: {
		name: 'Bubble Sort',
		algorithm: bubbleSort,
		info: {
			'Bubble sort is a simple sorting algorithm that repeatedly steps through a list element by element, comparing the current element with the one after it, swapping their values if needed.':
				'sorting-info-text',
		},
	},
	QUICK_SORT: {
		name: 'Quick Sort',
		algorithm: quickSort,
		info: {
			'Quick sort uses a divide-and-conquer strategy. It does so by selecting a pivot element and then sorting values larger than it on one side and smaller to the other side, and then it repeats those steps until the array is sorted. It is useful for sorting big data sets.':
				'sorting-info-text',
		},
	},
	INSERTION_SORT: {
		name: 'Insertion Sort',
		algorithm: insertionSort,
		info: {
			'An insertion sort compares values in turn, starting with the second value in the list. If this value is greater than the value to the left of it, no changes are made. Otherwise this value is repeatedly moved left until it meets a value that is less than it.':
				'sorting-info-text',
		},
	},
	HEAP_SORT: {
		name: 'Heap Sort',
		algorithm: heapSort,
		info: {
			'Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to the selection sort where we first find the minimum element and place the minimum element at the beginning. Repeat the same process for the remaining elements.':
				'sorting-info-text',
		},
	},
	SELECTION_SORT: {
		name: 'Selection Sort',
		algorithm: selectionSort,
		info: {
			'Selection sort repeatedly selects the smallest (or largest) element from the unsorted portion of the list and swaps it with the first element of the unsorted part. This process is repeated for the remaining unsorted portion until the entire list is sorted.':
				'sorting-info-text',
		},
	},
	COMB_SORT: {
		name: 'Comb Sort',
		algorithm: combSort,
		info: {
			'A comparison-based sorting algorithm that is an improvement to bubble sort. In bubble sort, there is a comparison between elements to sort the given array - the gap size between the elements that are compared is 1. Comb sort improves the bubble sort by using a gap of size more than 1':
				'sorting-info-text',
		},
	},
	GNOME_SORT: {
		name: 'Gnome Sort',
		algorithm: gnomeSort,
		info: {
			'Here is how a garden gnome sorts a line of flower pots: he looks at the flower pot next to him and the previous one; if they are in the right order he steps one pot forward, otherwise, he swaps them and steps one pot backward. If there is no previous pot, he steps forwards; if there is no pot next to him, he is done.':
				'sorting-info-text',
		},
	},
	COUNTING_SORT: {
		name: 'Counting Sort',
		algorithm: countingSort,
		info: {
			'Counting Sort is a non-comparison sorting algorithm. It counts the frequency of each distinct element in the array and use this to place the elements in their correct sorted positions. It is particularly efficient when the range of input values is small compared to the number of elements.':
				'sorting-info-text',
		},
	},
	BOGO_SORT: {
		name: 'Bogo Sort',
		algorithm: bogoSort,
		info: {
			'BogoSort also known as stupid sort, slow sort, shotgun sort or monkey sort is the least effective algorithm one person can ever imagine. It is based on generate and test paradigm. The algorithm successively generates permutations of its input until it finds one that is sorted.':
				'sorting-info-text',
		},
	},
};
