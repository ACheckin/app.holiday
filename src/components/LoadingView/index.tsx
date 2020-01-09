import React from 'react';

const LoadingView: React.FC = () => {
	return (
		<div
			style={{
				position: 'absolute',
				zIndex: 9999,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div style={{ width: 100, height: 100 }}>
				<img src={require('src/image/btn-lac.png')} alt="" />
			</div>
		</div>
	);
};

export default React.memo(LoadingView);
