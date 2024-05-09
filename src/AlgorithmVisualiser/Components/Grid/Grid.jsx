import { Node } from './Node/Node';
import { useMouseEvents } from './useMouseEvents';

export const Grid = ({ appState, setAppState }) => {
	const { handleMouseDown, handleMouseEnter, handleMouseUp, setMouseIsPressedTo } = useMouseEvents();
	const mode = appState.currentMode;
	const randomUnsortedValues = appState.randomUnsortedValues;
	return (
		<div
			className={`grid-container ${mode}`}
			onDragStart={(event) => event.preventDefault()}
			onMouseEnter={() => {
				if (appState.isAnimating || appState.needsReset) return;
				if (appState.mouseIsPressed) {
					setMouseIsPressedTo(true, setAppState);
				}
			}}
			onMouseLeave={() => {
				if (appState.isAnimating || appState.needsReset) return;
				if (appState.mouseIsPressed) {
					setMouseIsPressedTo(false, setAppState);
				}
			}}>
			{appState.grid.map((row, rowId) => (
				<div key={rowId}>
					{row.map((node, nodeId) => {
						return (
							<Node
								key={nodeId}
								mode={mode}
								randomUnsortedValues={randomUnsortedValues}
								node={{ ...node }}
								onMouseDown={() => {
									handleMouseDown(node, appState, setAppState);
								}}
								onMouseEnter={() => {
									handleMouseEnter(node, appState, setAppState);
								}}
								onMouseUp={() => {
									handleMouseUp(appState, setAppState);
								}}></Node>
						);
					})}
				</div>
			))}
		</div>
	);
};
