import { memo } from 'react';
import { useReset } from './hooks/useReset';

export const ResetButton = memo(({ initialiseGrid, appState, setAppState }) => {
	const handleReset = useReset(initialiseGrid, appState, setAppState);
	return (
		<button
			className='reset'
			onClick={handleReset}>
			Reset ⭯
		</button>
	);
});
