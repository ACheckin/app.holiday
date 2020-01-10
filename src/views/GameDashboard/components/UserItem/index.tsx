import React from 'react';
import { Player } from 'src/interfaces/db';
import { formatMoney, get } from 'src/helpers';

interface UserItemProps {
	user: Player;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
	return (
		<div className="item">
			<div className="image-user">
				<img src={get(user, e => e.avatar, require('src/image/imguser.png'))} width="60" />
			</div>
			<div className="info-item">
				<div className="nameUser-item">{get(user, e => e.name)}</div>
				<div className="robListUsers">
					<div className="robUser">
						<img src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="robUser">
						<img src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="robUser">
						<img src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="robUser">
						<img src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="more">+ 12 người khác</div>
				</div>
			</div>
			<div className="valueUserItem">{formatMoney(get(user, e => e.reward.money, 0))}</div>
		</div>
	);
};

export default UserItem;
