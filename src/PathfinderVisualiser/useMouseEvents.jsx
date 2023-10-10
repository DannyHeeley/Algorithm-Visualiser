import { useReducer } from "react";

export const useMouseEvents = ({ initialState }) => {
  const [nodeState, nodeDispatch] = useReducer(
    nodeStateReducer,
    initialState.nodeState
  );

  const [gridState, gridDispatch] = useReducer(
    gridStateReducer,
    initialState.gridState
  );

  const handleMouseDown = (node) => {
    gridDispatch({ type: ActionType.TOGGLE_MOUSE });

    if (nodeState.isStartNodeSet && nodeState.isTargetNodeSet) {
      if (node.isStart || node.isTarget) {
        nodeDispatch({ type: ActionType.DESELECT_NODE, node, gridState });
        gridDispatch({
          type: ActionType.DESELECT_NODE,
          node,
          nodeState,
          gridState,
        });
      } else {
        gridDispatch({
          type: ActionType.HANDLE_WALL,
          node,
          nodeState,
          gridState,
        });
      }
    } else {
      nodeDispatch({ type: ActionType.SELECT_NODE, node, gridState });
      gridDispatch({
        type: ActionType.SELECT_NODE,
        node,
        nodeState,
        gridState,
      });
    }
  };

  const handleMouseEnter = (node) => {
    if (
      nodeState.mouseIsPressed &&
      nodeState.isStartNodeSet &&
      nodeState.isTargetNodeSet
    ) {
      gridDispatch({ type: ActionType.HANDLE_WALL, node, gridState });
    }
  };

  const handleMouseUp = (node) => {
    nodeDispatch({ type: ActionType.TOGGLE_MOUSE, node, gridState });
  };

  return {
    nodeState,
    gridDispatch,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
  };
};

const nodeStateReducer = (state, action, node, gridState) => {
  switch (action.type) {
    case ActionType.TOGGLE_MOUSE:
      return { ...state, mouseIsPressed: !state.mouseIsPressed };

    case ActionType.SELECT_NODE:
      return typeOfNode(node, state, gridState) === NodeType.START
        ? {
            ...state,
            startNodeCol: node.col,
            startNodeRow: node.row,
            isStartNodeSet: true,
          }
        : typeOfNode(node, state, gridState) === NodeType.TARGET
        ? {
            ...state,
            targetNodeCol: node.col,
            targetNodeRow: node.row,
            isTargetNodeSet: true,
          }
        : { ...state };

    case ActionType.DESELECT_NODE:
      return typeOfNode(node, state, gridState) === NodeType.START
        ? {
            ...state,
            startNodeCol: null,
            startNodeRow: null,
            isStartNodeSet: false,
          }
        : typeOfNode(node, state, gridState) === NodeType.TARGET
        ? {
            ...state,
            targetNodeCol: null,
            targetNodeRow: null,
            isTargetNodeSet: false,
          }
        : { ...state };

    default:
      return state;
  }
};

const gridStateReducer = (
  state,
  action,
  node,
  nodeState,
  gridState,
  initialiseGrid
) => {
  switch (action.type) {
    case ActionType.INITIALISE_GRID:
      return {
        ...gridState,
        grid: initialiseGrid(nodeState),
        gridInitialised: true,
      };

    case ActionType.HANDLE_WALL:
      return {
        ...state,
        grid: getNewGridFor(node, NodeType.WALL, state),
      };

    case ActionType.SELECT_NODE || ActionType.DESELECT_NODE:
      return {
        ...state,
        grid: getNewGridFor(node, typeOfNode(node, nodeState, state), state),
      };

    case ActionType.TOGGLE_ALGORITHM:
      return {
        ...state,
        algorithmNameText:
          gridState.algorithmNameText === "A*" ? "DIJKSTRA'S" : "A*",
      };

    default:
      return { ...state };
  }
};

const getNewGridFor = (oldNode, nodeType, prevGridState) => {
  if (prevGridState.isAnimating || prevGridState.needsReset) return;
  const newGrid = prevGridState.grid.slice();
  const thisNode = newGrid[oldNode.row][oldNode.col];
  const newNode = {
    ...thisNode,
    [nodeType]: !thisNode[nodeType],
  };
  newGrid[oldNode.row][oldNode.col] = newNode;
  return newGrid;
};

const typeOfNode = (node, nodeState, gridState) => {
  return node.isStart || !nodeState.isStartNodeSet
    ? NodeType.START
    : node.isTarget || !nodeState.isTargetNodeSet
    ? NodeType.TARGET
    : gridState.isWallToggled
    ? NodeType.WALL
    : NodeType.WEIGHTED;
};

const ActionType = {
  TOGGLE_MOUSE: "TOGGLE_MOUSE",
  SELECT_NODE: "SELECT_NODE",
  DESELECT_NODE: "DESELECT_NODE",
  HANDLE_WALL: "HANDLE_WALL",
};

const NodeType = {
  START: "isStart",
  TARGET: "isTarget",
  WALL: "isWall",
  WEIGHTED: "isWeighted",
};
