import React from 'react';
import { formatMoney, get } from 'src/helpers';
import { GameReward } from 'src/interfaces/db';

interface UserTopProps {
	game_reward: GameReward;
	type: 'top_1' | 'top_2' | 'top_3';
}

const UserTop: React.FC<UserTopProps> = ({ game_reward, type }) => {
	const renderMore = () => {
		const histories = get(game_reward, e => Object.values(e.history), []);

		if (histories.length === 0 || histories.length === 1) return null;

		const list_user = [];
		let count_user_more = 0;

		for (let history of histories) {
			if (history) {
				if (list_user.length < 4) {
					list_user.push(history);
				} else {
					count_user_more++;
				}
			}
		}

		return (
			<>
				{list_user.map(user => (
					<div className="robUser">
						<img src={user.avatar} width="22" />
					</div>
				))}
				{count_user_more > 0 && <div className="more">+ {count_user_more} người khác</div>}
			</>
		);
	};

	return (
		<div
			className={`user ${type === 'top_1' ? 'userMid' : ''} ${type === 'top_2' ? 'userLeft' : ''} ${
				type === 'top_3' ? 'userRight' : ''
			}`}
		>
			<div className="imageUser">
				<img
					style={{ borderRadius: 128 / 2 }}
					src={get(game_reward, e => e.user.avatar, require('src/image/btn-lac.png'))}
					width="128"
					alt=""
				/>
			</div>
			<div className="infoUser">
				<div className="nameUser">{get(game_reward, e => e.user.name, 'Đang hóng')}</div>
				<div className="robListUsers">{renderMore()}</div>
			</div>
			<div className="valueUser">{formatMoney(get(game_reward, e => e.money))}</div>
		</div>
	);
};

export default UserTop;
