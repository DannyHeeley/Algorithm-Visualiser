const parsePattern = (pattern) => {
	const patternData = pattern.split('');
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

export const initialiseGridWithPattern = (grid, patternObject, xOffset = 0, yOffset = 0) => {
	const pattern = parsePattern(patternObject.pattern);
	// Check if the pattern fits within the grid
	if (pattern.length > grid.length - yOffset || pattern[0].length > grid[0].length - xOffset) {
		throw new Error("Pattern doesn't fit within the grid!");
	}
	// Loop through the pattern and update cells in the grid
	for (let y = 0; y < pattern.length; y++) {
		for (let x = 0; x < pattern[y].length; x++) {
			if (pattern[y][x]) {
				grid[y + yOffset][x + xOffset].isCell = true;
			}
		}
	}
	return grid;
}