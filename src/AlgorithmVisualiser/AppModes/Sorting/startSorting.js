export const startSorting = (appState, setAppState) => {
	const animationSpeed = 4000 / appState.animationSpeed;
	const array = appState.randomValuesArray;
	appState.CURRENT_ALGORITHM.algorithm(array, setAppState, animationSpeed);
};
