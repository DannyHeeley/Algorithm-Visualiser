
import { useToggleDrawType } from './hooks/useToggleDrawType'

export const DrawTypeButton = ({ appState, setAppState }) => {
	const { changeDrawType, drawTypeClassName, drawTypeText } = useToggleDrawType(appState, setAppState);
	return (
		<div className='draw-type'>
			<button
				className={drawTypeClassName}
				onClick={changeDrawType}>
				<div>&#9999;&#65039;</div>
			</button>
			<div className='draw-type-text'>{drawTypeText}</div>
		</div>
	);
};
