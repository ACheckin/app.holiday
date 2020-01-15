import React from 'react';
import { formatMoney } from 'src/helpers';

interface HistoryItemProps {
	name: string;
	avatar: string;
	score: number;
	old_score: number;
	type: 'START' | 'TAKE' | 'BE_TAKEN';
}

const HistoryItem: React.FC<HistoryItemProps> = ({ name, avatar, score, old_score, type }) => {
	return (
		<div className="item">
			<div className="image-user">
				<img src={avatar} alt="" />
			</div>
			<div className="info-item">
				{type === 'BE_TAKEN' && (
					<>
						<b>{name}</b> đã giật mất <b>{formatMoney(old_score)}</b> của bạn
					</>
				)}
				{type === 'TAKE' && (
					<>
						{name === '' &&
						((
								<>
									Nỗ lực quay tay đã mang về cho bạn <b>{formatMoney(score)}</b>
								</>
							) ||
							'')}
						{name !== '' &&
						((
								<>
									Bạn đã giật của {name} <b>{formatMoney(score)}</b>
								</>
							) ||
							'')}
					</>
				)}
				{type === 'START' && (
					<>
						Bạn được tặng <b>{formatMoney(score)}</b> làm của hồi môn
					</>
				)}
			</div>
		</div>
	);
};

export default React.memo(HistoryItem);
