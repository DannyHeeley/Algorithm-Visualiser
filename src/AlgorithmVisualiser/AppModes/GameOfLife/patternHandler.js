export const initialiseGridWithPattern = (patternObj, grid) => {
	if (patternObj === null) return grid;
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
				grid[y + yOffset][x + xOffset].isAutomata = true;
			}
		}
	}
	return grid;
};

const patternIsWithinGridBounds = (patternData, grid, xOffset, yOffset) => {
	if (patternData.length > grid.length - yOffset) return false;
	for (const row of patternData) {
		if (row.length > grid[0].length - xOffset) return false;
	}
	return true;
};

const parseRlePattern = (rleString) => {
	const decodedPattern = decodeRle(rleString);
	let patternData = [];
	let currentRow = [];
	for (let char of decodedPattern) {
		if (char === 'b') currentRow.push(false);
		if (char === 'o') currentRow.push(true);
		if (char === '$') {
			patternData.push(currentRow);
			currentRow = [];
		}
		if (char === '!') {
			if (currentRow.length > 0) {
				patternData.push(currentRow);
			}
			break;
		}
	}
	return patternData;
};

const decodeRle = (str) => {
	return str.replace(/(\d+)(\w)/g, (_, n, c) => {
		return new Array(parseInt(n, 10) + 1).join(c);
	});
}
