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
					<img className="logoTet_Pic" src={require('src/image/tet.png')} alt=""/>
				</div>
			</div>
		</div>
	);
};

export default GameDashboardStart;
