export const ResetButton = ({ initialiseGrid, setGridState }) => {

  return (
    <button
      className="reset"
      onClick={() => {
        // TODO: Make reset button actually reset the visited nodes after animation
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


