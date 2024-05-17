import { memo } from 'react';
import { APP_MODES } from '../../AppModes/APP_MODES';
import { TickCounter } from './TickCounter';

export const Legend = memo(({ appState, data }) => {

	data = Object.entries(data);
	const currentModeClassName = appState.CURRENT_MODE.name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
	const LegendItem = ({ className, text }) => {
		return (
			<div className={`legend-item ${appState.CURRENT_MODE}`}>
				<div className={className}></div>
				<p className='legend-text'>{text}</p>
			</div>
		);
	};

	return (
		<div className='legend'>
			{data.map((subArray, index) => {
				return (
					<LegendItem
						className={subArray[1]}
						text={subArray[0]}
						key={index}></LegendItem>
				);
			})}
			{appState.CURRENT_MODE === APP_MODES.GAME_OF_LIFE_MODE && <TickCounter appState={appState}></TickCounter>}
		</div>
	);
});
