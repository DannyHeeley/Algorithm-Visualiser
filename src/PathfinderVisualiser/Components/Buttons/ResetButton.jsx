import { generateRandomUnsortedValues } from "../../algorithms/Sorting/sortHelper";
import { GridMode } from "../../../App";

export const ResetButton = ({ initialiseGrid, gridState, setGridState }) => {
	const { handleReset } = useReset();
	return (
		<button
			className='reset'
			onClick={() => {
				handleReset(initialiseGrid, gridState, setGridState);
			}}>
			Reset ⭯
		</button>
	);
};



