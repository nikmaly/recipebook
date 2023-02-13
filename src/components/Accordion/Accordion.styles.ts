import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const accordionStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.panelise('')}
	color: ${styles.colors.black.base};
	border: 1px solid ${styles.colors.grey[0]};
`;

export const accordionWrapperStyles = (styles: TStyles): SerializedStyles => css`
	color: ${styles.colors.black.base};
	box-shadow: none;
`;

export const accordionSummaryStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	padding-top: 2px;

	&:after {
		content: "";
		position: absolute;
		width: 0;
		height: 2px;
		top: 0;
		left: 0;
		background: ${styles.colors.secondary.base};
		transition: width 0.4s;
	}

	&.Mui-expanded:after {
		width: 100%;
	}
`;

export const accordionDetailStyles = (styles: TStyles): SerializedStyles => css`
	padding: ${styles.spacing[1]} ${styles.spacing[3]};
	background-color: ${styles.colors.grey[0]};
	font-size: 0.9em;
	line-height: 1.8em;

	> p {
		margin: ${styles.spacing[2]} 0;
	}
`;
