import React from 'react';

interface GameScoreProps {
	score: number
}

const GameScore: React.FC<GameScoreProps> = ({ score }) => {

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'VND',
	});

	return (
		<div className="lixi doilixi">
			<img src={require('src/image/doilixi.png')} />
			<div className="txt_lixi">
				<p className="fade">- Bạn nhận được lì xì -</p>
				<p className="show fade in">
					Nguyễn Văn Hải vừa đổi Lì Xì 300.000đ lấy 200.000đ với bạn.
					<br />
					Lì Xì mới của bạn là
				</p>
				<div className="menhgia_lixi">{formatter.format(score)}</div>
			</div>
			<div className="btn_lac">
				<img className="shake" src={require('src/image/btn-lac.png')} />
			</div>
			<div className="light-bot">
				<img src={require('src/image/light-bot.png')} />
			</div>
		</div>
	);
};

export default GameScore;