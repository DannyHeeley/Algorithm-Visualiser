import { memo } from "react";
import { useVisualise } from "./hooks/useVisualise";

export const VisualiseButton = memo(({ appState, setAppState }) => {
	return (
		<button
			className='visualise'
			onClick={useVisualise(appState, setAppState)}>
			Visualise Algorithm &#128104;&#127995;&#8205;&#128187;
		</button>
	);
});

