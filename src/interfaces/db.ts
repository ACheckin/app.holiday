export interface Database {
	games: { [key: string]: Game };
}

export interface Game {
	end_time: number;
	game_rewards: GameReward[];
	name: string;
	players: { [key: string]: Player };
	rewards: Reward[];
	start_time: number;
	total_reward: number;
	workspace_id: string;
}

export interface GameReward {
	id: number;
	money: number;
	user?: User;
}

export interface User {
	avatar: string;
	name: string;
	id?: string;
}

export interface Player {
	access_code: string;
	avatar: string;
	expired: number;
	history: { [key: string]: HistoryValue };
	name: string;
	reward: HistoryReward;
	staff_id: string;
	start: number;
	total_reward: number;
}

export interface HistoryValue {
	action: string;
	reward: HistoryReward;
}

export interface HistoryReward {
	id: number;
	money: number;
}

export interface Reward {
	money: number;
	total: number;
}