import React from 'react';
import { formatMoney } from 'src/helpers';

interface UserTopProps {
	name: string
	avatar: string
	score: number
	type: 'top_1' | 'top_2' | 'top_3'
}

const UserTop: React.FC<UserTopProps> = ({
	avatar,
	name,
	score,
	type
}) => {
	return (
		<div className={`user ${type === 'top_1' && 'userMid'} ${type === 'top_2' && 'userLeft'} ${type === 'top_3' && 'userRight'}`}>
			<div className="imageUser">
				<img src={require('src/image/Oval.png')} width="128" alt="" />
			</div>
			<div className="infoUser">
				<div className="nameUser">
					{name}
				</div>
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
					<div className="more-title-start">
						Nhận của hồi môn
					</div>
				</div>
			</div>
			<div className="valueUser">
				{formatMoney(score)}
			</div>
		</div>
	);
};

export default UserTop;
