import React from 'react';

interface ScoreHeaderProps {
	score: number;
}

const ScoreHeader: React.FC<ScoreHeaderProps> = ({ score }) => {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	});

	return (
		<div className="ketqua">
			<img src={require('src/image/bg-ketqua.png')} />
			<div className="txt_ketqua">
				<p> Bạn nhận được Lì Xì </p>
				<div className={formatter.format(score).length < 12 ? "menhgia_lixi" : "menhgia_lixi2"}>{formatter.format(score)}</div>
			</div>
		</div>
	);
};

export default ScoreHeader;
