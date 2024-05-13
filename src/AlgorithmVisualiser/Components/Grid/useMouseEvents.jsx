import { useNodeHelper } from './Node/useNodeHelper';
import { NodeType } from './Node/NodeType.js';
import { APP_MODES } from '../../AppModes/APP_MODES.js';

export const useMouseEvents = (appState, setAppState) => {
	
	const { typeOfNode, nodeIsAStartOrTarget, startAndTargetNodesSet } = useNodeHelper();
	const GAME_OF_LIFE_MODE = APP_MODES.GAME_OF_LIFE_MODE;

	const handleMouseDown = (node) => {
		if (appState.isAnimating || appState.needsReset) return;
		setMouseIsPressedTo(true);
		const thisNodeType = typeOfNode(node, appState);
		if (startAndTargetNodesSet(appState) || appState.CURRENT_MODE === GAME_OF_LIFE_MODE) {
			if (nodeIsAStartOrTarget(node)) {
				handleStartOrTargetDeselect(node, thisNodeType);
			} else {
				handleNodeClick(node, thisNodeType);
			}
		} else {
			handleStartOrTargetSelect(node, thisNodeType);
		}
	};

	const handleMouseEnter = (node) => {
		if (appState.isAnimating || appState.needsReset) return;
		if (
			(appState.mouseIsPressed && startAndTargetNodesSet(appState)) ||
			(appState.mouseIsPressed && appState.CURRENT_MODE === GAME_OF_LIFE_MODE)
		) {
			if (nodeIsAStartOrTarget(node)) return;
			const thisNodeType = typeOfNode(node, appState)
			handleNodeClick(node, thisNodeType);
		}
	};

	const handleMouseUp = () => {
		if (appState.isAnimating || appState.needsReset) return;
		if (appState.mouseIsPressed) {
			setMouseIsPressedTo(false);
		}
	};

	const getNewGridFor = (node, nodeType) => {
		const newGrid = appState.grid.slice();
		const thisNode = newGrid[node.row][node.col];
		const newNode = {
			...thisNode,
			[nodeType]: !thisNode[nodeType],
		};
		newGrid[node.row][node.col] = newNode;
		return newGrid;
	};

	const handleStartOrTargetSelect = (node, nodeType) => {
		setAppState((prevState) => {
			const newGrid = getNewGridFor(node, nodeType);
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

	const handleStartOrTargetDeselect = (node, nodeType) => {
		setAppState((prevState) => {
			const newGrid = getNewGridFor(node, nodeType);
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

	const handleNodeClick = (node, nodeType) => {
		setAppState((prevState) => {
			const newGrid = getNewGridFor(node, nodeType, prevState);
			return { ...prevState, grid: newGrid };
		});
	};

	const setMouseIsPressedTo = (bool) => {
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
