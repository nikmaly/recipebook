/** @jsxImportSource @emotion/react */
import React from 'react';

type TSelectProps = {
	name: string;
	options: string[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select: React.FunctionComponent<TSelectProps> = ({
	name,
	options,
	value,
	onChange,
}) => (
	<select
		name={name}
		value={value}
		onChange={onChange}
	>
		{options.map((option: string) => <option value={option}>{option.toUpperCase()}</option>)}
	</select>
);

export default Select;
