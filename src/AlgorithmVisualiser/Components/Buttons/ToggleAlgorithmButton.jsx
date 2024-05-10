import { useAlgorithmUpdate } from "./hooks/useAlgorithmUpdate";

export const ToggleAlgorithmButton = ({ appState, setAppState }) => {
	return (
		<div className='toggle-algorithm'>
			<button
				className='toggle-algorithm-button'
				onClick={useAlgorithmUpdate(appState, setAppState)}>
				&#129518;
			</button>
			<div className='algorithm-text'>
				Algorithm: <div className='text-value'>{appState.CURRENT_ALGORITHM.name}</div>
			</div>
		</div>
	);
};

// TODO: This is likely the cause of broken visualise button