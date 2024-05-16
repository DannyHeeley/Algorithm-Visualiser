import { memo } from 'react';
import { APP_MODES } from '../../AppModes/APP_MODES';
import { TickCounter } from './TickCounter';

export const Legend = memo(({appState}) => {
	const { GAME_OF_LIFE_MODE, PATHFINDING_MODE, SORTING_MODE } = APP_MODES;

	const data = (() => {
		switch (appState.CURRENT_MODE) {
			case PATHFINDING_MODE:
				return Object.entries(APP_MODES.PATHFINDING_MODE.LEGEND_DATA);
			case GAME_OF_LIFE_MODE:
				return Object.entries(APP_MODES.GAME_OF_LIFE_MODE.RULES_DATA);
			case SORTING_MODE:
				return Object.entries(appState.CURRENT_ALGORITHM.info);
		}
	})();

	const LegendItem = ({ className, text }) => {
		return (
			<div className='legend-item'>
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
			{
				appState.CURRENT_MODE === GAME_OF_LIFE_MODE && <TickCounter appState={appState}></TickCounter>
			}
		</div>
	);
});
