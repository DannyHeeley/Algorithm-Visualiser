export const startGameOfLife = (
    gameOfLife,
    gridState,
    setGridState,
) => {
    const timeDelay = 1000;
    let generationsRemaining = gridState.maxGenerations;
    const intervalId = setInterval(() => {
        gameOfLife(gridState, setGridState)();
        generationsRemaining--;
        setGridState((prevState) => {
            return {
                ...prevState,
                currentTick: prevState.currentTick + 1,
                intervalId: intervalId,
            }
        })
        if (generationsRemaining === 0) {
            clearInterval(intervalId);
        }
    }, timeDelay);
};

