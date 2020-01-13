import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import Apis from 'src/services/apis';

import Animation from 'src/views/GameDashboard/components/Animation';
import LoadingView from 'src/components/LoadingView';
import { GameReward } from 'src/interfaces/db';
import { get, useEventCallback, useStates } from 'src/helpers';
import UserItem from 'src/views/GameDashboard/components/UserItem';
import CountDown from 'src/components/CountDown';
import moment from 'moment-timezone';
import QRCode from 'qrcode.react';

interface Params {
	game_id: string;
}

interface GameDashboardProps {}

const GameDashboard: React.FC<GameDashboardProps> = ({}) => {
	const [loading, setLoading] = useState(true);
	const [is_game_started, setIsGameStarted] = useState(false);
	const [is_game_ended, setIsGameEnded] = useState(false);
	const [game_detail, setGameDetail] = useStates();

	const [players, setPlayers] = useStates<GameReward[]>([]);

	const params = useParams<Params>();

	const onLoad = useEventCallback(async () => {
		const game_detail = await Apis.gameDetail({ game_id: params.game_id });

		/**
		 * Game Detail
		 */
		setGameDetail(game_detail.game);

		const current_time = moment();
		const start_time = moment.unix(game_detail.game.start_time);
		const end_time = moment.unix(game_detail.game.end_time);

		if (current_time.unix() < start_time.unix()) {
			/**
			 * Game Pending
			 */

			setIsGameStarted(false);
		} else {
			if (current_time.unix() > end_time.unix()) {
				/**
				 * End Game
				 */
				setIsGameStarted(true);
				setIsGameEnded(true);
			} else {
				/**
				 * In Game
				 */
				setIsGameStarted(true);
			}
		}

		firebase
			.database()
			.ref(`/MINIAPP_app_holiday/games/${params.game_id}/game_rewards`)
			.orderByChild('money')
			.limitToLast(16)
			.on('value', game_rewards => {
				if (game_rewards.exists()) {
					let sorted_game_rewards = [];

					game_rewards.forEach(game_reward => {
						sorted_game_rewards.push({
							id: game_reward.key,
							...game_reward.val(),
						});
					});

					sorted_game_rewards = _.orderBy(sorted_game_rewards, 'money', 'desc');

					setPlayers(sorted_game_rewards);
					setLoading(false);
				}
			});
	});

	useEffect(() => {
		if (params.game_id) {
			onLoad().catch();
		}
	}, []);

	return (
		<div className="bxh bxhlixi">
			<Animation />
			{loading && <LoadingView />}
			{!loading && (
				<div className="innerBxh">
					{!is_game_started && (
						<div>
							<div className="header_user">
								<img src={require('src/image/top-bg.png')} alt=""/>
							</div>
							<div className="qrCode_Inner">
								<CountDown
									title="Game sẽ bắt đầu trong"
									time={get(game_detail, e => e.start_time * 1000, 0)}
									onComplete={() => {
										setIsGameStarted(true);
									}}
								/>
								<div className="qrCode">
									<QRCode
										value={`ac://ap?p=app.holiday&d=${params.game_id}&wi=appota.acheckin.vn`}
										size={320}
									/>
								</div>
							</div>
							<div className="help">
								Mở ACheckin để quét QRCode hoặc nhập mã <span style={{ fontSize: 30 }}>{params.game_id}</span> để chơi game
							</div>
						</div>
					)}

					{is_game_started && (
						<>
							<div className="header_user">
								<img src={require('src/image/top.png')} alt=""/>
								<div className="titleName">
									ACheckin
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
									time={get(game_detail, e => e.end_time * 1000, 0)}
									onComplete={() => {
										setIsGameEnded(true);
									}}
								/>
							)}
							<audio autoPlay={true} loop={true} controls={false}>
								<source src={require('src/image/soxo.mp3')} />
							</audio>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default GameDashboard;
