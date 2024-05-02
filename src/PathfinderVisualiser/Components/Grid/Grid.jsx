import { Node } from '../Node/Node';
import { useMouseEvents } from '../../useMouseEvents';

export const Grid = ({ appState, setAppState }) => {
	const { handleMouseDown, handleMouseEnter, handleMouseUp, setMouseIsPressedTo } =
		useMouseEvents();
	const GridModes = appState.currentMode;
	const randomUnsortedValues = appState.randomUnsortedValues;
	return (
		<div
			className={`grid-container ${GridModes}`}
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
								GridModes={GridModes}
								randomUnsortedValues={randomUnsortedValues}
								node={{ ...node }}
								onMouseDown={() => {
									if (appState.isAnimating || appState.needsReset) return;
									handleMouseDown(node, appState, setAppState);
								}}
								onMouseEnter={() => {
									if (appState.isAnimating || appState.needsReset) return;
									handleMouseEnter(node, appState, setAppState);
								}}
								onMouseUp={() => {
									if (appState.isAnimating || appState.needsReset) return;
									handleMouseUp(appState, setAppState);
								}}></Node>
						);
					})}
				</div>
			))}
		</div>
	);
};
