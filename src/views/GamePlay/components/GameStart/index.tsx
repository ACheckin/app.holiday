import React from 'react';

const GameStart: React.FC<{ ready?: boolean }> = ({ ready = true }) => {
	return (
		<div className="animated easily bounceIn lixi ">
			{!ready && (
				<div className="logoTet">
					<div className="logoTet_Inner">
						<img className="logoTet_Bg" src={require('src/image/tet_bg.png')} alt=""/>
						<img className="logoTet_Circle" src={require('src/image/tet_circle.png')} alt=""/>
					</div>
				</div>
			)}
			{ready && (
				<img
					className="animated easily"
					src={require('src/image/molixxi.png')}
				/>
			)}
			
			{ready && (
				<>
					<div className="animated easily bounceIn btn_lac">
						<img className="" src={require('src/image/btn-lac.png')} alt="" />
					</div>
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
