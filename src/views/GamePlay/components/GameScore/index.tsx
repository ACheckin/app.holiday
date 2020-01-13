import React from 'react';
import { formatMoney, get } from 'src/helpers';
import { HistoryValue } from 'src/interfaces/db';

interface GameScoreProps {
	score: number;
	history: HistoryValue;
}

const GameScore: React.FC<GameScoreProps> = ({ score, history }) => {
	const renderHistory = () => {
		if (history) {
			const action = get(history, e => e.action);

			if (action === 'START') {
				return <p className="show fade in">Bạn đã nhận được lì xì</p>;
			} else {
				const user = get(history, e => e.from);



				if (action === 'TAKE') {
					return <p className="show fade in">Nỗ nực quay tay đã mang về cho bạn</p>;
				}

				if (action === 'BE_TAKEN') {
					return (
						<p className="show fade in">
							<b>{get(user, e => e.name, '')} </b>đã giật mất lì xì của bạn.{'\n'}
							Lì xì mới của bạn là
						</p>
					);
				}
			}
		} else {
			return <p className="show fade in">Bạn đã nhận được lì xì</p>;
		}
	};

	return (
		<div className="animated easily bounceIn lixi doilixi">
			<img src={require('src/image/doilixi.png')} />
			<div className="txt_lixi">
				<p className="fade">- Bạn nhận được lì xì -</p>
				{renderHistory()}
				<div className={formatMoney(score).length < 12 ? "menhgia_lixi" : "menhgia_lixi2"}>{formatMoney(score)}</div>
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

export default React.memo(GameScore);
