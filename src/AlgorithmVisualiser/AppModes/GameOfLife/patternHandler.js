export const initialiseGridWithPattern = (patternObj, grid) => {
	if (patternObj === null) return grid;
	const patternData = parseRlePattern(patternObj.pattern);
	const xOffset = patternObj.offset.x;
	const yOffset = patternObj.offset.y;
	if (patternIsWithinGridBounds(patternData, grid, xOffset, yOffset)) {
		updateGridWithPattern(patternData, grid, yOffset, xOffset);
	} else {
		throw new Error(`Pattern ${patternObj.name} doesn't fit within the grid!`);
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
		if (!isNaN(Number(char))) {
			for (let i = 0; i < Number(char); i++) {
				patternData.push([])
			}
		}
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
	return str.replace(/(\d*)(\D)/g, (_, n, c) => {
		const count = n !== '' ? parseInt(n, 10) : 1;
		return c.repeat(count);
	});
};

