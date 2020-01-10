import React, { useEffect, useRef } from 'react';
import { FieldArray, Formik } from 'formik';
import $ from 'jquery';
import { useEventCallback } from 'src/helpers';
import { RouteComponentProps } from 'react-router-dom';
import { FormikActions } from 'formik/dist/types';
import Apis from 'src/services/apis';
import moment from 'moment-timezone';

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
	start_time: moment()
		.toDate()
		.toLocaleTimeString(),
	end_time: moment()
		.toDate()
		.toLocaleTimeString(),
	rewards: [],
};

const GameCreate: React.FC<GameCreateProps> = ({ navigation }) => {
	const formRef = useRef<Formik<FormValues>>(null);

	let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
	let aspect = window.screen.width / window.screen.height;
	if (iPhone && aspect.toFixed(3) === '0.462') {
		$('body').removeClass('bodyFull');
		$('body').addClass('bodyX');
		$('body').addClass('isIPX');
	} else {
		$('body').removeClass('bodyFull');
		$('body').removeClass('isIPX');
	}

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
	const onSubmit = useEventCallback<(values: FormValues, formikActions: FormikActions<FormValues>) => void>(
		async values => {
			try {
				const response_create_game = await Apis.createGame({
					name: values.name,
					end_time: moment(values.end_time).unix(),
					start_time: moment(values.start_time).unix(),
					rewards: values.rewards,
				});
			} catch (e) {}
		},
	);

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
			<div className="header">
				<a className="btnBack" onClick={onClickBackButton}>
					<img src={require('./back.svg')} />
				</a>
			</div>
			<div className="container">
				<div className="content">
					<Formik<FormValues> ref={formRef} initialValues={init_values} onSubmit={onSubmit}>
						{props => {
							const { values, handleChange, handleSubmit } = props;

							return (
								<form className="viewForm" onSubmit={handleSubmit}>
									<div className="rowInput">
										<div className="viewInput">
											<input
												className="viewInput_Item"
												type="text"
												name="name"
												value={values.name}
												onChange={e => {
													alert(e.target.value);
												}}
												placeholder="Tên trò chơi"
											/>
										</div>
										<div className="viewInput">
											<input
												className="viewInput_Item"
												type="datetime-local"
												name="start_time"
												value={values.start_time}
												onChange={handleChange}
												placeholder="Thời gian bắt đầu"
											/>
										</div>
										<div className="viewInput">
											<input
												className="viewInput_Item"
												type="datetime-local"
												name="end_time"
												value={values.end_time}
												onChange={handleChange}
												placeholder="Thời gian kết thúc"
											/>
										</div>
									</div>

									<FieldArray name="rewards">
										{arrayHelpers => {
											return (
												<div>
													{values.rewards && values.rewards.length > 0 ? (
														values.rewards.map((reward, index) => (
															<div key={index} className="rowInput">
																<input
																	type="number"
																	placeholder="Số tiền"
																	className="viewInput_RowItem"
																	value={values.rewards[index].money}
																	onChange={handleChange}
																	name={`rewards[${index}][money]`}
																/>
																<input
																	type="number"
																	placeholder="Tổng số"
																	className="viewInput_RowItem"
																	value={values.rewards[index].total}
																	onChange={handleChange}
																	name={`rewards[${index}][total]`}
																/>
																<div className="viewAdd">
																	<button
																		className="viewAdd_Btn"
																		type="button"
																		onClick={() => arrayHelpers.remove(index)}
																	>
																		-
																	</button>
																	{index === 0 && (
																		<button
																			className="viewAdd_Btn"
																			type="button"
																			onClick={() =>
																				arrayHelpers.insert(index, {
																					money: null,
																					total: null,
																				})
																			}
																		>
																			+
																		</button>
																	)}
																</div>
															</div>
														))
													) : (
														<div>
															<button
																className="btnSubmit_Border"
																type="button"
																onClick={() =>
																	arrayHelpers.push({
																		money: null,
																		total: null,
																	})
																}
															>
																Thêm giải thưởng
															</button>
														</div>
													)}
												</div>
											);
										}}
									</FieldArray>
								</form>
							);
						}}
					</Formik>
				</div>
				<div className="btnSubmit">
					<button className="btnSubmit_Btn" onClick={onClickSubmitForm}>
						Tạo trò chơi
					</button>
				</div>
			</div>
		</>
	);
};

export default GameCreate;
