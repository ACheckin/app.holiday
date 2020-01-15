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
	history?: { [key: string]: User }
}

export interface User {
	avatar: string;
	name: string;
	id?: string;
	staff_id?: string
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
	action: any;
	reward: HistoryReward;
	from: {
		avatar: string
		id: string
		name: string
	}
}

export interface HistoryReward {
	id: number;
	money: number;
	old_money?: number
}

export interface Reward {
	money: number;
	total: number;
}
