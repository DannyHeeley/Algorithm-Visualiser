import { useNodeHelper } from '../../Components/Grid/Node/useNodeHelper.jsx';
import { setIsAnimating } from '../../Components/Buttons/hooks/useVisualise.jsx';
import { NodeType } from '../../Components/Grid/Node/NodeType.js';

	const { nodeIsAStartOrTarget } = useNodeHelper();
	
	export const startPathfinding = (visitedNodesInOrder, shortestPathNodesInOrder, appState, setAppState) => {
		let i = 0;
		let intervalId;
		const timeDelay = 1500 / appState.animationSpeed;
		const animate = () => {
			const node = visitedNodesInOrder[i];
			if (i >= visitedNodesInOrder.length) {
				// Stop the animation and animate the shortest path if we have been through all the nodes
				clearInterval(intervalId);
				animateShortestPath(shortestPathNodesInOrder, setAppState);
				setIsAnimating(false, setAppState);
				return;
			}
			updateCurrentNode(node, setAppState);
			i++;
		};
		intervalId = setInterval(animate, timeDelay);
		setIntervalID(intervalId, setAppState);
	};

	const animateShortestPath = (nodesInShortestPathOrder, setAppState) => {
		for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
			const node = nodesInShortestPathOrder[i];
			setTimeout(() => {
				if (nodeIsAStartOrTarget(node)) return;
				if (node.isWeighted) {
					handleGridUpdateForNode(node, NodeType.SHORTEST_PATH_WEIGHTED, setAppState);
				} else {
					handleGridUpdateForNode(node, NodeType.SHORTEST_PATH, setAppState);
				}
			}, 50 * i);
		}
	};

	const updateCurrentNode = (node, setAppState) => {
		if (!nodeIsAStartOrTarget(node) && !node.isWeighted) {
			handleGridUpdateForNode(node, NodeType.VISITED, setAppState);
		}
	};

	const handleGridUpdateForNode = (node, nodeType, setAppState) => {
		setAppState((prevState) => {
			return {
				...prevState,
				grid:
					nodeType === NodeType.VISITED
						? getNewGridForAnimation(node, nodeType, prevState.grid)
						: getNewGridForAnimation(node, nodeType, prevState.grid, false),
			};
		});
	};

	const getNewGridForAnimation = (node, nodeType, grid, setIsVisited = true) => {
		const newGrid = grid.slice();
		const thisNode = newGrid[node.row][node.col];
		const newNode = {
			...thisNode,
			[nodeType]: true,
			isVisitedAnimation: setIsVisited,
		};
		newGrid[node.row][node.col] = newNode;
		return newGrid;
	};

	const setIntervalID = (intervalId, setAppState) => {
		setAppState((prevState) => {
			return {
				...prevState,
				intervalId: intervalId,
			};
		});
	};




