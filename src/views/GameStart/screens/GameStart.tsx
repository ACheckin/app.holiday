import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Apis from 'src/services/apis';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';
import GameStartJoin from 'src/views/GamePlay/components/GameStart';
import FooterStart from 'src/views/GamePlay/components/FooterStart';
import { get, useEventCallback } from 'src/helpers';
import _ from 'lodash';
import LoadingView from 'src/components/LoadingView';

interface GameStartProps {
	navigation: RouteComponentProps;
	game_id: string;
}

const email_list = [
	'hainv@appota.com',
	'khanhdd@appota.com',
	'huongbtl@appota.com',
	'runaway518@gmail.com',
	'ceo@appota.com',
	'viet751993@gmail.com',
	'huett@appota.com',
	'nhity@appota.com',
	'linhlb@appota.com',
	'xuanda@appota.com',
	'namnt@appota.com',
	'ngocnm@appota.com',
	'huutq@appota.com',
];

const GameStart: React.FC<GameStartProps> = ({ navigation, game_id }) => {
	const [ready, setReady] = useState(false);
	const [loading, setLoading] = useState(false);

	const onCreateGameClick = useEventCallback(() => {
		navigation.history.push('/create-game');
	});

	const onLastGameClick = useEventCallback(async () => {
		setLoading(true);
		try {
			try {
				/**
				 * Join Game
				 */
				const join_game_response = await Apis.joinGame({
					game_id: Apis.getLastGameId(),
				});

				Apis.setGameAccessCode(join_game_response.game_access_code);
			} catch (e) {}

			const game_detail_response = await Apis.gameDetail({ game_id: Apis.getLastGameId() });
			navigation.history.push(`/game/${Apis.getLastGameId()}`, game_detail_response);
		} catch (e) {
			alert(e.message);
		}

		setLoading(false);
	});

	const onPlayGameClick = useEventCallback(() => {
		navigation.history.push('/join-game');
	});

	useEffect(() => {
		const email = get(Apis.getUserInfo(), e => e.email);

		if (_.includes(email_list, email)) {
			setReady(true);
		}
	}, []);

	useEffect(() => {
		if (game_id) {
			startFromQrCode().catch(() => {});
		}
	}, []);

	const startFromQrCode = useEventCallback(async () => {
		if (!Apis.isStartFromQrCode()) {
			try {
				Apis.setStartFromQrCode();
				setLoading(true);

				try {
					/**
					 * Join Game
					 */
					const join_game_response = await Apis.joinGame({
						game_id: game_id,
					});

					Apis.setGameAccessCode(join_game_response.game_access_code);
				} catch (e) {}

				const game_detail_response = await Apis.gameDetail({ game_id: game_id });
				navigation.history.push(`/game/${game_id}`, game_detail_response);
			} catch (e) {
				alert(e.message);
			}
		}
	});

	return (
		<div className="container">
			{loading && <LoadingView />}
			<div className="wrap pagelaclixi">
				<div className="bg fixed" />
				<Animation />
				<Content>
					<GameStartJoin ready={ready} />
					{ready && (
						<FooterStart
							onLastGameClick={onLastGameClick}
							last_game_id={Apis.getLastGameId()}
							onPlayGameClick={onPlayGameClick}
							onCreateGameClick={onCreateGameClick}
						/>
					)}
				</Content>
			</div>
			<div className="footer fixed" style={{ zIndex: 9999 }}>
				<img src={require('src/image/footer.png')} alt="" />
			</div>
		</div>
	);
};

export default GameStart;
