import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import * as firebase from 'firebase';
import { HistoryValue, Player } from 'src/interfaces/db';
import LoadingView from 'src/components/LoadingView';
import { get, useStates, useStyleIphoneX } from 'src/helpers';
import Apis from 'src/services/apis';

import ScoreHeader from 'src/views/GameHistory/components/ScoreHeader';
import Animation from 'src/views/GameHistory/components/Animation';
import HistoryItem from 'src/views/GameHistory/components/HistoryItem';

interface GameHistoryProps {
	navigation: RouteComponentProps;
}

interface Params {
	game_id: string;
}

const GameHistory: React.FC<GameHistoryProps> = ({ navigation }) => {
	const params = useParams<Params>();

	const [loading, setLoading] = useState(true);
	const [history_data, setHistoryData] = useStates<HistoryValue[]>([]);
	const [score, setScore] = useState(0);

	useStyleIphoneX();

	useEffect(() => {
		if (params.game_id) {
			firebase
				.database()
				.ref(`/MINIAPP_app_holiday/games/${params.game_id}/players/${Apis.getUserInfo().id}`)
				.on('value', snapshot => {
					const player: Player = snapshot.val();

					if (player) {
						setScore(player.reward.money);
						setHistoryData(Object.values(player.history));
						setLoading(false);
					}
				});
		}
	}, []);

	return (
		<div className="container">
			<div className="header" style={{ zIndex: 9999 }}>
				<a
					className="btnBack"
					onClick={() => {
						navigation.history.goBack();
					}}
				>
					<img src={require('src/image/back.svg')} />
				</a>
			</div>
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
		</div>
	);
};

export default GameHistory;
