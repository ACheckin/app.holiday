import React from 'react';
import moment from 'moment-timezone';

class DatetimeField extends React.Component<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	any> {
	constructor(props) {
		super(props);
		this.state = { isEditing: false };
	}

	toFormatTime = time => {

		console.log(time);

		if (!time) return undefined;

		return moment(time).format('DD/MM/YYYY HH:mm');
	};

	toggleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	onChange = e => {
		typeof this.props.onChange === 'function' && this.props.onChange(e);
	};

	render() {
		const { onChange, onBlur, value, type, ...otherProps } = this.props;

		return (
			<div style={{ position: 'relative', width: 'auto', height: 'auto' }}>
				{this.state.isEditing && (
					<input
						{...otherProps}
						value={value}
						type="datetime-local"
						onChange={this.onChange}
						onBlur={this.toggleEditing}
						autoFocus
					/>
				)}
				{!this.state.isEditing && (
					<input
						{...otherProps}
						type="text"
						value={this.toFormatTime(value)}
						readOnly
						onFocus={this.toggleEditing}
					/>
				)}
			</div>
		);
	}
}

export default DatetimeField;
