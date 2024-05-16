export const TickCounter = ({appState}) => {
	return (
		<div className='counter-box'>
			<div className='generation'>Generation:</div>
			<div className='tick-counter'>
				<div className='tick'> {appState.currentTick}</div>
			</div>
		</div>
	);
}