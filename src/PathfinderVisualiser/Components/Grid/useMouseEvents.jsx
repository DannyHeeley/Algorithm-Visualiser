import { NodeType, typeOfNode, nodeIsAStartOrTarget, startAndTargetNodesSet } from './Node/NodeHelper.js';

import { GridModes } from '../../../App';

export const useMouseEvents = () => {

	const handleMouseDown = (node, appState, setAppState) => {
		if (appState.isAnimating || appState.needsReset) return;
		toggleMouseIsPressed(setAppState);
		const thisNodeType = typeOfNode(node, appState);
		if (startAndTargetNodesSet(appState) || appState.currentMode === GridModes.GAME_OF_LIFE_MODE) {
			if (nodeIsAStartOrTarget(node)) {
				handleStartOrTargetDeselect(node, thisNodeType, setAppState);
			} else {
				handleNodeClick(node, thisNodeType, setAppState);
			}
		} else {
			handleStartOrTargetSelect(node, thisNodeType, setAppState);
		}
	};

	const handleMouseEnter = (node, appState, setAppState) => {
		if (appState.isAnimating || appState.needsReset) return;
		if (appState.mouseIsPressed && startAndTargetNodesSet(appState)) {
			const nodeTypePathfinding = appState.drawType ? NodeType.WALL : NodeType.WEIGHTED;
			const thisNodeType = appState.currentMode === GridModes.GAME_OF_LIFE_MODE ? NodeType.CELL : nodeTypePathfinding;
			handleNodeClick(node, thisNodeType, setAppState);
		}
	};

	const handleMouseUp = (appState, setAppState) => {
		if (appState.isAnimating || appState.needsReset) return;
		if (appState.mouseIsPressed) {
			toggleMouseIsPressed(setAppState);
		}
	};

	const getNewGridFor = (oldNode, nodeType, appState) => {
		const newGrid = appState.grid.slice();
		const thisNode = newGrid[oldNode.row][oldNode.col];
		const newNode = {
			...thisNode,
			[nodeType]: !thisNode[nodeType],
		};
		newGrid[oldNode.row][oldNode.col] = newNode;
		return newGrid;
	};

	const handleStartOrTargetSelect = (node, nodeType, setAppState) => {
		setAppState((prevState) => {
			const newGrid = getNewGridFor(node, nodeType, appState);
			if (nodeType === NodeType.START) {
				setAppState((prevState) => ({
					...prevState,
					startNodeCol: node.col,
					startNodeRow: node.row,
					isStartNodeSet: true,
				}));
			}
			if (nodeType === NodeType.TARGET) {
				setAppState((prevState) => ({
					...prevState,
					targetNodeCol: node.col,
					targetNodeRow: node.row,
					isTargetNodeSet: true,
				}));
			}
			return {
				...prevState,
				grid: newGrid,
			};
		});
	};

	const handleStartOrTargetDeselect = (node, nodeType, setAppState) => {
		setAppState((prevState) => {
			const newGrid = getNewGridFor(node, nodeType, appState);
			if (nodeType === NodeType.START) {
				setAppState((prevState) => ({
					...prevState,
					startNodeCol: null,
					startNodeRow: null,
					isStartNodeSet: false,
				}));
			}
			if (nodeType === NodeType.TARGET) {
				setAppState((prevState) => ({
					...prevState,
					targetNodeCol: null,
					targetNodeRow: null,
					isTargetNodeSet: false,
				}));
			}
			return { ...prevState, grid: newGrid };
		});
	};

	const handleNodeClick = (node, nodeType, setAppState) => {
		setAppState((prevState) => {
			const newGrid = getNewGridFor(node, nodeType, prevState);
			return { ...prevState, grid: newGrid };
		});
	};

	const toggleMouseIsPressed = (setAppState) => {
		setAppState((prevState) => ({
			...prevState,
			mouseIsPressed: !prevState.mouseIsPressed,
		}));
	};

	const setMouseIsPressedTo = (bool, setAppState) => {
		setAppState((prevState) => ({
				...prevState,
				mouseIsPressed: bool,
		}));
	};

	return {
		handleMouseDown,
		handleMouseEnter,
		handleMouseUp,
		setMouseIsPressedTo,
	};
};
