import React from 'react';
import { GameReward } from 'src/interfaces/db';
import { formatMoney, get } from 'src/helpers';
import _ from 'lodash';

interface UserItemProps {
	game_reward: GameReward;
}

const UserItem: React.FC<UserItemProps> = ({ game_reward }) => {


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
		<div className="item">
			<div className="image-user">
				<img
					src={get(game_reward, e => e.user.avatar, require('src/image/btn-lac.png'))}
				/>
			</div>
			<div className="info-item">
				<div className="nameUser-item">{get(game_reward, e => e.user.name, 'Đang hóng')}</div>
				<div className="robListUsers">
					{renderMore()}
				</div>
			</div>
			<div className={formatMoney(get(game_reward, e => e.money, 0)).length < 10 ? "valueUserItem" : "valueUserItem2"}>{formatMoney(get(game_reward, e => e.money, 0))}</div>
		</div>
	);
};

export default UserItem;
