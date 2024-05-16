import { toggleIsAnimating } from "../../../App";

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
			toggleIsAnimating(setAppState);
            clearInterval(intervalId);
        }
    }, timeDelay);
};

