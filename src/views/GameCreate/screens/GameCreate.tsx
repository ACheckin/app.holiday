import React, { useRef } from 'react';
import { Field, FieldArray, Form, Formik } from 'formik';
import $ from 'jquery';
interface FormValues {
	name?: string;
	start_time?: number;
	end_time?: number;
	rewards?: {
		money: number;
		total: number;
	}[];
}

const GameCreate: React.FC = () => {
	const formRef = useRef<Formik<FormValues>>(null);

	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	// Get the device pixel ratio
	var ratio = window.devicePixelRatio || 1;

	// Define the users device screen dimensions
	var screen = {
		width: window.screen.width * ratio,
		height: window.screen.height * ratio,
	};

	// iPhone X Detection
	if (iOS && (screen.width == 2436 || screen.height === 2436 || screen.width == 1242 || screen.height === 2688)) {
		$('body').removeClass('bodyFull');
		$('body').addClass('bodyX');
		$('body').addClass('isIPX');
	} else {
		$('body').removeClass('bodyFull');
		$('body').removeClass('isIPX');
	}
	
	return (
		<div className="container">
			<div className="header">
				<a
					className="btnBack"
					// onClick={}
				>
					<img src={require('./back.svg')} />
				</a>
			</div>
			<div className="content">
				<Formik<FormValues>
					ref={formRef}
					initialValues={{}}
					onSubmit={(values, formikHelpers) => {
						console.log(values);
					}}
				>
					{props => {
						const { handleSubmit, values, errors, touched, handleChange } = props;

						return (
							<Form className="viewForm">
								<div className="rowInput">
									<div className="viewInput">
										<Field className="viewInput_Item" type="name" name="email" placeholder="Tên trò chơi" />
									</div>
									<div className="viewInput">
										<input
											className="viewInput_Item"
											type="datetime-local"
											name="start_time"
											value={values.start_time}
											onChange={handleChange('start_time')}
											placeholder="Thời gian bắt đầu"
										/>
									</div>
									<div className="viewInput">
										<input
											className="viewInput_Item"
											type="datetime-local"
											name="end_time"
											value={values.end_time}
											onChange={handleChange('end_time')}
											placeholder="Thời gian kết thúc"
										/>
									</div>
								</div>
								
								<FieldArray name="rewards" >
									{arrayHelpers => {
										return (
											<div >
												{values.rewards && values.rewards.length > 0 ? (
													values.rewards.map((reward, index) => (
														<div key={index} className="rowInput">
															<Field className="viewInput_RowItem" name={`rewards[${index}][money]`} />
															<Field className="viewInput_RowItem" name={`rewards[${index}][total]`} />
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
																				money: 0,
																				total: 0,
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
													<div >
														<button
															className="btnSubmit_Btn"
															type="button"
															onClick={() => arrayHelpers.push({ money: 0, total: 0 })}
														>
															Thêm giải thưởng
														</button>
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
				<button
					className="btnSubmit_Btn"
					onClick={() => {
						formRef.current && formRef.current.submitForm();
					}}
				>
					Tạo trò chơi
				</button>
			</div>
		</div>
	);
};

export default GameCreate;
