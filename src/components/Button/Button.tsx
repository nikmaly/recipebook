/** @jsxImportSource @emotion/react */
import React from 'react';
import {
	PureButton,
} from '.';

type TButtonProps = {
	type?: 'button' | 'submit' | 'reset';
	text: string;
}

const Button: React.FunctionComponent<TButtonProps> = ({
	type = 'submit',
	text,
}) => (
	<PureButton
		type={type}
		text={text}
	/>
);

export default Button;
