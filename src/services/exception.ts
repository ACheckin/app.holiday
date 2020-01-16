class Exception extends Error {
	private readonly _code: number;

	static ERROR_REQUEST_REJECT = -1;
	static ERROR_GAME_OVER_OR_NOT_START = -2;
	static ERROR_REQUEST_INVALID = -3;
	static ERROR_CAN_NOT_JOIN_GAME = -4;

	constructor(message: string, code: number = 0) {
		super(message);
		this._code = code;
	}

	public get code() {
		return this._code;
	}
}

export default Exception;
