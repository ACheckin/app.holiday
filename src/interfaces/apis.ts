export interface ArgsToCreateGame {
	name: string
	rewards: {
		money: number
		total: number
	}[]
	custom: string;
	start_time: number
	end_time: number
}

export interface CreateGameResponse {
	status: boolean
	game_id: string
	game_access_code: string
	reward: {
		id: number
		money: number
	}
}

export interface ArgsToJoinGame {
	game_id: string
}

export interface JoinGameResponse {
	status: boolean
	game_id: string
	game_access_code: string
	reward: {
		id: number
		money: number
	}
}

export interface ArgsToChangeReward {
	game_id: string
	game_access_code: string
}

export interface ChangeRewardResponse {
	status: boolean
	game_id: string
	game_access_code: string
	reward: {
		id: number
		money: number
	}
}

export interface GameDetailResponse {
	status: boolean
	game: {
		name: string
		rewards: {
			money: number
			total: number
		}[]
		start_time: number
		end_time: number
		game_id: string
	}
}


