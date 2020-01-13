import React from 'react';


interface FooterProps {
	onShareClick: () => void;
	onHistoryClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onShareClick, onHistoryClick }) => {

	return (
		<div className="action">
			<div className="action2col">
				<div className="animated easily slideInLeft btn_footer">
					<a onClick={onHistoryClick} href="javascript:void();">
						<img src={require('src/image/btn_history.png')} alt="" />
					</a>
				</div>
				<div className="animated easily slideInRight btn_footer">
					<a onClick={onShareClick} href="javascript:void();" >
						<img src={require('src/image/btn_share.png')} alt="" />
					</a>
				</div>
			</div>

		</div>
	);
};

export default React.memo(Footer);
