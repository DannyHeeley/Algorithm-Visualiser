function parseRleString(rleString) {
    const patternData = rleString.split("");
    let currentRow = [];
    let rleAsGridPattern = [];
    let runLengthStr = '';
    for (let i = 0; i < patternData.length; i++) {
        const char = patternData[i];
        if (/\d/.test(char)) { // Check if it's a digit
            runLengthStr += char; // Accumulate the digits of the run length
        } else if (runLengthStr !== '') { // If runLengthStr is not empty, there is a multi digit number
            const runLength = parseInt(runLengthStr);
            const nextChar = patternData[i]; // The next character after the number is the cell state
            for (let j = 0; j < runLength; j++) {
                currentRow.push(nextChar === "b" ? false : true);
            }
            runLengthStr = '';
        } else if (char === "$") {
            rleAsGridPattern.push(currentRow);
            currentRow = [];
        } else if (char === "!") {
            rleAsGridPattern.push(currentRow);
            break;
        } else {
            currentRow.push(char === "b" ? false : true);
        }
    }
    return rleAsGridPattern;
}

export function initialiseGridWithPattern(grid, rleString, xOffset = 17, yOffset = 6) {
    const pattern = parseRleString(rleString);
    // Check if the pattern fits within the grid boundaries
    if (pattern.length > grid.length - yOffset || pattern[0].length > grid[0].length - xOffset) {
        throw new Error("Pattern doesn't fit within the grid!");
    }
    // Loop through the pattern and update corresponding cells in the grid
    for (let y = 0; y < pattern.length; y++) {
        for (let x = 0; x < pattern[y].length; x++) {
            if (pattern[y][x]) {
                grid[y + yOffset][x + xOffset].isCell = true;
            }
        }
    }
    return grid;
}