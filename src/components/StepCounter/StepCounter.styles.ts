/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const stepCounterStyles = (
	styles: TStyles,
): SerializedStyles => css`
display: flex;
flex-flow: row nowrap;
justify-content: space-around;
column-gap: 10px;
`;

export const stepCounterStepStyles = (
	styles: TStyles,
	isCurrentStep: boolean = false,
): SerializedStyles => css`
${styles.mixins.resetButton('')}
flex: 1;
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;

h4 {
	margin: 0;
	height: 30px;
	width: 30px;
	border-radius: 50%;
	font-size: 1.4em;
	line-height: 1.4em;
	text-align: center;
	font-weight: bold;
	background-color: ${styles.colors.secondary.light};
	border: 2px solid ${styles.colors.secondary.base};
	color: ${styles.colors.primary.base};
	transition:
		background-color 0.2s,
		border-color 0.2s;
}

p {
	margin: 10px 0 0;
	font-size: 12px;
	text-align: center;
	color: ${styles.colors.grey[2]};
	border-bottom: 2px solid transparent;
	transition:
		border-bottom-color 0.2s;
}

${isCurrentStep ? `
	h4 {
		background-color: ${styles.colors.primary.light};
		border-color: ${styles.colors.primary.dark};
		color: ${styles.colors.primary.dark};
	}

	p {
		border-bottom-color: ${styles.colors.primary.base};
	}
` : `
	&:hover,
	&:active {
		h4 {
			border-color: ${styles.colors.secondary.dark};
			color: ${styles.colors.secondary.dark};
		}

		p {
			border-bottom-color: ${styles.colors.secondary.base};
		}
	}
`}
`;
