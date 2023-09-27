const animateAStar = (        visitedNodesInOrder,
        nodesInShortestPathOrder,
        setIsAnimating) => {
    setIsAnimating(prevState => !prevState);
    
    console.log("Animate!");

    setIsAnimating(prevState => !prevState);
};

export { animateAStar };