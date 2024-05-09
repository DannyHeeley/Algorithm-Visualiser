import { useReset } from './hooks/useReset';

export const ResetButton = ({ initialiseGrid, appState, setAppState }) => {
	return (
		<button
			className='reset'
			onClick={useReset(initialiseGrid, appState, setAppState)}>
			Reset ⭯
		</button>
	);
};
