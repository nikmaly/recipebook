/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import {
	buttonStyles,
} from '.';

type TPureButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	text: string;
};

const PureButton: React.FunctionComponent<TPureButtonProps> = ({
	type = 'submit',
	text,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<button
			css={buttonStyles(styles)}
			// eslint-disable-next-line react/button-has-type
			type={type}
		>
			{text}
		</button>
	);
};

export default PureButton;
