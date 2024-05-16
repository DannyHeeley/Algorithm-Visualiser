import { memo } from 'react';
import { useDrawTypeUpdate } from './hooks/useDrawTypeUpdate';

export const DrawTypeButton = memo(({ appState, setAppState }) => {
	const { changeDrawType } = useDrawTypeUpdate(appState, setAppState);
	return (
		<div className='draw-type'>
			<button
				className={appState.DRAW_TYPE.classname}
				onClick={changeDrawType}>
				<div>&#9999;&#65039;</div>
			</button>
			<div className='draw-type-text'>{appState.DRAW_TYPE.name}</div>
		</div>
	);
});
