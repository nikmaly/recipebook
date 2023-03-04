/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import {
	checkboxWrapperStyles,
	checkboxTextStyles,
} from '.';

type TPureCheckboxProps = {
	labelText: string;
	checkboxName: string;
	isChecked?: boolean;
	children: React.ReactNode;
}

const PureCheckbox: React.FunctionComponent<TPureCheckboxProps> = ({
	labelText,
	checkboxName,
	isChecked = false,
	children,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<div
			css={checkboxWrapperStyles(
				styles,
				isChecked,
			)}
		>
			<label
				htmlFor={checkboxName}
			>
				{children}

				<span css={checkboxTextStyles(styles)}>
					{labelText}
				</span>
			</label>
		</div>
	);
};

export default PureCheckbox;
