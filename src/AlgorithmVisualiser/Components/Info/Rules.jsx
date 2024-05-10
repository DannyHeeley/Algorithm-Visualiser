export const Rules = () => {
    return (
      <div className="rules">
        RULES:
        <hr></hr>
        <p className="rule">
          Each cell with one or zero neighbors dies, as if by solitude.
        </p>
        <p className="rule">
          Each cell with four or more neighbors dies, as if by overpopulation.
        </p>
        <p className="rule">
          Each cell with two or three neighbors survives.
        </p>
        <p className="rule">
          Each unpopulated cell with three neighbors becomes populated.
        </p>
      </div>
    );
}