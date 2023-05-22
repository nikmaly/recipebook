/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import {
	fieldWrapperStyles,
	fieldLabelStyles,
	fieldErrorStyles,
} from './Field.styles';

type TPureFieldProps = {
	labelText: string;
	fieldName: string;
	hasInput?: boolean;
	hasError?: boolean;
	largeVariant?: boolean;
	children: React.ReactNode;
}

const PureField: React.FunctionComponent<TPureFieldProps> = ({
	labelText,
	fieldName,
	hasInput = false,
	hasError = false,
	largeVariant = false,
	children,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<label
			css={fieldWrapperStyles(
				styles,
				hasInput,
				hasError,
				largeVariant,
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

export default PureField;
