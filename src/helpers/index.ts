import { useCallback, useReducer, useRef } from 'react';

export function formatMoney(money: number): string {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});

	return formatter.format(money);
}

/**
 * Custom Hook Event Callback
 * @param fn
 */
export function useEventCallback<T = any>(fn: (e?: T) => void): (e?: T) => any {
	const ref = useRef<(e?: T) => void>();

	ref.current = fn;

	return useCallback(
		e => {
			return typeof ref.current === 'function' && ref.current(e);
		},
		[ref],
	);
}

/**
 * Use Multi State
 * @param init_state
 */
export function useStates<T>(init_state: T): [T, (state?: T) => void] {
	const state = useRef<T>(init_state);
	const [_, forceUpdate] = useReducer<any>(x => x + 1, 0);

	const setState = new_state => {
		state.current = new_state;

		// @ts-ignore
		forceUpdate();
	};

	return [state.current, setState];
}

export type RequiredRecursively<T> = Exclude<
	T extends string | number | boolean
		? T
		: {
			[P in keyof T]-?: T[P] extends (infer U)[]
			? RequiredRecursively<U>[]
			: T[P] extends Array<infer U>
				? RequiredRecursively<U>[]
				: RequiredRecursively<T[P]>;
		},
	null | undefined
	>;

export type AccessorFunction<T, R> = (object: RequiredRecursively<T>) => R;

export function get<T, R>(object: T, accessorFn: AccessorFunction<T, R>): R | undefined;
export function get<T, R>(object: T, accessorFn: AccessorFunction<T, R>, defaultValue: R, executeFn?: boolean): R;
export function get<T, R>(
	object: T,
	accessorFn: AccessorFunction<T, R>,
	defaultValue?: R,
	executeFn: boolean = true,
): R | undefined {
	try {
		const result = executeFn === true ? accessorFn((object as unknown) as RequiredRecursively<T>) : defaultValue;
		return result === undefined || result === null ? defaultValue : result;
	} catch (e) {
		return defaultValue;
	}
}
