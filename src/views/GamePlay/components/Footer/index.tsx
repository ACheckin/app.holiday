import React from 'react';

const Footer: React.FC = () => {
	return (
		<div className="action">
			<div className="btn_lichsu ">
				<a href="#">
					<img src={require('src/image/btn_history.png')} alt="" />
				</a>
			</div>

			<div className="btn_share ">
				<a href="#">
					<img src={require('src/image/btn_share.png')} alt="" />
				</a>
			</div>
		</div>
	);
};

export default Footer;
