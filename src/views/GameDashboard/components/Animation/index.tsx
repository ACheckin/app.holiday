import React from 'react';

const Animation: React.FC = () => {
	return (
		<>
			<div className="hoamai fixed ">
				<img className="shake" src={require('src/image/hoamai.png')} />
			</div>
			<div className="hoadao fixed">
				<img className="shake" src={require('src/image/hoadao.png')} />
			</div>
			<div className="snowflakes">
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoamai1.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoamai1.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoamai1.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoamai1.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoamai1.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoadao3.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoadao1.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoadao2.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoadao3.png')} />
					</div>
				</div>
				<div className="snowflake">
					<div>
						<img src={require('src/image/hoamai1.png')} />
					</div>
				</div>
			</div>
		</>
	);
};

export default React.memo(Animation);
