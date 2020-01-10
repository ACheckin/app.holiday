import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';
import GameStartJoin from 'src/views/GamePlay/components/GameStart';
import FooterStart from 'src/views/GamePlay/components/FooterStart';

interface GameStartProps {
	navigation: RouteComponentProps;
}

const GameStart: React.FC<GameStartProps> = ({ navigation }) => {
	const onCreateGameClick = () => {
		navigation.history.push('/create-game');
	};

	const onPlayGameClick = () => {
	};

	return (
		<div className="wrap pagelaclixi">
			<div className="bg fixed" />
			<Animation />
			<Content>
				<GameStartJoin />
				<FooterStart onPlayGameClick={onPlayGameClick} onCreateGameClick={onCreateGameClick} />
			</Content>
		</div>
	);
};

export default GameStart;
