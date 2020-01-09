import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import OwlCarousel from 'react-owl-carousel2';

import './lixi.css';
import './lichsulixi.css';
import './bxhlixi.css';

class App extends Component {
	render() {
		return (
			<div className="bxh bxhlixi">
				<div className="hoamai fixed ">
					<img className="shake" src={require('./image/hoamai.png')} />
				</div>
				<div className="hoadao fixed">
					<img className="shake" src={require('./image/hoadao.png')} />
				</div>
				<div className="snowflakes">
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoamai1.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoamai1.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoamai1.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoamai1.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoamai1.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoadao3.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoadao1.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoadao2.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoadao3.png')} />
						</div>
					</div>
					<div className="snowflake">
						<div>
							{' '}
							<img src={require('./image/hoamai1.png')} />
						</div>
					</div>
				</div>

				<div className="innerBxh">
					 <div className="qrCode">
                    <img  src={require('./image/qr_code.png')}  width="320" />
                </div>

				{/*	<div className="block-1">
						<div className="imageShelf">
							<img src={require('./image/shelf.png')} />
						</div>
						<div className="user userLeft">
							<div className="imageUser">
								<img src={require('./image/Oval.png')} width="94" />
							</div>
							<div className="infoUser">
								<div className="nameUser">Trần Mạnh Dũng</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUser">1.000.000đ</div>
						</div>
						<div className="user userMid">
							<div className="imageUser">
								<img src={require('./image/Oval.png')} width="128" />
							</div>
							<div className="infoUser">
								<div className="nameUser">Trần Mạnh Dũng</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUser">3.000.000đ</div>
						</div>

						<div className="user userRight">
							<div className="imageUser">
								<img src={require('./image/Oval.png')} width="94" />
							</div>
							<div className="infoUser">
								<div className="nameUser">Trần Mạnh Dũng Trần</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>

							<div className="valueUser">500.000đ</div>
						</div>
					</div>
					 end block1

					<div className="block-2">
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">400.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">300.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">200.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">100.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">400.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">300.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">200.000đ</div>
						</div>
						<div className="item">
							<div className="image-user">
								<img src={require('./image/imguser.png')} width="60" />
							</div>
							<div className="info-item">
								<div className="nameUser-item">Hoàng Hải Phong</div>
								<div className="robListUsers">
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="robUser">
										<img src={require('./image/Oval.png')} width="22" />
									</div>
									<div className="more">+ 12 người khác</div>
								</div>
							</div>
							<div className="valueUserItem">100.000đ</div>
						</div>
						 end Item
					</div>*/}
				</div>
			</div>
		);
	}
}

export default App;
