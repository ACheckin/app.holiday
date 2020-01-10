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

interface CoundDownProps {
	onComplete: () => void;
}

const CountDown: React.FC<CoundDownProps> = ({ onComplete }) => {
	return (
		<>
			<div className="animated easily slideInDown time_lac">
				<img src={require('src/image/time.png')} />
				<div className="txt_time_lac">
					<p>Thời gian kết thúc</p>
					<span>
						<Countdown date={Date.now() + 5000} renderer={renderer} onComplete={onComplete} />
					</span>
				</div>
			</div>
		</>
	);
};

export default React.memo(CountDown);
