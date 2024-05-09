import { toggleIsAnimating } from "../../../App";

export const animateGameOfLife = (
    gameOfLife,
    appState,
    setAppState,
) => {
    const timeDelay = 500;
    let generationsRemaining = appState.maxGenerations;
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

