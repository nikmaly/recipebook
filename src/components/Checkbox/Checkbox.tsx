/* eslint-disable arrow-body-style */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { PureCheckbox } from '.';

type TCheckboxProps = {
	labelText: string;
	checkboxName: string;
	isChecked?: boolean;
	children: React.ReactNode;
}

const Checkbox: React.FunctionComponent<TCheckboxProps> = ({
	labelText,
	checkboxName,
	isChecked = false,
	children,
}) => {
	return (
		<PureCheckbox
			isChecked={isChecked}
			checkboxName={checkboxName}
			labelText={labelText}
		>
			{children}
		</PureCheckbox>
	);
};

export default Checkbox;
