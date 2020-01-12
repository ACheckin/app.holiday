import React, { useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import Apis from 'src/services/apis';

import { useDisableKeyboardScroll, useEventCallback, useStyleIphoneX } from 'src/helpers';
import { RouteComponentProps } from 'react-router-dom';
import LoadingView from 'src/components/LoadingView';

interface FormValues {
	game_code: string;
}

interface GameJoinProps {
	navigation: RouteComponentProps;
}

const init_values: FormValues = {
	game_code: '',
};

const validate_schema = yup.object().shape<FormValues>({
	game_code: yup.string().required('Bạn chưa nhập mã chia sẻ'),
});

const GameJoin: React.FC<GameJoinProps> = ({ navigation }) => {
	const formRef = useRef<Formik<FormValues>>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

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

				try {
					/**
					 * Join Game
					 */
					const join_game_response = await Apis.joinGame({
						game_id: values.game_code,
					});

					Apis.setGameAccessCode(join_game_response.game_access_code);
				} catch (e) {}

				const game_detail_response = await Apis.gameDetail({ game_id: values.game_code });
				navigation.history.push(`/game/${values.game_code}`, game_detail_response);
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
			<div className="bg fixed" />
			<div className="container">
				<div className="header">
					<a className="btnBack" onClick={onClickBackButton}>
						<img src={require('src/image/back.svg')} />
					</a>
				</div>
				{loading && <LoadingView />}
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
						>
							{props => {
								const { errors } = props;
								return (
									<Form className="viewForm">
										<div className="rowInput">
											<div className="viewInput">
												<Field
													className="viewInput_Item"
													type="number"
													name="game_code"
													placeholder="Mã trò chơi"
												/>
												{errors.game_code && (
													<div
														style={{
															color: '#fff',
															fontSize: 12,
															padding: '5px 0px',
														}}
													>
														Lỗi: {errors.game_code}
													</div>
												)}
											</div>
										</div>
									</Form>
								);
							}}
						</Formik>
					</div>
					<div className="btnSubmit">
						<button className="btnSubmit_Btn" onClick={onClickSubmitForm}>
							Tham gia trò chơi
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default GameJoin;
