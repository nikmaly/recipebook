/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const fieldWrapperStyles = (
	styles: TStyles,
	hasContent: boolean,
	hasError: boolean,
): SerializedStyles => css`
position: relative;
display: flex;
flex-flow: column wrap;
align-items: flex-start;
margin-bottom: 10px;

${styles.breakpoints.s.min(`
	margin-bottom: 25px;
`)}

${styles.breakpoints.m.min(`
	margin: 10px 0 35px;
`)}

input,
textarea {
	position: relative;
	width: 100%;
	padding: 25px 15px 5px 1px;
	background-color: ${styles.colors.white.base};
	border: none;
	border-bottom: 1px solid ${
		hasError
			? `${styles.colors.type.error}`
			: `${styles.colors.secondary.base}`
	};
	margin-bottom: 2px;
	color: ${styles.colors.grey[2]};
	transition:
		border-bottom-width 0.2s,
		border-bottom-color 0.2s,
		color 0.2s,
		margin-bottom 0.2s;

	&::placeholder {
		color: transparent;
		transition: color 0.2s;
	}

	&:active,
	&:focus {
		border-bottom-width: 3px;
		color: ${styles.colors.primary.dark};
		margin-bottom: 0px;
	}

	&:active,
	&:focus {
		&::placeholder {
			color: ${styles.colors.grey[2]};
		}

		+ span {
			top: 0;
			font-size: 0.9em;
			color: ${styles.colors.grey[1]};
		}
	}

	${hasContent && `
		&::placeholder {
			color: ${styles.colors.grey[2]};
		}

		+ span {
			top: 0;
			font-size: 0.9em;
			color: ${styles.colors.grey[1]};
		}
	`}
}
`;

export const fieldLabelStyles = (styles: TStyles): SerializedStyles => css`
	position: absolute;
	left: 0;
	top: 20px;
	font-size: 0.95em;
	color: ${styles.colors.grey[3]};
	text-transform: capitalize;
	pointer-events: none;
	transition: top 0.2s, color 0.2s, font-size 0.2s;
`;

export const fieldErrorStyles = (styles: TStyles): SerializedStyles => css`
	margin-top: 5px;
	font-size: 0.8em;
	color: ${styles.colors.type.error};
`;
