import React from 'react';

class MoneyField extends React.Component<
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	any
> {
	constructor(props) {
		super(props);
		this.state = { isEditing: false };
	}

	toCurrency = number => {
		const formatter = new Intl.NumberFormat('vi-VN', {
			style: 'decimal',
			currency: 'VND',
		});

		return formatter.format(number);
	};

	toggleEditing = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	onChange = e => {
		if (e.target.value === '') {
			e.target.value = 0;
		} else {
			e.target.value = Number(e.target.value);
		}

		this.props.onChange(e);
	};

	render() {
		const { onChange, onBlur, value, type, ...otherProps } = this.props;

		return (
			<>
				{this.state.isEditing && (
					<input
						{...otherProps}
						value={value}
						type="number"
						pattern="\d*"
						onChange={this.onChange}
						onBlur={this.toggleEditing}
						autoFocus
					/>
				)}
				{!this.state.isEditing && (
					<input {...otherProps} type="text" value={this.toCurrency(value)} onFocus={this.toggleEditing} />
				)}
			</>
		);
	}
}

export default MoneyField;
