import React from 'react';


interface FooterProps {
	onShareClick: () => void;
	onHistoryClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShareClick, onHistoryClick }) => {

	return (
		<div className="action">
			<div className="btn_lichsu ">
				<a onClick={onHistoryClick} href="javascript:void();">
					<img src={require('src/image/btn_history.png')} alt="" />
				</a>
			</div>

			<div className="btn_share ">
				<a
					onClick={onShareClick}
					href="javascript:void();"
				>
					<img src={require('src/image/btn_share.png')} alt="" />
				</a>
			</div>
		</div>
	);
};

export default React.memo(Footer);
