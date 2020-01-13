import React from 'react';
import _ from 'lodash';

interface FooterProps {
	onCreateGameClick: () => void;
	onPlayGameClick: () => void;
	last_game_id?: string;
}

const FooterStart: React.FC<FooterProps> = ({ onCreateGameClick, onPlayGameClick, last_game_id }) => {
	return (
		<div className="action">
			{!_.isEmpty(last_game_id) && (
				<div className="action1col">
					<div className="animated easily slideInDown btn_footer">
						<a onClick={onCreateGameClick} href="javascript:void();">
							<img src={require('src/image/lixi_da_nhan.png')} alt="" />
						</a>
					</div>
				</div>
			)}
			<div className="action2col">
				<div className="animated easily slideInLeft btn_footer">
					<a onClick={onPlayGameClick} href="javascript:void();">
						<img src={require('src/image/btn_play.png')} alt="" />
					</a>
				</div>
				<div className="animated easily slideInRight btn_footer">
					<a onClick={onCreateGameClick} href="javascript:void();">
						<img src={require('src/image/btn_create.png')} alt="" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default React.memo(FooterStart);
