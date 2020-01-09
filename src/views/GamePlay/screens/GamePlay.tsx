import React, { useEffect, useState } from 'react';
import { ACheckinSDK } from '@acheckin/react-app-sdk';
import Apis from 'src/services/apis';
import { RouteComponentProps, useParams } from 'react-router-dom';
import * as firebase from 'firebase';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';
import CountDown from 'src/views/GamePlay/components/CountDown';
import Footer from 'src/views/GamePlay/components/Footer';
import GameStart from 'src/views/GamePlay/components/GameStart';
import { Player } from 'src/interfaces/db';
import GameScore from 'src/views/GamePlay/components/GameScore';
import LoadingView from 'src/components/LoadingView';

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

	useEffect(() => {
		const removeListener = ACheckinSDK.addShakeEventListener(() => {});

		return () => {
			removeListener();
		};
	}, []);

	useEffect(() => {
		(async () => {
			try {
				/**
				 * Join Game
				 */
				const join_game_response = await Apis.joinGame({
					game_id: '670075',
				});

				Apis.setGameAccessCode(join_game_response.game_access_code);

				/**
				 * Listen Firebase Database
				 */
				firebase
					.database()
					.ref(`/MINIAPP_app_holiday/games/670075/players/${Apis.getUserInfo().id}`)
					.on('value', snapshot => {
						const player: Player = snapshot.val();

						if (player) {
							setLoading(false);
							setScore(player.reward.money);
						}
					});
			} catch (e) {}
		})();
	}, []);

	return (
		<div className="wrap pagelaclixi">
			<div className="bg fixed" />
			<Animation />
			<Content>
				{loading && <LoadingView />}
				{!loading && (
					<>
						<CountDown />
						{score === 0 && <GameStart />}
						{score > 0 && <GameScore score={score} />}
						{is_end_game && <Footer />}
					</>
				)}
			</Content>
			<div id="warning-message">Vui Lòng Xoay Dọc Màn Hình :)</div>
		</div>
	);
};

export default GamePlay;
