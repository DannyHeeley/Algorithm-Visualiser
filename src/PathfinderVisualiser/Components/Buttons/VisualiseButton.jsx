import { useButtons } from "./hooks/useButtons";

export const VisualiseButton = ({ appState, setAppState }) => {
	const { visualiseAlgorithm } = useButtons(appState, setAppState);
	return (
		<button
			className='visualise'
			onClick={visualiseAlgorithm}>
			Visualise Algorithm &#128104;&#127995;&#8205;&#128187;
		</button>
	);
};

