import React from 'react';


interface FooterProps {
	onCreateGameClick: () => void;
	onPlayGameClick: () => void;
}

const FooterStart: React.FC<FooterProps> = ({ onCreateGameClick, onPlayGameClick }) => {

	return (
		<div className="action">
			<div className="btn_footer ">
				<a onClick={onPlayGameClick} href="javascript:void();">
					<img src={require('src/image/btn_play.png')} alt="" />
				</a>
			</div>

			<div className="btn_footer ">
				<a
					onClick={onCreateGameClick}
					href="javascript:void();"
				>
					<img src={require('src/image/btn_create.png')} alt="" />
				</a>
			</div>
		</div>
	);
};

export default React.memo(FooterStart);
