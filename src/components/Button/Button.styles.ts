/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const buttonStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetButton('')}
	min-width: 200px;
    padding: 10px 20px;
    border-radius: 10px;
	background-color: ${styles.colors.primary.light};
	border: 1px solid ${styles.colors.primary.mid};
	color: ${styles.colors.primary.dark};
	transition: background-color 0.4s, border-color 0.4s, color 0.4s;

	&:hover,
	&:focus,
	&:active {
		background-color: ${styles.colors.secondary.light};
		border: 1px solid ${styles.colors.secondary.base};
		color: ${styles.colors.secondary.dark};
	}
`;
