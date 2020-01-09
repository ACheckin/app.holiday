import React from 'react';

const Content: React.FC = ({ children }) => {
	return (
		<div className="lixi_wrap">
			<div className="animated infinite brightness slow easily nen fixed">
				<img src={require('src/image/nen.png')} alt="" />
			</div>
			<div className="outer fixed">
				<img src={require('src/image/outer.png')} alt="" />
			</div>
			<div className="may1 fixed ">
				<img
					className="animated infinite pulse slow easily delay-1s"
					src={require('src/image/may1.png')}
					alt=""
				/>
			</div>
			<div className="may2 fixed ">
				<img
					className="animated infinite pulse slow easily delay-2s"
					src={require('src/image/may2.png')}
					alt=""
				/>
			</div>
			{children}
			<div className="footer fixed animated infinite slower easily delay-2s">
				<img src={require('src/image/footer.png')} />
			</div>
		</div>
	);
};

export default Content;
