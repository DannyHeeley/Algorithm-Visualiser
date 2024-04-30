export const TickCounter = ({gridState}) => {
    return (
      <div className="tick-counter">
        <div className="tick"> {gridState.currentTick}</div>
      </div>
    );
}