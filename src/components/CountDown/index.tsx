import React from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		return null;
	} else {
		// Render a countdown
		return (
			<span>
				{days ? `${days}d ` : ''}
				{hours ? `${hours}h ` : ''}
				{minutes ? `${minutes}m ` : ''}
				{seconds}s
			</span>
		);
	}
};

interface CoundDownProps {
	title: string;
	onComplete: () => void;
	time: number;
	isPC: boolean;
}

const CountDown: React.FC<CoundDownProps> = ({ onComplete, title, time, isPC }) => {
	if (isPC === true) {
		return (
			<>
				<div className="time_play">
					<img src={require('src/image/time_bg.png')} />
					<div className="time_countdown">
						<Countdown date={time} renderer={renderer} onComplete={onComplete} />
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<div className="time_lac">
				<img src={require('src/image/time.png')} />
				<div className="txt_time_lac">
					<p>{title}</p>
					<span>
						<Countdown date={time} renderer={renderer} onComplete={onComplete} />
					</span>
				</div>
			</div>
		</>
	);
};

export default React.memo(CountDown);
