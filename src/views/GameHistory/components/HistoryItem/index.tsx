import React from 'react';
import { formatMoney } from 'src/helpers';

interface HistoryItemProps {
	name: string;
	avatar: string;
	money: number;
	old_money: number;
	type: 'START' | 'TAKE' | 'BE_TAKEN';
}

const HistoryItem: React.FC<HistoryItemProps> = ({ name, avatar, money, old_money, type }) => {
	const renderItem = () => {
		if (type === 'BE_TAKEN') {
			if (money > old_money) {
				return (
					<>
						<b>{name}</b> đã tặng bạn <b>{formatMoney(old_money)}</b>
					</>
				);
			} else {
				return (
					<>
						<b>{name}</b> đã giật mất <b>{formatMoney(old_money)}</b> của bạn
					</>
				);
			}
		}

		if (type === 'TAKE') {
			if (name === '') {
				return (
					<>
						Nỗ lực quay tay đã mang về cho bạn <b>{formatMoney(money)}</b>
					</>
				);
			} else {
				return (
					<>
						Bạn đã giật của <b>{name}</b> <b>{formatMoney(money)}</b>
					</>
				);
			}
		}

		if (type === 'START') {
			return (
				<>
					Bạn được tặng <b>{formatMoney(money)}</b> làm của hồi môn
				</>
			);
		}
	};

	return (
		<div className="item">
			<div className="image-user">
				<img src={avatar} alt="" />
			</div>
			<div className="info-item">{renderItem()}</div>
		</div>
	);
};

export default React.memo(HistoryItem);
