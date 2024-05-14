import { initialiseGrid } from '../../../../App';
import { initialiseGridWithPattern } from '../../../AppModes/GameOfLife/patternHandler';
import { APP_MODES } from '../../../AppModes/APP_MODES';

//TODO: Split into two hooks, usePatternSelector and useModeSelector

export const usePatternSelector = (appState, setAppState) => {
	const { GAME_OF_LIFE_MODE } = APP_MODES;
	const { COPPERHEAD, TWO_ENGINE_CORDERSHIP, GOSPER_GLIDER_GUN, GLIDER, SIR_ROBIN, SNARK_LOOP, ACHIMSP11, NO_PATTERN } = GAME_OF_LIFE_MODE.PATTERNS;

	let newGrid = initialiseGrid(appState);

	const handlePatternChange = (event) => {
		switch (event.target.value) {
			case NO_PATTERN:
				return changePattern(NO_PATTERN);
			case COPPERHEAD:
				return changePattern(COPPERHEAD);
			case TWO_ENGINE_CORDERSHIP:
				return changePattern(TWO_ENGINE_CORDERSHIP);
			case GOSPER_GLIDER_GUN:
				return changePattern(GOSPER_GLIDER_GUN);
			case GLIDER:
				return changePattern(GLIDER);
			case SIR_ROBIN:
				return changePattern(SIR_ROBIN);
			case SNARK_LOOP:
				return changePattern(SNARK_LOOP);
			case ACHIMSP11:
				return changePattern(ACHIMSP11);
		}
	};

	const changePattern = (newPatternObj) => {
		return setAppState((prevState) => ({
			...prevState,
			grid: initialiseGridWithPattern(newPatternObj, newGrid),
			CURRENT_PATTERN: newPatternObj,
		}));
	};

	return handlePatternChange ;
};


