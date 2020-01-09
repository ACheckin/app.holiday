import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Animation from 'src/views/GamePlay/components/Animation';
import Content from 'src/views/GamePlay/components/Content';

interface GameStartProps {
	navigation: RouteComponentProps;
}

const GameStart: React.FC<GameStartProps> = ({ navigation }) => {
	const onClickCreateGame = () => {
		navigation.history.push('/create-game');
	};

	return (
		<div className="wrap pagelaclixi">
			<div className="bg fixed" />
			<Animation />
			<Content>
				<div style={{ position: 'absolute', width: '100%', bottom: 80, zIndex: 9990 }}>
					<div style={{ padding: '0px 20px 0px 20px' }}>
						<button
							onClick={onClickCreateGame}
							style={{
								background: 'transparent',
								width: '100%',
								padding: '10px 20px 10px 20px',
								borderRadius: 8,
								border: 'solid 2px #F1C24D',
								color: '#F1C24D',
								fontWeight: 700,
								fontSize: 16,
							}}
						>
							Tạo Game
						</button>
					</div>
				</div>
			</Content>
		</div>
	);
};

export default GameStart;
