
import { useToggleDrawType } from './hooks/useToggleDrawType'

export const DrawTypeButton = ({ appState, setAppState }) => {
	const { changeDrawType } = useToggleDrawType(appState, setAppState);
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
};
