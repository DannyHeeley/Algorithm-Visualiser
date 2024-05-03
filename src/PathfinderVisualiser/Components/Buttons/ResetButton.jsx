import { useReset } from './hooks/useReset';

export const ResetButton = ({ initialiseGrid, appState, setAppState }) => {
	const { handleReset } = useReset();
	return (
		<button
			className='reset'
			onClick={() => {
				handleReset(initialiseGrid, appState, setAppState);
			}}>
			Reset ⭯
		</button>
	);
};
