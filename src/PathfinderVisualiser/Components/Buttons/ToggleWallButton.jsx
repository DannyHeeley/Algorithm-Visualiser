import { useState } from 'react';

export const ToggleWallButton = ({ appState, setAppState }) => {
	const [wallTypeText, setWallTypeText] = useState('Draw Walls');
	const [wallType, setWallType] = useState('wall-type-wall');
	const toggleWallType = () => {
		if (appState.isAnimating || appState.needsReset) return;
		if (wallTypeText === 'Draw Walls') {
			setWallTypeText('Draw Weight');
			setWallType('wall-type-weight');
		} else if (wallTypeText === 'Draw Weight') {
			setWallTypeText('Draw Walls');
			setWallType('wall-type-wall');
		}
		setAppState((prevState) => ({
			...prevState,
			isWallToggled: !prevState.isWallToggled,
		}));
	};
	return (
		<div className='toggle-wall'>
			<button
				className={wallType}
				onClick={toggleWallType}>
				<div className=''>&#9999;&#65039;</div>
			</button>
			<div className='toggle-text'>{wallTypeText}</div>
		</div>
	);
};
