import { useAlgorithmUpdate } from "./hooks/useAlgorithmUpdate";

export const ToggleAlgorithmButton = ({ appState, setAppState }) => {
	const handleAlgorithmUpdate = useAlgorithmUpdate(appState, setAppState);
	return (
		<div className='toggle-algorithm'>
			<button
				className='toggle-algorithm-button'
				onClick={handleAlgorithmUpdate}>
				&#129518;
			</button>
			<div className='algorithm-text'>
				Algorithm: <div className='text-value'>{appState.CURRENT_ALGORITHM.name}</div>
			</div>
		</div>
	);
};
