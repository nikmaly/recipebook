/** @jsxImportSource @emotion/react */
import React from 'react';
import TextField from '@mui/material/TextField';

type TTagBuilderProps = {
	name: string;
	label: string;
	value: string;
	required?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TagBuilder: React.FunctionComponent<TTagBuilderProps> = ({
	name,
	label,
	value,
	required = false,
	onChange,
}) => (
	<TextField
		label={label}
		name={name}
		variant="outlined"
		onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e);
		}}
		value={value}
		required={required}
	/>
);

export default TagBuilder;
