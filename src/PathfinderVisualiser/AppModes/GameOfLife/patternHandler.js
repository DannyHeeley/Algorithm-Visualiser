
// TODO: Memoise the pattern once parsed within the pattern object for better performance

export const initialiseGridWithPattern = (patternObj, grid) => {
	const patternData = parseRlePattern(patternObj.pattern);
	const xOffset = patternObj.offset.x;
	const yOffset = patternObj.offset.y;
	if (patternIsWithinGridBounds(patternData, grid, xOffset, yOffset)) {
		updateGridWithPattern(patternData, grid, yOffset, xOffset);
	} else {
		throw new Error(`Pattern ${patternObj.name} doesn't fit within the newGrid!`);
	}
	return grid;
};

const updateGridWithPattern = (patternData, grid, yOffset, xOffset) => {
	for (let y = 0; y < patternData.length; y++) {
		for (let x = 0; x < patternData[y].length; x++) {
			if (patternData[y][x]) {
				grid[y + yOffset][x + xOffset].isCell = true;
			}
		}
	}
	return grid;
};

const parseRlePattern = (pattern) => {
	const patternArray = pattern.split('');
	let currentRow = [];
	let patternData = [];
	let runLengthStr = '';
	for (let i = 0; i < patternArray.length; i++) {
		const char = patternArray[i];
		if (/\d/.test(char)) {
			runLengthStr += char;
		} else if (runLengthStr !== '') {
			const runLength = parseInt(runLengthStr);
			const nextChar = patternArray[i];
			for (let j = 0; j < runLength; j++) {
				currentRow.push(nextChar === 'b' ? false : true);
			}
			runLengthStr = '';
		} else if (char === '$') {
			patternData.push(currentRow);
			currentRow = [];
		} else if (char === '!') {
			patternData.push(currentRow);
			break;
		} else {
			currentRow.push(char === 'b' ? false : true);
		}
	}
	return patternData;
}

const patternIsWithinGridBounds = (patternData, grid, xOffset, yOffset) => {
	if (patternData.length > grid.length - yOffset) return false;
	for (const row of patternData) {
		if (row.length > grid[0].length - xOffset) return false;
	}
	return true;
};