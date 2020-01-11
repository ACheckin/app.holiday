import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Apis from 'src/services/apis';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';
import GameStartJoin from 'src/views/GamePlay/components/GameStart';
import FooterStart from 'src/views/GamePlay/components/FooterStart';
import { get, useEventCallback } from 'src/helpers';
import _ from 'lodash';

interface GameStartProps {
	navigation: RouteComponentProps;
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
];

const GameStart: React.FC<GameStartProps> = ({ navigation }) => {
	const [ready, setReady] = useState(false);

	const onCreateGameClick = useEventCallback(() => {
		navigation.history.push('/create-game');
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

	return (
		<div className="container">
			<div className="wrap pagelaclixi">
				<div className="bg fixed" />
				<Animation />
				<Content>
					<GameStartJoin ready={ready} />
					{ready && <FooterStart onPlayGameClick={onPlayGameClick} onCreateGameClick={onCreateGameClick} />}
				</Content>
			</div>
			<div className="footer fixed" style={{ zIndex: 9999 }}>
				<img src={require('src/image/footer.png')} alt="" />
			</div>
		</div>
	);
};

export default GameStart;
