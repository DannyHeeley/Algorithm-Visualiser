export const startGameOfLife = (
    gameOfLife,
    gridState,
    setGridState,
) => {
    const timeDelay = 1000;
    let generationsRemaining = gridState.maxGenerations;
    const intervalId = setInterval(() => {
        // To get this workiing i think i need to change the value of key to force a re-render!
        gameOfLife(gridState, setGridState)();
        generationsRemaining--;
        console.log(generationsRemaining)
        if (generationsRemaining === 0) {
            clearInterval(intervalId);
        }
    }, timeDelay);
};