export const ToggleAlgorithmButton = ({ gridState, setGridState, algorithmState, setAlgorithmState }) => {
	const handleAlgorithmUpdate = () => {
		if (gridState.isAnimating || gridState.needsReset) return;
		handleChangeAlgorithmText(setGridState, gridState);
		handleChangeAlgorithm(setAlgorithmState, gridState, algorithmState);
	};

	return (
		<div className='toggle-algorithm'>
			<button
				className='toggle-algorithm-button'
				onClick={() => handleAlgorithmUpdate()}>
				&#129518;
			</button>
			<div className='algorithm-text'>
				Algorithm: <div className='text-value'>{gridState.algorithmNameText}</div>
			</div>
		</div>
	);
};

const handleChangeAlgorithm = (setAlgorithmState, gridState, algorithmState) => {
	setAlgorithmState((prevAlgorithmsState) => ({
		...prevAlgorithmsState,
		currentAlgorithm:
			gridState.algorithmNameText === "DIJKSTRA'S"
				? algorithmState.greedyBestFirst
				: gridState.algorithmNameText === 'GreedyBestFirst'
				? algorithmState.aStar4Way
				: gridState.algorithmNameText === 'A* 4-WAY'
				? algorithmState.aStar8Way
				: algorithmState.djikstra,
	}));
};

const handleChangeAlgorithmText = (setGridState, gridState) => {
	setGridState((prevGridState) => ({
		...prevGridState,
		algorithmNameText:
			gridState.algorithmNameText === "DIJKSTRA'S"
				? 'GreedyBestFirst'
				: gridState.algorithmNameText === 'GreedyBestFirst'
				? 'A* 4-WAY'
				: gridState.algorithmNameText === 'A* 4-WAY'
				? 'A* 8-WAY'
				: "DIJKSTRA'S",
	}));
};
