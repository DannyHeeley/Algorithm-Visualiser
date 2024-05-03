
// TODO: Memoise the pattern once parsed within the pattern object for better performance

// This function takes the object for a pattern and not the pattern itself
export const initialiseGridWithPattern = (patternObj, grid) => {
	const currentPattern = parseRlePattern(patternObj.pattern);
	const xOffset = patternObj.offset.x;
	const yOffset = patternObj.offset.y;
	if (patternIsWithinGridBounds(patternObj, grid)) {
		return addPatternToGrid(currentPattern, grid, yOffset, xOffset);
	} else {
		throw new Error("currentPattern doesn't fit within the newGrid!");
	}
};

const parseRlePattern = (currentPattern) => {
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

const addPatternToGrid = (pattern, grid, yOffset, xOffset) => {
	for (let y = 0; y < pattern.length; y++) {
		for (let x = 0; x < pattern[y].length; x++) {
			if (pattern[y][x]) {
				grid[y + yOffset][x + xOffset].isCell = true;
			}
		}
	}
	return grid;
};

const patternIsWithinGridBounds = (patternObj, grid) => {
	const pattern = patternObj.pattern;
	const xOffset = patternObj.offset.x;
	const yOffset = patternObj.offset.y;
	return pattern.length < grid.length - yOffset || pattern[0].length < grid[0].length - xOffset;
}