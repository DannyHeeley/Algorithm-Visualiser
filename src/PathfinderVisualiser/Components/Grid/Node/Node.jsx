import { memo } from "react";
import { handleExtraClassNameFor } from "./NodeHelper.js";

export const Node = memo(
  ({
    node,
    mode,
    randomUnsortedValues,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
	}) => {
    return (
		<div
			id={`node-${node.row}-${node.col}`}
			className={`node ${handleExtraClassNameFor(node, mode, randomUnsortedValues)}`}
			onMouseDown={onMouseDown}
			onMouseEnter={onMouseEnter}
			onMouseUp={onMouseUp}
		></div>
	);
  }
);

