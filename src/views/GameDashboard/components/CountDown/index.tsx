import React from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		return "Bắt đầu";
	} else {
		// Render a countdown
		return <span>{seconds}</span>;
	}
};

interface CoundDownProps {
	onComplete: () => void;
}

const CountDown: React.FC<CoundDownProps> = ({ onComplete }) => {
	return (
		<>
			<div className="time_lac">
				<img src={require('src/image/time.png')} />
				<div className="txt_time_lac">
					<p>Trò chơi sẽ bắt đầu trong</p>
					<span>
						<Countdown date={Date.now() + 5000} renderer={renderer} onComplete={onComplete} />
					</span>
				</div>
			</div>
		</>
	);
};

export default React.memo(CountDown);