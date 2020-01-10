import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import GameDashboard from 'src/views/GameDashboard/screens/GameDashboard';

import './lixi.css';
import './lichsulixi.css';
import './bxhlixi.css';

const routes = [{ path: '/', name: 'Game Dashboard', Component: GameDashboard }];

const Web: React.FC = () => {
	return (
		<Router>
			<Switch>
				{routes.map(({ path, Component }: any) => (
					<Route key={path} exact path={path}>
						{navigation => {
							return <Component navigation={navigation} />;
						}}
					</Route>
				))}
			</Switch>
		</Router>
	);
};

export default Web;
