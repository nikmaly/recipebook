import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const footerStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	width: 100%;
	min-height: 100px;
	margin-top: auto;
	color: ${styles.colors.black.base};
`;

export const footerWrapperStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 20px;
	color: ${styles.colors.black.base};
`;

export const footerTextStyles = (styles: TStyles): SerializedStyles => css`
	color: ${styles.colors.black[2]};
`;
