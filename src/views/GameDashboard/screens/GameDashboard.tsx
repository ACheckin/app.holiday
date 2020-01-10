import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';

import Animation from 'src/views/GameDashboard/components/Animation';
import UserTop from 'src/views/GameDashboard/components/UserTop';
import CountDown from 'src/views/GameDashboard/components/CountDown';
import LoadingView from 'src/components/LoadingView';
import { Player } from 'src/interfaces/db';
import { useStates } from 'src/helpers';
import UserItem from 'src/views/GameDashboard/components/UserItem';

interface Params {
	game_id: string;
}

const GameDashboard: React.FC = () => {
	const [loading, setLoading] = useState(true);

	const [user_top_1, setUserTop1] = useStates<Player>();
	const [user_top_2, setUserTop2] = useStates<Player>();
	const [user_top_3, setUserTop3] = useStates<Player>();

	const [players, setPlayers] = useStates<Player[]>([]);

	const params = useParams<Params>();

	useEffect(() => {
		if (params.game_id) {
			firebase
				.database()
				.ref(`/MINIAPP_app_holiday/games/${params.game_id}/players`)
				.on('value', snapshot => {
					const players: Player[] = Object.values(snapshot.val());

					let count = 0;

					if(players) {
						for (let player of players) {
							if(count === 0) {
								setUserTop1(player);
							}

							if(count === 1) {
								setUserTop1(player);
							}

							if(count === 2) {
								setUserTop1(player);
							}
						}
					}


				});
		}
	}, []);

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
							<UserTop user={user_top_2} type="top_2" />
							<UserTop user={user_top_1} type="top_1" />
							<UserTop user={user_top_3} type="top_3" />
						</div>
					</div>

					<div className="block-2">
						{players.map(player => (
							<UserItem key={player.staff_id} user={player} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default GameDashboard;
