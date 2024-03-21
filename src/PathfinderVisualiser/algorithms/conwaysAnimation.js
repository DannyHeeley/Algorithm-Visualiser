export const animateConways = (
    gameOfLife,
    gridState,
    setGridState,
) => {
    let intervalID;
    const timeDelay = 1000 / gridState.animationSpeed;
    const animationDuration = timeDelay * gridState.maxGenerations;
    const animate = () => {
        // Get the next iteration of the grid based on rules of life
        const nextGenGrid = gameOfLife(gridState)(); // Currying to call the calculateNextGen function returned from gameOfLife()
        updateAllNodesVisually(nextGenGrid);
        // Update the gridState with the latest iteration of the grid
        setGridState(prevState => ({ ...prevState, grid: nextGenGrid }));
    }
    // Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
    intervalID = setInterval(animate, timeDelay);
    // End the animation after all generations have executed
    setTimeout(() => {
      clearInterval(intervalID);
    }, animationDuration);
};

const updateAllNodesVisually = (nextGenGrid) => {
    nextGenGrid.forEach((row) => {
        row.forEach((node) => {
            if (node.isWall) updateNode(node, "node node-wall");
            else updateNode(node, "node");
        });
    });
}

const updateNode = (node, className) => {
  // BAD PRACTICE TO DO THIS IN REACT,
// TODO: NEED TO REWRITE TO USE SOMETHING OTHER THAN DIRECT DOM MANIPULATION.
    document.getElementById(`node-${node.row}-${node.col}`).className = className;
}

