import { setIsAnimating } from '../../Components/Buttons/hooks/useVisualise';

export const startGameOfLife = (
    gameOfLife,
    appState,
    setAppState,
) => {
    const timeDelay = 10000 / appState.animationSpeed;
    let generationsRemaining = appState.CURRENT_MODE.maxGenerations;
    const intervalId = setInterval(() => {
        gameOfLife(appState, setAppState)();
        generationsRemaining--;
        setAppState((prevState) => {
            return {
                ...prevState,
                currentTick: prevState.currentTick + 1,
                intervalId: intervalId,
            }
        })
		if (generationsRemaining === 0) {
			setIsAnimating(false, setAppState);
            clearInterval(intervalId);
        }
    }, timeDelay);
};

