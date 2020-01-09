import React from 'react';

const GameStart: React.FC = () => {
	return (
		<div className="lixi">
			<img src={require('src/image/molixxi.png')} />
			<div className="btn_lac">
				<img className="" src={require('src/image/btn-lac.png')} alt="" />
			</div>
			<div className="light-top">
				<img src={require('src/image/light-top.png')} />
			</div>
		</div>
	);
};

export default React.memo(GameStart);
