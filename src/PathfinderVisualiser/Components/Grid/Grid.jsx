import { Node } from '../Node/Node';
import { useMouseEvents } from '../../useMouseEvents';

export const Grid = ({ gridState, setGridState }) => {
	const { handleMouseDown, handleMouseEnter, handleMouseUp, setMouseIsPressedTo } =
		useMouseEvents();
	const gridMode = gridState.mode;
	const randomUnsortedValues = gridState.randomUnsortedValues;
	return (
		<div
			className={`grid-container ${gridMode}`}
			onDragStart={(event) => event.preventDefault()}
			onMouseEnter={() => {
				if (gridState.isAnimating || gridState.needsReset) return;
				if (gridState.mouseIsPressed) {
					setMouseIsPressedTo(true, setGridState);
				}
			}}
			onMouseLeave={() => {
				if (gridState.isAnimating || gridState.needsReset) return;
				if (gridState.mouseIsPressed) {
					setMouseIsPressedTo(false, setGridState);
				}
			}}>
			{gridState.grid.map((row, rowId) => (
				<div key={rowId}>
					{row.map((node, nodeId) => {
						return (
							<Node
								key={nodeId}
								gridMode={gridMode}
								randomUnsortedValues={randomUnsortedValues}
								node={{ ...node }}
								onMouseDown={() => {
									if (gridState.isAnimating || gridState.needsReset) return;
									handleMouseDown(node, gridState, setGridState);
								}}
								onMouseEnter={() => {
									if (gridState.isAnimating || gridState.needsReset) return;
									handleMouseEnter(node, gridState, setGridState);
								}}
								onMouseUp={() => {
									if (gridState.isAnimating || gridState.needsReset) return;
									handleMouseUp(gridState, setGridState);
								}}></Node>
						);
					})}
				</div>
			))}
		</div>
	);
};
