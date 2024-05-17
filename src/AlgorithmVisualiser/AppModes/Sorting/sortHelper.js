export const generateRandomUnsortedArray = () => {
  const columnHeights = [];
  for (let i = 0; i < 50; i++) {
    columnHeights.push(Math.floor(Math.random() * (Math.floor(25) - 1) + 1));
  }
  return columnHeights;
};

export const updateStateForStep = (setAppState, array, sortingInterval) => {
	setAppState((prevState) => ({
		...prevState,
		randomValuesArray: [...array],
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

export const swapElementsAtIndices = (array, index1, index2) => {
	[array[index1], array[index2]] = [array[index2], array[index1]];
};