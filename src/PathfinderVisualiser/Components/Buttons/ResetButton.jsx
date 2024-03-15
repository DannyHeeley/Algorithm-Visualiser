import React, { createRef } from "react";

export const ResetButton = ({ initialiseGrid, setGridState, nodeRefs, gridState }) => {

  return (
    <button
      className="reset"
      onClick={() => {
        // TODO: Make reset button actually reset the visited nodes after animation
        // resetNodeClassNames(createNodeRefArray(gridState, nodeRefs), gridState);
        setGridState((prevState) => {
          return {
            ...prevState,
            grid: initialiseGrid(prevState),
            needsReset: false,
          };
        });
      }}
    >
      Reset ⭯
    </button>
  );
};

// const createNodeRefArray = (gridState, nodeRefs) => {
//   return gridState.grid.map((row) => {
//     return row.map((node) => {
//       const ref = createRef();
//       nodeRefs.current[node.row] = nodeRefs.current[node.row] || {};
//       nodeRefs.current[node.row][node.col] = ref; // Assign the ref to its corresponding node
//       return ref.className;
//     });
//   });
// }

// const resetNodeClassNames = (nodeRefArray, gridState) => {
//   nodeRefArray.forEach((row, rowIndex) => {
//     row.forEach((node, colIndex) => {
//       if (
//         !(colIndex === gridState.startNodeCol && rowIndex === gridState.startNodeRow)
//         && !(colIndex === gridState.targetNodeCol && rowIndex === gridState.targetNodeRow)
//       ) {
//         node.className = "node";
//       }
//     });
//   });
// };