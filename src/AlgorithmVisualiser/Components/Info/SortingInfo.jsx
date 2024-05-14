export const SortingInfo = ({ appState }) => {
	return (
		<div className='sorting-information'>
			{`${appState.CURRENT_ALGORITHM.name}`}:<hr></hr>
			<p className='sorting-info-text'>{`${appState.CURRENT_ALGORITHM.info}`}</p>
		</div>
	);
};
