import React from 'react';

class NumberField extends React.Component<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	any> {
	constructor(props) {
		super(props);
		this.state = { isEditing: false };
	}

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

		return <input {...otherProps} value={value} type="number" pattern="\d*" onChange={this.onChange} />;
	}
}

export default NumberField;
