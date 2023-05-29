/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const loginStyles = (styles: TStyles): SerializedStyles => css`
	text-align: center;

	p {
		line-height: 1.5em;
	}

	a {
		color: ${styles.colors.grey[2]};
	}
`;
