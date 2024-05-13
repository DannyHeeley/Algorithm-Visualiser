export const startSorting = (appState, setAppState) => {
	let list = appState.sortingArray;
	appState.CURRENT_ALGORITHM.algorithm(list, setAppState);
};
