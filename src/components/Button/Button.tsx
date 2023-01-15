/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from '../../context/Styles';
import {
	buttonStyles,
} from './Button.styles';

type TButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	text: string;
}

const Button: React.FunctionComponent<TButtonProps> = ({
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

export default Button;
