import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';

import Animation from 'src/views/GameDashboard/components/Animation';
import UserTop from 'src/views/GameDashboard/components/UserTop';
import LoadingView from 'src/components/LoadingView';
import { GameReward } from 'src/interfaces/db';
import { useStates } from 'src/helpers';
import UserItem from 'src/views/GameDashboard/components/UserItem';
import CountDown from 'src/components/CountDown';

interface Params {
	game_id: string;
}

const GameDashboard: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [is_game_started, setIsGameStarted] = useState(false);
	const [is_game_ended, setIsGameEnded] = useState(false);

	const [user_top_1, setUserTop1] = useStates<GameReward>();
	const [user_top_2, setUserTop2] = useStates<GameReward>();
	const [user_top_3, setUserTop3] = useStates<GameReward>();

	const [players, setPlayers] = useStates<GameReward[]>([]);

	const params = useParams<Params>();

	useEffect(() => {
		if (params.game_id) {
			firebase
				.database()
				.ref(`/MINIAPP_app_holiday/games/${params.game_id}/game_rewards`)
				.orderByChild('money')
				.limitToLast(11)
				.on('value', game_rewards => {
					if (game_rewards.exists()) {
						let sorted_game_rewards = [];
						let player_list = [];

						game_rewards.forEach(game_reward => {
							sorted_game_rewards.push({
								id: game_reward.key,
								...game_reward.val(),
							});
						});

						sorted_game_rewards = _.orderBy(sorted_game_rewards, 'money', 'desc');

						let count = 0;

						for (let sorted_game_reward of sorted_game_rewards) {
							if (count < 3) {
								if (count === 0) {
									setUserTop1(sorted_game_reward);
								}
								if (count === 1) {
									setUserTop2(sorted_game_reward);
								}
								if (count === 2) {
									setUserTop3(sorted_game_reward);
								}
							} else {
								player_list.push(sorted_game_reward);
							}

							count++;
						}

						setPlayers(player_list);

						setLoading(false);
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
					{!is_game_started && (
						<div className="qrCode_Inner">
							<CountDown
								title="Game sẽ bắt đầu trong"
								time={Date.now() + 5000}
								onComplete={() => {
									setIsGameStarted(true);
								}}
							/>
							<div className="qrCode">
								<img src={require('src/image/qr_code.png')} width="320" />
							</div>
						</div>
					)}

					{is_game_started && (
						<>
							<div className="block-1">
								<div className="imageShelf">
									<img src={require('src/image/shelf.png')} />
								</div>
								<div className="topUser">
									<UserTop game_reward={user_top_2} type="top_2" />
									<UserTop game_reward={user_top_1} type="top_1" />
									<UserTop game_reward={user_top_3} type="top_3" />
								</div>
							</div>

							<div className="block-2">
								{players.map(player => (
									<UserItem key={player.id} game_reward={player} />
								))}
							</div>
							{!is_game_ended && (
								<CountDown
									title="Game sẽ kết thúc trong"
									time={Date.now() + 5000}
									onComplete={() => {
										setIsGameEnded(true);
									}}
								/>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default GameDashboard;
