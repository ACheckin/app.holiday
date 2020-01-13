import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web from './Web';
import { ACheckinSDK } from '@acheckin/react-app-sdk';
import Apis from 'src/services/apis';
import * as firebase from 'firebase';

declare interface CustomWindow extends Window {
	asyncACheckinInit(init_data: string): any;
}

declare var window: CustomWindow & typeof globalThis;

firebase.initializeApp({
	databaseURL: 'https://acheckin-project.firebaseio.com',
});

window.asyncACheckinInit = async (game_id: string) => {
	/**
	 * Init Acheckin SDK
	 */
	ACheckinSDK.init();

	try {
		/**
		 * Get Access Token From Main App
		 */
		const access_token = await ACheckinSDK.getAccessToken();

		Apis.setAccessToken(access_token);

		/**
		 * Get User Info
		 */
		const user_info = await ACheckinSDK.getUserWorkspaceInfo(['id', 'name', 'picture', 'email']);

		Apis.setUserInfo(user_info);

		/**
		 * Render
		 */
		ReactDOM.render(<App game_id={game_id} />, document.getElementById('root'));
	} catch (e) {
		alert(e.message);
	}
};

// ReactDOM.render(<Web />, document.getElementById('root'));
