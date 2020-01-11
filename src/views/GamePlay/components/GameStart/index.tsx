import React from 'react';

const GameStart: React.FC<{ ready?: boolean }> = ({ ready = true }) => {
	return (
		<div className="animated easily bounceIn lixi ">
			<img
				className="animated easily"
				src={ready ? require('src/image/molixxi.png') : require('src/image/tet.png')}
			/>
			{ready && (
				<>
					<div className="animated easily bounceIn btn_lac">
						<img className="" src={require('src/image/btn-lac.png')} alt="" />
					</div>
					{/* <div className="laclac">
				<img className="tada" src={require('src/image/laclac.png')} alt="" />
			</div> */}
					<div className="light-top">
						<img src={require('src/image/light-top.png')} />
					</div>
					<div className="light-bot">
						<img src={require('src/image/light-bot2.png')} />
					</div>
				</>
			)}
		</div>
	);
};

export default React.memo(GameStart);
