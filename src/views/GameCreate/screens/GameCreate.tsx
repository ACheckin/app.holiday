import React, { useRef, useState } from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as yup from 'yup';

import { formatMoney, get, useDisableKeyboardScroll, useEventCallback, useStyleIphoneX } from 'src/helpers';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment-timezone';
import Apis from 'src/services/apis';
import LoadingView from 'src/components/LoadingView';

interface FormValues {
	name?: string;
	start_time?: string;
	end_time?: string;
	rewards?: {
		money: number;
		total: number;
	}[];
}

interface GameCreateProps {
	navigation: RouteComponentProps;
}

const init_values: FormValues = {
	name: '',
	start_time: moment().format('YYYY-MM-DDTHH:mm:s'),
	end_time: moment()
		.add(1, 'minute')
		.format('YYYY-MM-DDTHH:mm:s'),
	rewards: [],
};

const validate_schema = yup.object().shape<FormValues>({
	name: yup.string().required('Bạn chưa nhập tên trò chơi'),
	rewards: yup
		.array()
		.required('Bạn chưa nhập giải thưởng cho trò chơi')
		.of(
			yup.object().shape({
				total: yup
					.number()
					.integer('Tổng giải thưởng không phải là số')
					.required('Bạn chưa nhập số lượng giải thưởng'),
				money: yup
					.number()
					.integer('Số tiền không phải là số')
					.required('Bạn chưa nhập số tiền của giải thưởng'),
			}),
		)
		.min(1, 'Bạn chưa thêm giải thưởng cho trò chơi'),
	start_time: yup.string().required('Bạn chưa nhập thời gian bắt đầu'),
	end_time: yup.string().required('Bạn chưa nhập thời gian kết thúc'),
});

const GameCreate: React.FC<GameCreateProps> = ({ navigation }) => {
	const formRef = useRef<Formik<FormValues>>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [total_money, setTotalMoney] = useState(0);

	const [game_code, setGameCode] = useState('123456');

	useStyleIphoneX();
	useDisableKeyboardScroll();

	/**
	 * @event onClick
	 *
	 * Button Submit Form
	 */
	const onClickSubmitForm = useEventCallback(() => {
		formRef.current && formRef.current.submitForm();
	});

	/**
	 * @event onSubmit
	 *
	 * Submit Form
	 */
	const onSubmit = useEventCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			if (formRef.current) {
				const values = formRef.current.getFormikBag().values;

				const create_game_response = await Apis.createGame({
					rewards: values.rewards,
					start_time: moment(values.start_time).unix(),
					end_time: moment(values.end_time).unix(),
					name: values.name,
				});

				setGameCode(create_game_response.game_access_code);
			}
		} catch (e) {
			setError(e.message);
		}

		setLoading(false);
	});

	/**
	 * @event onClick
	 *
	 * Back Button
	 */
	const onClickBackButton = useEventCallback(() => {
		navigation.history.push('/');
	});

	return (
		<>
			<div className="container">
				<div className="header">
					<a className="btnBack" onClick={onClickBackButton}>
						<img src={require('./back.svg')} />
					</a>
				</div>
				{loading && <LoadingView />}
				{game_code && (
					<div>
						<div>Mã chia sẻ của bạn là</div>
						<div style={{ fontSize: 35, fontWeight: 700 }}>{game_code}</div>
						<button>Chia sẻ ngay</button>
					</div>
				)}
				{!game_code && (
					<>
						<div className="content">
							<div className="total-money">
								<div>Tổng giải thưởng</div>
								<div>{formatMoney(total_money)}</div>
							</div>
							{error && (
								<div
									style={{
										background: '#fff',
										color: 'red',
										marginTop: 5,
										borderRadius: 5,
										textAlign: 'center',
										padding: '5px',
										fontSize: 14,
									}}
								>
									{error}
								</div>
							)}
							<Formik<FormValues>
								ref={formRef}
								initialValues={init_values}
								onSubmit={onSubmit}
								validationSchema={validate_schema}
								validate={values => {
									let total_money = 0;
									for (let reward of values.rewards) {
										total_money += reward.money * reward.total;
									}

									setTotalMoney(total_money);
								}}
							>
								{props => {
									const { values, errors } = props;

									return (
										<Form className="viewForm">
											<div className="rowInput">
												<div className="viewInput">
													<Field
														className="viewInput_Item"
														type="text"
														name="name"
														placeholder="Tên trò chơi"
													/>
													{errors.name && (
														<div
															style={{
																color: '#fff',
																fontSize: 12,
																padding: '5px 0px',
															}}
														>
															Lỗi: {errors.name}
														</div>
													)}
												</div>
												<div className="viewInput">
													<Field
														className="viewInput_Item"
														type="datetime-local"
														name="start_time"
														placeholder="Thời gian bắt đầu"
													/>
													{errors.start_time && (
														<div
															style={{
																color: '#fff',
																fontSize: 12,
																padding: '5px 0px',
															}}
														>
															Lỗi: {errors.start_time}
														</div>
													)}
												</div>
												<div className="viewInput">
													<Field
														className="viewInput_Item"
														type="datetime-local"
														name="end_time"
														placeholder="Thời gian kết thúc"
													/>
													{errors.end_time && (
														<div
															style={{
																color: '#fff',
																fontSize: 12,
																padding: '5px 0px',
															}}
														>
															Lỗi: {errors.end_time}
														</div>
													)}
												</div>
											</div>

											<FieldArray validateOnChange={false} name="rewards">
												{arrayHelpers => {
													return (
														<div>
															{values.rewards && values.rewards.length > 0 ? (
																values.rewards.map((reward, index) => (
																	<div key={index} className="rowInput">
																		<Field
																			type="number"
																			placeholder="Số tiền"
																			className="viewInput_RowItem"
																			name={`rewards[${index}][money]`}
																		/>
																		<Field
																			type="number"
																			placeholder="Tổng số"
																			className="viewInput_RowItem"
																			name={`rewards[${index}][total]`}
																		/>
																		<div className="viewAdd">
																			<button
																				className="viewAdd_Btn"
																				type="button"
																				onClick={e => {
																					e.preventDefault();
																					arrayHelpers.remove(index);
																				}}
																			>
																				-
																			</button>
																			{index === 0 && (
																				<button
																					className="viewAdd_Btn"
																					type="button"
																					onClick={e => {
																						e.preventDefault();
																						arrayHelpers.insert(index, {
																							total: null,
																							money: null,
																						});
																					}}
																				>
																					+
																				</button>
																			)}
																		</div>
																		{get(errors, e => e.rewards[index].total) && (
																			<div
																				style={{
																					color: '#fff',
																					fontSize: 12,
																					padding: '5px 0px',
																				}}
																			>
																				Lỗi: {errors.rewards[index].total}
																			</div>
																		)}
																		{get(errors, e => e.rewards[index].money) && (
																			<div
																				style={{
																					color: '#fff',
																					fontSize: 12,
																					padding: '5px 0px',
																				}}
																			>
																				Lỗi: {errors.rewards[index].money}
																			</div>
																		)}
																	</div>
																))
															) : (
																<div>
																	<button
																		className="btnSubmit_Border"
																		type="button"
																		onClick={e => {
																			e.preventDefault();
																			arrayHelpers.push({
																				total: null,
																				money: null,
																			});
																		}}
																	>
																		Thêm giải thưởng
																	</button>
																	{get(errors, e => e.rewards) && (
																		<div
																			style={{
																				color: '#fff',
																				fontSize: 12,
																				padding: '5px 0px',
																			}}
																		>
																			Lỗi: {errors.rewards}
																		</div>
																	)}
																</div>
															)}
														</div>
													);
												}}
											</FieldArray>
										</Form>
									);
								}}
							</Formik>
						</div>
						<div className="btnSubmit">
							<button className="btnSubmit_Btn" onClick={onClickSubmitForm}>
								Tạo trò chơi
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default GameCreate;
