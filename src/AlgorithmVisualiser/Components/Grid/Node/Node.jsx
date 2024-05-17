import { memo } from 'react';
import { useNodeHelper } from './useNodeHelper';
import { useMouseEvents } from '../useMouseEvents';

export const Node = memo(({ node, appState, setAppState }) => {
	const { handleMouseDown, handleMouseEnter, handleMouseUp } = useMouseEvents(appState, setAppState);
	const { handleExtraClassNameFor } = useNodeHelper();
	const currentModeClassName = appState.CURRENT_MODE.name
		.toLowerCase()
		.replace(/\s+/g, '-')
	return (
		<div
			id={`node-${node.row}-${node.col}`}
			className={`node ${handleExtraClassNameFor(node, appState)} ${currentModeClassName}`}
			onMouseDown={() => {
				handleMouseDown(node);
			}}
			onMouseEnter={() => {
				handleMouseEnter(node);
			}}
			onMouseUp={() => {
				handleMouseUp();
			}}></div>
	);
});
