import querystring from 'querystring';
import url, { UrlObject } from 'url';
import { ACheckinSDK, UserWorkspaceInfo } from '@acheckin/react-app-sdk';
import {
	ArgsToChangeReward,
	ArgsToCreateGame,
	ArgsToJoinGame,
	ChangeRewardResponse,
	CreateGameResponse,
	GameDetailResponse,
	JoinGameResponse,
} from 'src/interfaces/apis';

class Apis {
	static END_POINT = 'asia-east2-acheckin-project.cloudfunctions.net';

	private access_token: string;
	private game_access_code: string;
	private user_info: UserWorkspaceInfo;
	private is_joined_game: boolean = false;
	private is_change_reward = false;
	private last_time_change_reward: number = 0;
	private start_from_qrcode = false;
	private last_game_id;

	public init = async () => {
		try {
			this.last_game_id = await ACheckinSDK.getItem('last_game_id');
		} catch (e) {}
	};

	public getLastGameId = () => {
		return this.last_game_id;
	};

	public isStartFromQrCode = () => {
		return this.start_from_qrcode;
	};

	public setStartFromQrCode = () => {
		this.start_from_qrcode = true;
	};

	public setLastTimeChangeReward = (time: number) => {
		this.last_time_change_reward = time;
	};

	public getLastTimeChangeReward = (): number => {
		return this.last_time_change_reward;
	};

	public setAccessToken = (access_token: string) => {
		this.access_token = access_token;
	};

	public setGameAccessCode = (game_access_code: string) => {
		this.game_access_code = game_access_code;
	};

	public getGameAccessCode = (): string => {
		return this.game_access_code;
	};

	public setUserInfo = user_info => {
		this.user_info = user_info;
	};

	public getUserInfo = () => {
		return this.user_info;
	};

	public setJoinedGame = (value: boolean) => {
		this.is_joined_game = value;
	};

	public isJoinedGame = () => {
		return this.is_joined_game;
	};

	public isChangeReward = () => {
		return this.is_change_reward;
	};

	public setChangeReward = (value: boolean) => {
		this.is_change_reward = value;
	};

	public createGame = (options: ArgsToCreateGame): Promise<CreateGameResponse> => {
		return this.call({
			path: '/MINIAPP_app_holiday_createGame',
			method: 'POST',
			body: options,
		});
	};

	public joinGame = async (options: ArgsToJoinGame): Promise<JoinGameResponse> => {
		const response = await this.call({
			path: '/MINIAPP_app_holiday_joinGame',
			method: 'POST',
			body: options,
		});

		await ACheckinSDK.setItem('last_game_id', response.game_id);
		this.last_game_id = response.game_id;

		return response;
	};

	public changeReward = (options: ArgsToChangeReward): Promise<ChangeRewardResponse> => {
		return this.call({
			path: '/MINIAPP_app_holiday_changeReward',
			method: 'POST',
			body: options,
		});
	};

	public gameDetail = (options: { game_id: string }): Promise<GameDetailResponse> => {
		return this.call({
			path: '/MINIAPP_app_holiday_gameDetails',
			method: 'GET',
			qs: options,
		});
	};

	private call = (options: { path: string; method?: 'POST' | 'GET'; qs?: any; body?: object }): Promise<any> => {
		return new Promise(async (resolve, reject) => {
			try {
				const url_object: UrlObject = {
					protocol: 'https',
					hostname: Apis.END_POINT,
					pathname: options.path,
				};

				if (options.qs) {
					url_object.search = querystring.stringify(options.qs);
				}

				const request_headers = {
					authorization: this.access_token,
				};

				const request_options: RequestInit = {
					method: options.method || 'GET',
				};

				if (options.body && typeof options.body === 'object') {
					request_options.body = JSON.stringify(options.body);
					request_headers['content-type'] = 'application/json';
				}

				request_options.headers = request_headers;

				const raw_response = await fetch(url.format(url_object), request_options);
				const json_response = await raw_response.json();

				if (json_response.status === false) {
					return reject(new Error(json_response.message));
				}

				return resolve(json_response);
			} catch (e) {
				return reject(e);
			}
		});
	};
}

export default new Apis();
