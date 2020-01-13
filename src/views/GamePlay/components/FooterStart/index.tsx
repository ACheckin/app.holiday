import React from 'react';


interface FooterProps {
	onCreateGameClick: () => void;
	onPlayGameClick: () => void;
}

const FooterStart: React.FC<FooterProps> = ({ onCreateGameClick, onPlayGameClick }) => {

	return (
		<div className="action">
			{/* <div className="action1col">
				<div className="animated easily slideInDown btn_footer">
					<a onClick={onCreateGameClick} href="javascript:void();" >
						<img src={require('src/image/lixi_da_nhan.png')} alt="" />
					</a>
				</div>
			</div> */}
			<div className="action2col">
				<div className="animated easily slideInLeft btn_footer">
					<a onClick={onPlayGameClick} href="javascript:void();">
						<img src={require('src/image/btn_play.png')} alt="" />
					</a>
				</div>
				<div className="animated easily slideInRight btn_footer">
					<a onClick={onCreateGameClick} href="javascript:void();" >
						<img src={require('src/image/btn_create.png')} alt="" />
					</a>
				</div>
				
			</div>
			
		</div>
	);
};

export default React.memo(FooterStart);
