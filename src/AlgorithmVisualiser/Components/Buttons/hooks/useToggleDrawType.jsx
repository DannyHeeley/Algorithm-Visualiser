import { APP_MODES } from '../../../AppModes/APP_MODES';

export const useToggleDrawType = (appState, setAppState) => {

	const { WALL, WEIGHTED } = APP_MODES.PATHFINDING_MODE.DRAW_TYPE;

	const changeDrawType = () => {
		if (appState.DRAW_TYPE === WALL) {
			updateDrawType(WEIGHTED);
		} else {
			updateDrawType(WALL);
		}
	};

	const updateDrawType = (newDrawType) => {
		setAppState((prevState) => ({
			...prevState,
			DRAW_TYPE: newDrawType,
		}));
	};
	
	return { changeDrawType };
};
