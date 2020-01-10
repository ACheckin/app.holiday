import React from 'react';
import { formatMoney, get } from 'src/helpers';
import { Player } from 'src/interfaces/db';

interface UserTopProps {
	user: Player;
	type: 'top_1' | 'top_2' | 'top_3';
}

const UserTop: React.FC<UserTopProps> = ({ user, type }) => {
	return (
		<div
			className={`user ${type === 'top_1' && 'userMid'} ${type === 'top_2' && 'userLeft'} ${type === 'top_3' && 'userRight'}`}
		>
			<div className="imageUser">
				<img src={get(user, e => e.avatar, require('src/image/Oval.png'))} width="128" alt="" />
			</div>
			<div className="infoUser">
				<div className="nameUser">{get(user, e => e.name)}</div>
				<div className="robListUsers">
					{/*<div className="robUser">*/}
					{/*	<img src={require('src/image/Oval.png')} width="22" />*/}
					{/*</div>*/}
					{/*<div className="robUser">*/}
					{/*	<img src={require('src/image/Oval.png')} width="22" />*/}
					{/*</div>*/}
					{/*<div className="robUser">*/}
					{/*	<img src={require('src/image/Oval.png')} width="22" />*/}
					{/*</div>*/}
					{/*<div className="robUser">*/}
					{/*	<img src={require('src/image/Oval.png')} width="22" />*/}
					{/*</div>*/}
					{/*<div className="more">*/}
					{/*	+ 12 người khác*/}
					{/*</div>*/}
					<div className="more-title-start">Nhận của hồi môn</div>
				</div>
			</div>
			<div className="valueUser">{formatMoney(get(user, e => e.reward.money))}</div>
		</div>
	);
};

export default UserTop;
