import { initialiseGrid } from '../../../../App';
import { initialiseGridWithPattern } from '../../../AppModes/GameOfLife/patternHandler';
import { APP_MODES } from '../../../AppModes/APP_MODES';

export const usePatternSelector = (appState, setAppState) => {
	const { GAME_OF_LIFE_MODE } = APP_MODES;
	const {
		COPPERHEAD,
		GOSPER_GLIDER_GUN,
		GLIDER,
		SNARK_LOOP,
		ACHIMSP11,
		NO_PATTERN,
		RANDOM,
		AIRFORCE,
		P208PIHEPTOMINOHASSLER,
		WORKER_BEE,
		FIREWORK,
		HEART,
	} = GAME_OF_LIFE_MODE.PATTERNS;

	let newGrid = initialiseGrid(appState);

	const handlePatternChange = (event) => {
		switch (event.target.value) {
			case NO_PATTERN:
				return changePattern(NO_PATTERN);
			case RANDOM:
				return changePattern(RANDOM);
			case COPPERHEAD:
				return changePattern(COPPERHEAD);
			case GOSPER_GLIDER_GUN:
				return changePattern(GOSPER_GLIDER_GUN);
			case GLIDER:
				return changePattern(GLIDER);
			case SNARK_LOOP:
				return changePattern(SNARK_LOOP);
			case ACHIMSP11:
				return changePattern(ACHIMSP11);
			case AIRFORCE:
				return changePattern(AIRFORCE);
			case P208PIHEPTOMINOHASSLER:
				return changePattern(P208PIHEPTOMINOHASSLER);
			case WORKER_BEE:
				return changePattern(WORKER_BEE);
			case FIREWORK:
				return changePattern(FIREWORK);
			case HEART:
				return changePattern(HEART);
		}
	};

	const changePattern = (newPatternObj) => {
		clearInterval(appState.intervalId);
		return setAppState((prevState) => ({
			...prevState,
			grid: initialiseGridWithPattern(newPatternObj, newGrid),
			CURRENT_PATTERN: newPatternObj,
			needsReset: false,
			isAnimating: false,
			currentTick: 0,
		}));
	};

	return handlePatternChange ;
};


