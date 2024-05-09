import { memo } from "react";
import { useNodeHelper } from "./useNodeHelper";

export const Node = memo(
  ({
    node,
    mode,
    randomUnsortedValues,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
	}) => {
	const { handleExtraClassNameFor } = useNodeHelper();
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

