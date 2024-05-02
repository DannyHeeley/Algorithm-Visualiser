import { initialiseGrid } from "../../../App";

const patternHandler = (currentPattern) => {
	const patternData = currentPattern.split('');
	let currentRow = [];
	let patternDataAsGridPattern = [];
	let runLengthStr = '';
	for (let i = 0; i < patternData.length; i++) {
		const char = patternData[i];
		if (/\d/.test(char)) {
			runLengthStr += char;
		} else if (runLengthStr !== '') {
			const runLength = parseInt(runLengthStr);
			const nextChar = patternData[i];
			for (let j = 0; j < runLength; j++) {
				currentRow.push(nextChar === 'b' ? false : true);
			}
			runLengthStr = '';
		} else if (char === '$') {
			patternDataAsGridPattern.push(currentRow);
			currentRow = [];
		} else if (char === '!') {
			patternDataAsGridPattern.push(currentRow);
			break;
		} else {
			currentRow.push(char === 'b' ? false : true);
		}
	}
	return patternDataAsGridPattern;
}

export const initialiseGridWithPattern = (patternObject, prevAppState, xOffset = 0, yOffset = 0) => {
	const grid = initialiseGrid(prevAppState);
	const currentPattern = patternHandler(patternObject.currentPattern);
	// Check if the currentPattern fits within the grid
	if (currentPattern.length > grid.length - yOffset || currentPattern[0].length > grid[0].length - xOffset) {
		throw new Error("currentPattern doesn't fit within the grid!");
	}
	// Loop through the currentPattern and update cells in the grid
	for (let y = 0; y < currentPattern.length; y++) {
		for (let x = 0; x < currentPattern[y].length; x++) {
			if (currentPattern[y][x]) {
				grid[y + yOffset][x + xOffset].isCell = true;
			}
		}
	}
	return grid;
}