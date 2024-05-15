export const startSorting = (appState, setAppState) => {
	const animationSpeed = 2000 / appState.animationSpeed;
	const list = appState.sortingArray;
	appState.CURRENT_ALGORITHM.algorithm(list, setAppState, animationSpeed);
};
