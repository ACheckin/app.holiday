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
				<div style={{ fontWeight: 700, fontSize: 100, color: '#EFBC61' }}>Chúc mừng năm mới</div>
			</div>
		</div>
	);
};

export default GameDashboardStart;
