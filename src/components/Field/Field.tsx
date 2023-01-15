/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from '../../context/Styles';
import {
	fieldWrapperStyles,
	fieldLabelStyles,
	fieldErrorStyles,
} from './Field.styles';

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
	const { styles } = React.useContext(StylesContext);

	return (
		<label
			css={fieldWrapperStyles(
				styles,
				hasInput,
				hasError,
			)}
			htmlFor={fieldName}
		>
			{children}

			<span css={fieldLabelStyles(styles)}>
				{labelText}
			</span>

			{hasError && (
				<span css={fieldErrorStyles(styles)}>
					* This field is required
				</span>
			)}
		</label>
	);
};

export default Field;
