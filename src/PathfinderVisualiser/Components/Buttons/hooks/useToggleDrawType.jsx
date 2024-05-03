import { useState } from 'react';

export const useToggleDrawType = (appState, setAppState) => {
	const [drawTypeText, setDrawTypeText] = useState('Draw Walls');
	const [drawTypeClassName, setDrawTypeClassName] = useState('draw-type-wall');

	const changeDrawType = () => {
		if (appState.isAnimating || appState.needsReset) return;
		if (appState.drawType === 'wall') {
			updateDrawType('weight', 'Draw Weight', 'draw-type-weight');
		} else {
			updateDrawType('wall', 'Draw Walls', 'draw-type-wall');
		}
	};

	const updateDrawType = (newDrawType, newText, newClassName) => {
		setDrawTypeText(newText);
		setDrawTypeClassName(newClassName);
		setAppState((prevState) => ({
			...prevState,
			drawType: newDrawType,
		}));
	};
	
	return { changeDrawType, drawTypeClassName, drawTypeText };
};
