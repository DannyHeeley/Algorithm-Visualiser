export const generateRandomUnsortedValues = () => {
  const columnHeights = [];
  for (let i = 0; i < 50; i++) {
    columnHeights.push(Math.floor(Math.random() * (Math.floor(25) - 1) + 1));
  }
  return columnHeights;
};

export const updateStateForStep = (setAppState, list, sortingInterval) => {
	setAppState((prevState) => ({
		...prevState,
		sortingArray: [...list],
		intervalId: sortingInterval,
	}));
};

export const isSorted = (arr) => {
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < arr[i - 1]) {
			return false;
		}
	}
	return true;
};

export const swapValues = (list, index1, index2) => {
	[list[index1], list[index2]] = [list[index2], list[index1]];
};