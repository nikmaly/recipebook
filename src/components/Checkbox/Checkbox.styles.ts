/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const checkboxWrapperStyles = (
	styles: TStyles,
	isChecked: boolean = false,
): SerializedStyles => css`
${styles.mixins.resetLink('')}
${styles.mixins.panelise('')}
display: block;
background-color: ${styles.colors.primary.light};
color: ${styles.colors.primary.dark};
border-radius: ${styles.spacing[2]};
cursor: pointer;
transition: background-color 0.2s;

&:hover {
	background-color: ${styles.colors.primary.base};
	color: ${styles.colors.primary.light};
}

${isChecked && `
	background-color: ${styles.colors.secondary.light};
	color: ${styles.colors.secondary.dark};

	&:hover {
		background-color: ${styles.colors.secondary.base};
		color: ${styles.colors.secondary.dark};
	}
`}

label {
	display: block;
	padding: 0 ${styles.spacing[1]};
}

input {
	display: none;
}
`;

export const checkboxTextStyles = (styles: TStyles): SerializedStyles => css`
cursor: pointer;
`;
