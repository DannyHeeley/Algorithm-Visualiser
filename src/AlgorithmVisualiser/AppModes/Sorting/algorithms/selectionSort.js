export const selectionSort = (list, setAppState) => {
	let i = 0;
	let minIndex = 0;

	let sortingInterval = setInterval(() => {
		if (i < list.length - 1) {
			minIndex = i;
			for (let j = i + 1; j < list.length; j++) {
				if (list[j] < list[minIndex]) {
					minIndex = j;
				}
			}
			if (minIndex !== i) {
				[list[minIndex], list[i]] = [list[i], list[minIndex]];
				setAppState((prevState) => ({
					...prevState,
					sortingArray: [...list],
					intervalId: sortingInterval,
				}));
			}
			i++;
		} else {
			clearInterval(sortingInterval);
		}
	}, 50);

	return list;
};
