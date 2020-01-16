import React from 'react';

import Animation from 'src/views/GameDashboard/components/Animation';

const GameDashboardStart: React.FC = () => {
	return (
		<div className="bxh bxhlixi">
			<Animation />
			<div
				style={{
					zIndex: 9999,
					position: 'absolute',
					width: '100vw',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div className="logoTet">
					<div className="logoTet_Inner">
						<img className="logoTet_Bg" src={require('src/image/tet_bg.png')} alt="" />
						<img className="logoTet_Circle" src={require('src/image/tet_circle.png')} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameDashboardStart;
