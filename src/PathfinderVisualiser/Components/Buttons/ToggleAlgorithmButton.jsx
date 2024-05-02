import { useButtons } from "./hooks/useButtons";

export const ToggleAlgorithmButton = ({ appState, setAppState }) => {
const { handleAlgorithmUpdate } = useButtons(appState, setAppState);
	return (
		<div className='toggle-algorithm'>
			<button
				className='toggle-algorithm-button'
				onClick={() => handleAlgorithmUpdate()}>
				&#129518;
			</button>
			<div className='algorithm-text'>
				Algorithm: <div className='text-value'>{appState.algorithmButtonText}</div>
			</div>
		</div>
	);
};

