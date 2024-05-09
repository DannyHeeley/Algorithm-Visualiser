export const TickCounter = ({appState}) => {
    return (
      <div className="tick-counter">
        <div className="tick"> {appState.currentTick}</div>
      </div>
    );
}