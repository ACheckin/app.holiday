import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import { HistoryValue, Player } from 'src/interfaces/db';
import LoadingView from 'src/components/LoadingView';
import { get, useStates } from 'src/helpers';
import Apis from 'src/services/apis';

import ScoreHeader from 'src/views/GameHistory/components/ScoreHeader';
import Animation from 'src/views/GameHistory/components/Animation';
import HistoryItem from 'src/views/GameHistory/components/HistoryItem';

interface GameHistoryProps {}

interface Params {
	game_id: string;
}

const GameHistory: React.FC<GameHistoryProps> = () => {
	const params = useParams<Params>();

	const [loading, setLoading] = useState(true);
	const [history_data, setHistoryData] = useStates<HistoryValue[]>([]);
	const [score, setScore] = useState(0);

	useEffect(() => {
		firebase
			.database()
			.ref(`/MINIAPP_app_holiday/games/670075/players/${Apis.getUserInfo().id}`)
			.on('value', snapshot => {
				const player: Player = snapshot.val();

				if (player) {
					setScore(player.reward.money);
					setHistoryData(Object.values(player.history));
					setLoading(false);
				}
			});
	}, []);

	return (
		<div className="wrap lichsu">
			<Animation />
			{loading && <LoadingView />}
			{!loading && (
				<>
					<ScoreHeader score={score} />
					<div className="danhsach-lichsu wrap_danhsach ">
						{history_data.map(history => (
							<HistoryItem
								score={history.reward.money}
								type={history.action}
								name={get(history, e => e.from.name, '')}
								avatar={get(history, e => e.from.avatar, '')}
							/>
						))}
					</div>
				</>
			)}

			<div id="warning-message">Vui Lòng Xoay Dọc Màn Hình :)</div>
		</div>
	);
};

export default GameHistory;
