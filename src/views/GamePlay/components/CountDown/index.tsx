import React from 'react';
import Countdown from 'react-countdown-now';

const renderer = ({ hours, minutes, seconds, completed }) => {
	if (completed) {
		return <span>56</span>;
	} else {
		// Render a countdown
		return <span>{seconds}</span>;
	}
};

const CountDown: React.FC = () => {
	return (
		<>
			<div className="time_lac">
				<img src={require('src/image/time.png')} />
				<div className="txt_time_lac">
					<p>Thời gian kết thúc</p>
					<span>
							<Countdown date={Date.now() + 60000} renderer={renderer} />
						</span>
				</div>
			</div>
		</>
	);
};

export default CountDown;
