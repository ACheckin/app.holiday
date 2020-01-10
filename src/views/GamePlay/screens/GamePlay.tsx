import React, { useEffect, useState } from 'react';
import { ACheckinSDK } from '@acheckin/react-app-sdk';
import Apis from 'src/services/apis';
import { RouteComponentProps, useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import { Player } from 'src/interfaces/db';
import { useEventCallback } from 'src/helpers';
import moment from 'moment-timezone';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';
import Footer from 'src/views/GamePlay/components/Footer';
import GameStart from 'src/views/GamePlay/components/GameStart';
import GameScore from 'src/views/GamePlay/components/GameScore';
import LoadingView from 'src/components/LoadingView';
import CountDown from 'src/components/CountDown';

interface GamePlayProps {
	navigation: RouteComponentProps;
}

interface Params {
	game_id: string;
}

const GamePlay: React.FC<GamePlayProps> = ({ navigation }) => {
	const [score, setScore] = useState(0);
	const [is_end_game, setIsEndGame] = useState(false);
	const [loading, setLoading] = useState(true);

	const params = useParams<Params>();

	/**
	 * @event onShake
	 *
	 * Handle When Shake Device
	 */
	const onShake = useEventCallback(async () => {
		if (!Apis.isChangeReward()) {
			try {
				Apis.setChangeReward(true);

				const change_reward_response = await Apis.changeReward({
					game_access_code: Apis.getGameAccessCode(),
					game_id: '670075',
				});

				Apis.setGameAccessCode(change_reward_response.game_access_code);
			} catch (e) {}

			Apis.setChangeReward(false);
		}
	});

	useEffect(() => {
		const removeListener = ACheckinSDK.addShakeEventListener(onShake);

		return () => {
			removeListener();
		};
	}, []);

	useEffect(() => {
		if (params.game_id) {
			(async () => {
				try {
					const game_detail_response = await Apis.gameDetail({ game_id: params.game_id });

					const start_time = moment.unix(game_detail_response.game.start_time);
					const end_time = moment.unix(game_detail_response.game.end_time);
					const current_time = moment().unix();

					/**
					 * Join Game
					 */
					const join_game_response = await Apis.joinGame({
						game_id: params.game_id,
					});

					Apis.setGameAccessCode(join_game_response.game_access_code);

					/**
					 * Listen Firebase Database
					 */
					firebase
						.database()
						.ref(`/MINIAPP_app_holiday/games/${params.game_id}/players/${Apis.getUserInfo().id}`)
						.on('value', snapshot => {
							const player: Player = snapshot.val();

							if (player) {
								setScore(player.reward.money);
								setLoading(false);
							}
						});

					/**
					 * Listen Firebase Database User History Add
					 */
					firebase
						.database()
						.ref(`/MINIAPP_app_holiday/games/${params.game_id}/players/${Apis.getUserInfo().id}/history`)
						.on('child_added', snapshot => {
							const history = snapshot.val();
						});
				} catch (e) {}
			})();
		}
	}, []);

	/**
	 * @event onCountdownComplete
	 *
	 * Handle When Countdown complete
	 */
	const onCowndownComplete = useEventCallback(() => {
		setIsEndGame(true);
	});

	/**
	 * @event onClick
	 *
	 * Share Button
	 */
	const onShareCLick = useEventCallback(async () => {
		try {
			await ACheckinSDK.shareScreen('Chúc bạn và gia đình một năm mới an khang thịnh vượng');
		} catch (e) {}
	});

	/**
	 * @event onClick
	 *
	 * History Button
	 */
	const onHistoryClick = useEventCallback(() => {
		navigation.history.push(`/game/670075/history`);
	});

	return (
		<div className="wrap pagelaclixi">
			<div className="bg fixed" />
			<Animation />
			<Content>
				{loading && <LoadingView />}
				{!loading && (
					<>
						{!is_end_game && (
							<CountDown
								title="Game sẽ kết thúc trong"
								time={Date.now() + 5000}
								onComplete={onCowndownComplete}
							/>
						)}
						{score === 0 && <GameStart />}
						{score > 0 && <GameScore score={score} />}
						{is_end_game && <Footer onShareClick={onShareCLick} onHistoryClick={onHistoryClick} />}
					</>
				)}
			</Content>
			<div id="warning-message">Vui Lòng Xoay Dọc Màn Hình :)</div>
		</div>
	);
};

export default GamePlay;
