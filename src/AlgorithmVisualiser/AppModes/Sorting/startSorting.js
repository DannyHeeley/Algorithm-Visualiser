export const startSorting = (appState, setAppState) => {
	const animationSpeed = 4000 / appState.animationSpeed;
	const array = appState.sortingArray;
	appState.CURRENT_ALGORITHM.algorithm(array, setAppState, animationSpeed);
};
