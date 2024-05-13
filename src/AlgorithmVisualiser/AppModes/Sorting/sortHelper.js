export const generateRandomUnsortedValues = () => {
  const columnHeights = [];
  for (let i = 0; i < 50; i++) {
    columnHeights.push(Math.floor(Math.random() * (Math.floor(25) - 1) + 1));
  }
  return columnHeights;
};
