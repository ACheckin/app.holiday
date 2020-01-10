import React from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		return null;
	} else {
		// Render a countdown
		return <span>{seconds}</span>;
	}
};

interface CoundDownProps {
	title: string
	onComplete: () => void;
	time: number
}

const CountDown: React.FC<CoundDownProps> = ({ onComplete, title, time }) => {
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
