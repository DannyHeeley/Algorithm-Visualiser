import { Node } from './Node/Node';
import { useMouseEvents } from './useMouseEvents';

export const Grid = ({ appState, setAppState }) => {
	const { setMouseIsPressedTo } = useMouseEvents(appState, setAppState);
	const mode = appState.currentMode;
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
								appState={appState}
								setAppState={setAppState}
								node={{ ...node }}
							></Node>
						);
					})}
				</div>
			))}
		</div>
	);
};
