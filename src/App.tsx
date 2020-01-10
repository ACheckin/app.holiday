import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import GameStart from 'src/views/GameStart/screens/GameStart';
import GameCreate from 'src/views/GameCreate/screens/GameCreate';
import GamePlay from 'src/views/GamePlay/screens/GamePlay';
import GameHistory from 'src/views/GameHistory/screens/GameHistory';
import GameJoin from 'src/views/GameJoin/screens/GameJoin';

import './lixi.css';
import './lichsulixi.css';
import './animate.css';
import './owl2.css';

const routes = [
	{ path: '/', name: 'Game Play', Component: GameStart },
	{ path: '/create-game', name: 'Game Play', Component: GameCreate },
	{ path: '/join-game', name: 'Game Play', Component: GameJoin },
	{ path: '/game/:game_id', name: 'Game Play', Component: GamePlay },
	{ path: '/game/:game_id/history', name: 'Game Play', Component: GameHistory },
];

interface AppProps {
	game_id: string;
}

const App: React.FC<AppProps> = ({ game_id }) => {
	return (
		<Router>
			<Switch>
				{routes.map(({ path, Component }: any) => (
					<Route key={path} exact path={path}>
						{navigation => {
							return <Component navigation={navigation} game_id={game_id} />;
						}}
					</Route>
				))}
			</Switch>
		</Router>
	);
};

export default App;
