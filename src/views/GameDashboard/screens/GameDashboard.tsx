import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import Apis from 'src/services/apis';
import { CSVLink } from 'react-csv';

import Animation from 'src/views/GameDashboard/components/Animation';
import LoadingView from 'src/components/LoadingView';
import { GameReward } from 'src/interfaces/db';
import { detectmob, get, useEventCallback, useStates } from 'src/helpers';
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
	const [error, setError] = useState(null);

	const [workspace_id, setWorkspaceId] = useState(null);
	const [custom, setCustom] = useState(null);

	const audioRef = useRef<any>();

	const [result_players, setResultPlayers] = useStates<GameReward[]>([]);

	const [players, setPlayers] = useStates<GameReward[]>([]);

	const params = useParams<Params>();

	const onLoad = useEventCallback(async () => {
		try {
			setError(null);

			const game_detail = await Apis.gameDetail({ game_id: params.game_id });

			/**
			 * Game Detail
			 */
			setGameDetail(game_detail.game);

			const current_time = moment();
			const start_time = moment.unix(game_detail.game.start_time);
			const end_time = moment.unix(game_detail.game.end_time);

			let end_game = false;

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

					end_game = true;
				} else {
					/**
					 * In Game
					 */
					setIsGameStarted(true);
				}
			}

			firebase
				.database()
				.ref(`/MINIAPP_app_holiday/games/${params.game_id}`)
				.once('value', snapshot => {
					const game = snapshot.val();

					setWorkspaceId(game.workspace_id);
					setCustom(get(game, e => e.custom, null));
				});

			if (!end_game) {
				firebase
					.database()
					.ref(`/MINIAPP_app_holiday/games/${params.game_id}/game_rewards`)
					.orderByChild('money')
					.limitToLast(24)
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
			}
		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	});

	useEffect(() => {
		if (params.game_id) {
			onLoad().catch();
		}
	}, []);

	useEffect(() => {
		if (is_game_started) {
			console.log('audioRef.current', audioRef.current);
			audioRef.current && audioRef.current.play();
		}
	}, [is_game_started]);

	const onEndGame = useEventCallback(async () => {
		try {
			const result = await Apis.getGameResult({ game_id: params.game_id, history: true, top: 24 });

			let rewards = [];
			for (let reward of result.rewards) {
				rewards.push({
					id: reward.user_id,
					...reward,
				});
			}

			setPlayers(_.orderBy(rewards, 'money', 'desc'));
			setLoading(false);
		} catch (e) {}
	});

	const onEndGameDownload = useEventCallback(async () => {
		try {
			const result = await Apis.getGameResult({ game_id: params.game_id });

			let rewards = [];
			for (let reward of result.rewards) {
				rewards.push({
					id: reward.user_id,
					...reward,
				});
			}

			setResultPlayers(_.orderBy(rewards, 'money', 'desc'));
			setLoading(false);
		} catch (e) {}
	});

	useEffect(() => {
		if (is_game_ended) {
			onEndGame().catch(() => {});
			onEndGameDownload().catch(() => {});
		}
	}, [is_game_ended]);

	if (detectmob()) {
		return (
			<div className="bxh bxhlixi">
				<div
					style={{
						height: ' 100vh',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						padding: 30,
						color: '#fff',
						textAlign: 'center',
						fontWeight: 700,
					}}
				>
					Bảng xếp hạng không khả dụng trên trình duyệt thiết bị di động, vui lòng mở bằng trình duyệt của máy
					tính
				</div>
			</div>
		);
	}

	return (
		<div className="bxh bxhlixi">
			<Animation />
			{loading && <LoadingView />}
			{!loading && error && (
				<div
					style={{
						width: '100vw',
						height: '100vh',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#fff',
						fontWeight: 700,
						fontSize: 30,
					}}
				>
					{error}
				</div>
			)}
			{!loading && !error && (
				<div className="innerBxh">
					<div className="innerBxh_Content">
						{!is_game_started && (
							<div>
								<div className="header_user">
									<img src={require('src/image/top-bg.png')} alt="" />
								</div>
								<div className="qrCode_Inner">
									<CountDown
										isPC={false}
										title="Game sẽ bắt đầu trong"
										time={get(game_detail, e => e.start_time * 1000, 0)}
										onComplete={() => {
											setIsGameStarted(true);
										}}
									/>
									<div className="qrCode">
										<QRCode
											value={`acheckin://ap?p=app.holiday&d=${params.game_id}&wi=${workspace_id}`}
											size={320}
										/>
									</div>
								</div>
								<div className="help">
									Mở ACheckin để quét QRCode hoặc nhập mã{' '}
									<span style={{ fontSize: 30 }}>{params.game_id}</span> để chơi game
								</div>
								<iframe
									src="https://www.nhaccuatui.com/mh/background/KTpIOEABzL"
									width="1"
									height="1"
									frameBorder="0"
									allowFullScreen
									allow="autoplay"
								/>
							</div>
						)}

						{is_game_started && (
							<>
								<div className="header_user">
									<img src={require('src/image/top.png')} alt="" />
									<div className="titleName">{get(game_detail, e => e.name)}</div>
								</div>
								{!is_game_ended && (
									<CountDown
										isPC={true}
										title="Game sẽ kết thúc trong"
										time={get(game_detail, e => e.end_time * 1000, 0)}
										onComplete={() => {
											setIsGameEnded(true);
										}}
									/>
								)}
								<div className="block-2">
									{is_game_ended && (
										<div className="welcome">
											{custom
												? custom
												: 'Bằng tất cả sự chân thành của mình, tôi xin cảm ơn những đóng góp của tất cả các thành viên trong Công ty trong suốt một năm qua. Chúc anh/chị/em một năm mới an khang,thịnh vượng.'}
										</div>
									)}
									<div className="block-inner">
										{players.map(player => (
											<UserItem is_endgame={is_game_ended} key={player.id} game_reward={player} />
										))}
									</div>
								</div>
								{!is_game_ended && (
									<iframe
										scrolling="no"
										width="1"
										height="1"
										src="https://zingmp3.vn/embed/song/ZW9CI9EA?start=true"
										frameBorder="0"
										allow="autoplay"
										allowFullScreen
									/>
								)}
								{is_game_ended && (
									<iframe
										src="https://www.nhaccuatui.com/mh/background/KTpIOEABzL"
										width="1"
										height="1"
										frameBorder="0"
										allowFullScreen
										allow="autoplay"
									/>
								)}
							</>
						)}
					</div>
				</div>
			)}
			{is_game_ended && result_players.length > 0 && !detectmob() &&(
				<div className="btnFooter">
					<CSVLink
						className="btnFooter_Item"
						data={result_players}
						headers={[
							{ label: 'Mã nhân viên', key: 'staff_id' },
							{ label: 'Họ và tên', key: 'name' },
							{ label: 'Số tiền lì xì', key: 'money' },
						]}
						filename="ketqua.csv"
					>
						Xuất dữ liệu
					</CSVLink>
				</div>
			)}
			{detectmob() &&(
				<div className="btnFooter">
					<a className="btnFooter_Item">Tham gia game</a>
				</div>
			)}
		</div>
	);
};

export default GameDashboard;
