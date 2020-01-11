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

const email_list = ['hainv@appota.com'];

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
			// setReady(true);
		}
	}, []);

	return (
		<div className="wrap pagelaclixi">
			<div className="bg fixed" />
			<Animation />
			<Content>
				<GameStartJoin ready={ready} />
				{ready && <FooterStart onPlayGameClick={onPlayGameClick} onCreateGameClick={onCreateGameClick} />}
			</Content>
		</div>
	);
};

export default GameStart;
