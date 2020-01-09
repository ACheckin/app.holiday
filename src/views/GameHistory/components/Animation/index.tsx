import React from 'react';

const Animation: React.FC = () => {
	return (
		<>
			<div className="bg fixed" />
			<div className="nen fixed">
				<img src={require('src/image/nen.png')} alt="" />
			</div>
			<div className="outer fixed">
				<img src={require('src/image/outer.png')} alt="" />
			</div>
			<div className="may1 fixed ">
				<img src={require('src/image/may1.png')} alt="" />
			</div>
			<div className="may2 fixed ">
				<img src={require('src/image/may2.png')} alt="" />
			</div>
		</>
	);
};

export default React.memo(Animation);
