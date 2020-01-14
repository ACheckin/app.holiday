import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import _ from 'lodash';
import Apis from 'src/services/apis';
import { CSVLink } from 'react-csv';

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
	const [error, setError] = useState(null);

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
		if (is_game_ended) {
			firebase
				.database()
				.ref(`/MINIAPP_app_holiday/games/${params.game_id}/game_rewards`)
				.orderByChild('money')
				.once('value', snapshot => {
					const users = snapshot.val();
					const result = [];

					for (let user of users) {
						result.push({
							name: get(user, e => e.user.name),
							money: get(user, e => e.money, 0),
						});
					}

					setResultPlayers(result);
				});
		}
	}, [is_game_ended]);

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
						fontSize: 30
					}}
				>
					{error}
				</div>
			)}
			{!loading && !error && (
				<div className="innerBxh">
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
										value={`ac://ap?p=app.holiday&d=${params.game_id}&wi=appota.acheckin.vn`}
										size={320}
									/>
								</div>
							</div>
							<div className="help">
								Mở ACheckin để quét QRCode hoặc nhập mã{' '}
								<span style={{ fontSize: 30 }}>{params.game_id}</span> để chơi game
							</div>
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
										"Bằng tất cả sự kính trọng của mình, tôi xin cảm ơn những tình cảm tốt đẹp của
										CBCNV Công ty trong suốt một năm qua. Chúc anh/chị/em một năm mới an khang,
										thịnh vượng."
									</div>
								)}
								<div className="block-inner">
									{players.map(player => (
										<UserItem key={player.id} game_reward={player} />
									))}
								</div>
							</div>

							{!is_game_ended && (
								<audio autoPlay={true} loop={true} controls={false}>
									<source src={require('src/image/soxo.mp3')} />
								</audio>
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
			)}
			{is_game_ended && result_players.length > 0 && (
				<div className="btnFooter">
					<CSVLink
						className="btnFooter_Item"
						data={result_players}
						headers={[
							{ label: 'Họ và tên', key: 'name' },
							{ label: 'Số tiền lì xì', key: 'money' },
						]}
						filename="ketqua.csv"
					>
						Xuất dữ liệu
					</CSVLink>
				</div>
			)}
		</div>
	);
};

export default GameDashboard;
