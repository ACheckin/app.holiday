import React from 'react';

const UserItem: React.FC = () => {
	return (
		<div className="item">
			<div className="image-user">
				<img src={require('src/image/imguser.png')} width="60"/>
			</div>
			<div className="info-item">
				<div className="nameUser-item">
					Hoàng Hải Phong
				</div>
				<div className="robListUsers">
					<div className="robUser">
						<img  src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="robUser">
						<img  src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="robUser">
						<img  src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="robUser">
						<img  src={require('src/image/Oval.png')} width="22" />
					</div>
					<div className="more">
						+ 12 người khác
					</div>
				</div>
			</div>
			<div className="valueUserItem">
				400.000đ
			</div>
		</div>
	);
};

export default UserItem;
