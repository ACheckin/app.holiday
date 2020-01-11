import React from 'react';

const GameStart: React.FC<{ ready?: boolean }> = ({ ready = true }) => {
	return (
		<div className="animated easily bounceIn lixi">
			<img
				className="animated easily"
				src={ready ? require('src/image/molixxi.png') : require('src/image/baolixxi.png')}
			/>
			<div className="animated easily bounceIn btn_lac">
				<img className="" src={require('src/image/btn-lac.png')} alt="" />
			</div>
			<div className="light-top">
				<img src={require('src/image/light-top.png')} />
			</div>
			<div className="light-bot">
				<img src={require('src/image/light-bot2.png')} />
			</div>
			{!ready && (
				<div style={{ zIndex: 999, position: 'absolute', top: 0,  }}>
					<div style={{ color: '#EFBC61', fontWeight: 700, fontSize: 30 }}>Chỉ mở khi đến lúc</div>
					<div style={{ color: '#EFBC61', fontWeight: 700 }}>Nhái một câu nào đó trong bộ phim nào đó</div>
				</div>
			)}
		</div>
	);
};

export default React.memo(GameStart);
