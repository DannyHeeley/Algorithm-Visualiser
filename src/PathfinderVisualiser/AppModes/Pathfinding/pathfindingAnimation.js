import { NodeType, nodeIsAStartOrTarget } from '../../Components/Grid/Node/NodeHelper.js';
import { toggleIsAnimating } from '../../../App.jsx';

export const animatePathfinding = (visitedNodesInOrder, shortestPathNodesInOrder, appState, setAppState) => {
	let i = 0;
	let intervalID;
	const timeDelay = 1000 / appState.animationSpeed;

	const animate = () => {
		const node = visitedNodesInOrder[i];
		//If we have been through all the nodes
		if (i >= visitedNodesInOrder.length) {
			// Stop the animation and animate the shortest path
			clearInterval(intervalID);
			animateShortestPath(shortestPathNodesInOrder);
			toggleIsAnimating(setAppState);
			return;
		}
		updateCurrentNode(node, appState, setAppState);
		i++;
	};

	// Start the animation loop and return the ID (to be used in clearInterval when cancelling the animation)
	intervalID = setInterval(animate, timeDelay); // Repeatedly calls a function with a fixed time delay between each call
};

// BAD PRACTICE TO DO THIS IN REACT,
// TODO: NEED TO REWRITE TO USE SOMETHING OTHER THAN DIRECT DOM MANIPULATION.
const animateShortestPath = (nodesInShortestPathOrder) => {
	for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
		const node = nodesInShortestPathOrder[i];
		setTimeout(() => {
			if (nodeIsAStartOrTarget(node)) return;
			if (node.isWeighted) {
				document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-weighted-shortest-path';
			} else {
				document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
			}
		}, 50 * i);
	}
};

const updateCurrentNode = (node, appState, setAppState) => {
	if (!nodeIsAStartOrTarget(node) && !node.isWeighted) {
		setAppState((prevState) => {
			return {
				...prevState,
				grid: getNewGridForVisitedNode(node, appState),
			};
		});
		//document.getElementById(`node-${node.row}-${node.col}`).className = 'node isVisited';
	}
};

const getNewGridForVisitedNode = (node, appState) => {
	const newGrid = appState.grid.slice();
	const thisNode = newGrid[node.row][node.col];
	const newNode = {
		...thisNode,
		isVisited: true,
	};
	newGrid[node.row][node.col] = newNode;
	return newGrid;
};