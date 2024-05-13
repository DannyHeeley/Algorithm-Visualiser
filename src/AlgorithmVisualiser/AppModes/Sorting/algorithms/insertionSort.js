export const insertionSort = (list, setAppState) => {
	let i = 1;

	let sortingInterval = setInterval(() => {
		if (i < list.length) {
			let currentValue = list[i];
			let j = i - 1;
			while (j >= 0 && list[j] > currentValue) {
				list[j + 1] = list[j];
				j--;
			}
			list[j + 1] = currentValue;
			setAppState((prevState) => ({
				...prevState,
				sortingArray: [...list],
				intervalId: sortingInterval,
			}));
			i++;
		} else {
			clearInterval(sortingInterval);
		}
	}, 50);

	return list;
};
