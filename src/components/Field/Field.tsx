/* eslint-disable arrow-body-style */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { PureField } from '.';

type TFieldProps = {
	labelText: string;
	fieldName: string;
	hasInput?: boolean;
	hasError?: boolean;
	children: React.ReactNode;
}

const Field: React.FunctionComponent<TFieldProps> = ({
	labelText,
	fieldName,
	hasInput = false,
	hasError = false,
	children,
}) => {
	return (
		<PureField
			hasInput={hasInput}
			hasError={hasError}
			fieldName={fieldName}
			labelText={labelText}
		>
			{children}
		</PureField>
	);
};

export default Field;
