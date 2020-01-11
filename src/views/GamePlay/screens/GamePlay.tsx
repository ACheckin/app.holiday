import React, { useEffect, useState } from 'react';
import { ACheckinSDK } from '@acheckin/react-app-sdk';
import Apis from 'src/services/apis';
import { RouteComponentProps, useLocation, useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import { Player } from 'src/interfaces/db';
import { get, useEventCallback, useStates, useStyleIphoneX } from 'src/helpers';
import moment from 'moment-timezone';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';
import Footer from 'src/views/GamePlay/components/Footer';
import GameStart from 'src/views/GamePlay/components/GameStart';
import GameScore from 'src/views/GamePlay/components/GameScore';
import LoadingView from 'src/components/LoadingView';
import CountDown from 'src/components/CountDown';
import { GameDetailResponse } from 'src/interfaces/apis';

interface GamePlayProps {
	navigation: RouteComponentProps;
}

interface Params {
	game_id: string;
}

const GamePlay: React.FC<GamePlayProps> = ({ navigation }) => {
	const [score, setScore] = useState(0);
	const [is_end_game, setIsEndGame] = useState(false);
	const [is_game_started, setGameStarted] = useState(false);
	const [game_detail, setGameDetail] = useStates<GameDetailResponse>({} as GameDetailResponse);
	const [history, setHistory] = useStates();

	const [loading, setLoading] = useState(true);
	const [sharing, setSharing] = useState(false);

	const params = useParams<Params>();
	const locations = useLocation<GameDetailResponse>();

	useStyleIphoneX();

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
					game_id: params.game_id,
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
					let game_detail_response;

					if (locations.state) {
						game_detail_response = locations.state;
					} else {
						game_detail_response = await Apis.gameDetail({ game_id: params.game_id });
					}

					/**
					 * Join Game
					 */
					try {
						const join_game_response = await Apis.joinGame({
							game_id: params.game_id,
						});

						Apis.setGameAccessCode(join_game_response.game_access_code);
					} catch (e) {}

					setGameDetail(game_detail_response);

					const start_time = moment.unix(game_detail_response.game.start_time);
					const end_time = moment.unix(game_detail_response.game.end_time);
					const current_time = moment();

					if (current_time.unix() < start_time.unix()) {
						/**
						 * Game Wating
						 */
						setGameStarted(false);
					} else {
						if (current_time.unix() < end_time.unix()) {
							setGameStarted(true);
						} else {
							setGameStarted(true);
							setIsEndGame(true);
						}
					}

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
							}

							setLoading(false);
						});

					/**
					 * Listen Firebase Database User History Add
					 */
					firebase
						.database()
						.ref(`/MINIAPP_app_holiday/games/${params.game_id}/players/${Apis.getUserInfo().id}/history`)
						.on('child_added', snapshot => {
							const history = snapshot.val();
							if (history) {
								setHistory(history);
							}
						});
				} catch (e) {
					console.log(e);
				}
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

	const onCowndownStartGame = useEventCallback(() => {
		setGameStarted(true);
	});

	/**
	 * @event onClick
	 *
	 * Share Button
	 */
	const onShareCLick = useEventCallback(async () => {
		setSharing(true);

		setTimeout(async () => {
			try {
				await ACheckinSDK.shareScreen('Chúc bạn và gia đình một năm mới an khang thịnh vượng');
			} catch (e) {}

			setSharing(false);
		}, 350);
	});

	/**
	 * @event onClick
	 *
	 * History Button
	 */
	const onHistoryClick = useEventCallback(() => {
		navigation.history.push(`/game/${params.game_id}/history`);
	});

	return (
		<div className="container">
			{!sharing && (
				<div className="header" style={{ zIndex: 9999 }}>
					<a
						className="btnBack"
						onClick={() => {
							navigation.history.push('/');
						}}
					>
						<img src={require('src/image/back.svg')} />
					</a>
				</div>
			)}
			<div className="wrap pagelaclixi">
				<div className="bg fixed" />
				<Animation />
				<Content>
					{loading && <LoadingView />}
					{!loading && (
						<>
							{!is_game_started && (
								<>
									<CountDown
										title="Game sẽ bắt đầu trong"
										time={get(game_detail, e => e.game.start_time) * 1000}
										onComplete={onCowndownStartGame}
									/>
									<GameStart />
								</>
							)}
							{is_game_started && (
								<>
									{!is_end_game && (
										<CountDown
											title="Game sẽ kết thúc trong"
											time={get(game_detail, e => e.game.end_time) * 1000}
											onComplete={onCowndownComplete}
										/>
									)}
									{score === 0 && <GameStart />}
									{score > 0 && <GameScore score={score} history={history} />}
									{!sharing && is_end_game && (
										<Footer onShareClick={onShareCLick} onHistoryClick={onHistoryClick} />
									)}
								</>
							)}
						</>
					)}
				</Content>
				<div className="footer fixed" style={{ zIndex: 9999 }}>
					<img src={require('src/image/footer.png')} alt="" />
				</div>
				<div id="warning-message">Vui Lòng Xoay Dọc Màn Hình :)</div>
			</div>
		</div>
	);
};

export default GamePlay;
