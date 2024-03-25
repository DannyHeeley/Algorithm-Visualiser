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
        if (generationsRemaining === 0) {
            clearInterval(intervalId);
        }
    }, timeDelay);
};

