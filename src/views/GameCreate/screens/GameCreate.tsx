import React, { useEffect, useRef, useState } from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import CopyToClipboard from 'react-copy-to-clipboard';

import { formatMoney, get, useDisableKeyboardScroll, useEventCallback, useStyleIphoneX } from 'src/helpers';
import { RouteComponentProps } from 'react-router-dom';
import moment from 'moment-timezone';
import Apis from 'src/services/apis';
import LoadingView from 'src/components/LoadingView';
import NumberField from 'src/components/NumberField';
import MoneyField from 'src/components/MoneyField';
import DatetimeField from 'src/components/DateTimeField';

interface FormValues {
	name?: string;
	start_time?: string;
	end_time?: string;
	custom?: string;
	rewards?: {
		money: number;
		total: number;
	}[];
}

interface GameCreateProps {
	navigation: RouteComponentProps;
}

const validate_schema = yup.object().shape<FormValues>({
	name: yup
		.string()
		.required('Bạn chưa nhập tên trò chơi')
		.max(50, 'Độ dài của tên trò chơi tối đa 30 ký tự'),
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
	custom: yup
		.string()
		.required('Bạn chưa nhập lời cảm ơn')
		.max(300, 'Độ dài lời chúc tối đa 300 ký tự'),
	end_time: yup.string().required('Bạn chưa nhập thời gian kết thúc'),
});

const rewards_default = [
	{
		money: 500000,
		total: 2,
	},
	{
		money: 100000,
		total: 2,
	},
	{
		money: 50000,
		total: 3,
	},
];

const rewards_28 = [
	{
		money: 500000,
		total: 418,
	},
	{
		money: 1000000,
		total: 10,
	},
	{
		money: 2000000,
		total: 5,
	},
	{
		money: 5000000,
		total: 2,
	},
];

const rewards_30 = [
	{
		money: 100000,
		total: 403,
	},
	{
		money: 500000,
		total: 20,
	},
	{
		money: 1000000,
		total: 10,
	},
	{
		money: 2000000,
		total: 2,
	},
];

const GameCreate: React.FC<GameCreateProps> = ({ navigation }) => {
	const getReward = () => {
		const current_date = Number(moment().format('YYYYMMDD'));

		if (Apis.getUserInfo().email === 'ceo@appota.com') {
			if (current_date < 20200123) {
				return rewards_28;
			} else {
				return rewards_30;
			}
		}

		return rewards_default;
	};

	const getTotalMoney = () => {
		const rewards = getReward();
		let money = 0;

		for (let reward of rewards) {
			money += reward.total * reward.money;
		}

		return money;
	};

	const getTotal = () => {
		const rewards = getReward();
		let total = 0;

		for (let reward of rewards) {
			total += reward.total;
		}

		return total;
	};

	const init_values: FormValues = {
		name: '',
		custom:
			'Bằng tất cả sự chân thành của mình, tôi xin cảm ơn những đóng góp của tất cả các thành viên trong Công ty trong suốt một năm qua. Chúc anh/chị/em một năm mới an khang,thịnh vượng.',
		start_time: moment().add(5, 'minute').format('YYYY-MM-DDTHH:mm:ss'), // prettier-ignore
		end_time: moment().add(6, 'minute').format('YYYY-MM-DDTHH:mm:ss'), // prettier-ignore
		rewards: getReward(),
	};

	const formRef = useRef<Formik<FormValues>>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [total_money, setTotalMoney] = useState(getTotalMoney());
	const [total, setTotal] = useState(getTotal());

	const [change, setChange] = useState(null);

	const [game_code, setGameCode] = useState(null);

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
					custom: values.custom,
				});

				setGameCode(create_game_response.game_id);
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

	useEffect(() => {
		if (formRef.current) {
			let total_money = 0;
			let total = 0;
			for (let reward of formRef.current.getFormikBag().values.rewards) {
				total_money += reward.money * reward.total;
				total += reward.total;
			}

			setTotalMoney(total_money || 0);
			setTotal(total);
		}
	}, [change]);

	return (
		<>
			<div className="bg fixed" />
			<div className="container">
				<div className="header">
					<a className="btnBack" onClick={onClickBackButton}>
						<img src={require('./back.svg')} />
					</a>
				</div>
				{loading && <LoadingView />}
				{game_code && (
					<div className="wrap pagelaclixi">
						<div className="animated easily bounceIn lixi">
							<img className="animated easily" src={require('src/image/baolixxi.png')} />
							<div className="animated easily bounceIn btn_lac">
								<img className="" src={require('src/image/btn-lac.png')} alt="" />
							</div>
							<div className="light-top">
								<img src={require('src/image/light-top.png')} />
							</div>
							<div className="light-bot">
								<img src={require('src/image/light-bot2.png')} />
							</div>
							<div className="codeGame">
								<div className="codeGame_Title">Mã trò chơi của bạn</div>
								<div className="codeGame_Code">{game_code}</div>
								{/* <button className="codeGame_Button">Chia sẻ ngay</button> */}
								{/* <a className="codeGame_Share" href="javascript:void();">
									<img src={require('src/image/btn_share.png')} alt="" />
								</a> */}
							</div>
						</div>
						<div className="action">
							<div className="action_help">
								Nhấn vào 'Copy' để lấy đường dẫn bảng xếp hạng, chỉ nên mở trên màn hình lớn.
							</div>
							<div className="action2col">
								<CopyToClipboard
									text={`https://e.acheckin.vn/${game_code}`}
									onCopy={() => {
										alert(`Bạn đã copy https://e.acheckin.vn/${game_code}`);
									}}
								>
									<div className="animated easily slideInLeft btn_footer">
										<a href="javascript:void();">
											<img src={require('src/image/btn_copy.png')} alt="" />
										</a>
									</div>
								</CopyToClipboard>

								<div className="animated easily slideInRight btn_footer">
									<a
										href="javascript:void();"
										onClick={async () => {
											setLoading(true);

											try {
												/**
												 * Join Game
												 */
												const join_game_response = await Apis.joinGame({
													game_id: game_code,
												});

												Apis.setGameAccessCode(join_game_response.game_access_code);
											} catch (e) {}

											try {
												const game_detail_response = await Apis.gameDetail({
													game_id: game_code,
												});
												navigation.history.push(`/game/${game_code}`, game_detail_response);
											} catch (e) {
												alert(e.message);
											}

											setLoading(false);
										}}
									>
										<img src={require('src/image/btn_play.png')} alt="" />
									</a>
								</div>
							</div>
						</div>
					</div>
				)}
				{!game_code && (
					<>
						<div className="content">
							<div className="content-form">
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
									validateOnBlur={false}
									validateOnChange={false}
									isInitialValid
								>
									{props => {
										const { values, errors, handleChange } = props;

										return (
											<Form className="viewForm">
												<div className="rowInput">
													<div className="viewInput">
														<Field
															className="viewInput_Item"
															type="text"
															name="name"
															placeholder="Tên trò chơi"
															autoFocus
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
														<DatetimeField
															className="viewInput_Item"
															name="start_time"
															value={values.start_time}
															onChange={handleChange}
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
														<DatetimeField
															className="viewInput_Item"
															name="end_time"
															value={values.end_time}
															onChange={handleChange}
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
													<div className="viewInput">
														<div className="viewInput_Item">
															<textarea
																className="viewInput_Item_Area"
																name="custom"
																placeholder="Lời cảm ơn"
																value={values.custom}
																onChange={handleChange}
															/>
														</div>
														{errors.custom && (
															<div
																style={{
																	color: '#fff',
																	fontSize: 12,
																	padding: '5px 0px',
																}}
															>
																Lỗi: {errors.custom}
															</div>
														)}
													</div>
												</div>
												<div className="total-money">
													<div className="title">Tổng giải thưởng</div>
													<div className="money">{formatMoney(total_money)}</div>
													<div className="total">{total} giải thưởng</div>
												</div>
												<FieldArray validateOnChange={false} name="rewards">
													{arrayHelpers => {
														return (
															<div>
																<div className="headerInput">
																	<div className="headerInput_Item">Số tiền</div>
																	<div className="headerInput_Item">Số lượng</div>
																	<div
																		className="headerInput_Item"
																		style={{ textAlign: 'center' }}
																	>
																		Xóa/Thêm
																	</div>
																</div>
																{values.rewards && values.rewards.length > 0 ? (
																	values.rewards.map((reward, index) => (
																		<div key={index} className="rowInput">
																			<MoneyField
																				className="viewInput_RowItem"
																				onChange={e => {
																					setChange(e);

																					return handleChange(e);
																				}}
																				value={reward.money}
																				name={`rewards[${index}][money]`}
																			/>
																			<NumberField
																				className="viewInput_RowItem"
																				onChange={e => {
																					setChange(e);

																					return handleChange(e);
																				}}
																				value={reward.total}
																				name={`rewards[${index}][total]`}
																				pattern="\d*"
																				// pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
																			/>
																			<div className="viewAdd">
																				<button
																					className="viewAdd_Btn"
																					type="button"
																					onClick={e => {
																						e.preventDefault();
																						arrayHelpers.remove(index);
																						setChange(index);
																					}}
																				>
																					-
																				</button>
																				{index === 0 && (
																					<button
																						className="viewAdd_Btn"
																						type="button"
																						style={{ marginLeft: 5 }}
																						onClick={e => {
																							e.preventDefault();
																							arrayHelpers.insert(index, {
																								total: 0,
																								money: 0,
																							});
																						}}
																					>
																						+
																					</button>
																				)}
																			</div>
																			{!_.isEmpty(
																				get(
																					errors,
																					e => e.rewards[index].total,
																				),
																			) && (
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
																			{!_.isEmpty(
																				get(
																					errors,
																					e => e.rewards[index].money,
																				),
																			) && (
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
																					money: 0,
																					total: 0,
																				});
																			}}
																		>
																			Thêm giải thưởng
																		</button>
																		{get(errors, e => e.rewards.length > 0) && (
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
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default GameCreate;
