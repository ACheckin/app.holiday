import React, { useEffect, useState } from 'react';
import Animation from 'src/views/GameDashboard/components/Animation';
import UserTop from 'src/views/GameDashboard/components/UserTop';
import CountDown from 'src/views/GameDashboard/components/CountDown';
import LoadingView from 'src/components/LoadingView';

const GameDashboard: React.FC = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {}, [

	]);

	return (
		<div className="bxh bxhlixi">
			<Animation />
			{loading && <LoadingView />}
			{!loading && (
				<div className="innerBxh">
					<div className="qrCode_Inner">
						<CountDown onComplete={() => {}} />
						<div className="qrCode">
							<img src={require('src/image/qr_code.png')} width="320" />
						</div>
					</div>

					<div className="block-1">
						<div className="imageShelf">
							<img src={require('src/image/shelf.png')} />
						</div>
						<div className="topUser">
							<UserTop name="Nguyễn Văn Hải" avatar="" score={3000000} type="top_2" />
							<UserTop name="Nguyễn Văn Hải" avatar="" score={3000000} type="top_1" />
							<UserTop name="Nguyễn Văn Hải" avatar="" score={3000000} type="top_3" />
						</div>
					</div>

					<div className="block-2"></div>
				</div>
			)}
		</div>
	);
};

export default GameDashboard;
