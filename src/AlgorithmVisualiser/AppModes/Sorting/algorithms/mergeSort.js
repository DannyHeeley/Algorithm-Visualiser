export const mergeSort = (list, setAppState) => {
	const merge = (left, right) => {
		let result = [];
		let leftIndex = 0;
		let rightIndex = 0;

		while (leftIndex < left.length && rightIndex < right.length) {
			if (left[leftIndex] < right[rightIndex]) {
				result.push(left[leftIndex]);
				leftIndex++;
			} else {
				result.push(right[rightIndex]);
				rightIndex++;
			}
		}

		return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
	};

	const mergeSortRec = (array) => {
		if (array.length <= 1) {
			return array;
		}

		const middle = Math.floor(array.length / 2);
		const left = array.slice(0, middle);
		const right = array.slice(middle);

		return merge(mergeSortRec(left), mergeSortRec(right));
	};

	let sortingInterval = setInterval(() => {
		if (list.length > 1) {
			list = mergeSortRec(list);
			setAppState((prevState) => ({
				...prevState,
				sortingArray: [...list],
				intervalId: sortingInterval,
			}));
			clearInterval(sortingInterval);
		}
	}, 50);

	return list;
};
