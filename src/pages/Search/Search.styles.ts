/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const searchPageStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	row-gap: 20px;
	height: 100%;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 100px 0;
`;

export const searchPageHeaderContainerStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
`;

export const searchPageTitleStyles = (styles: TStyles): SerializedStyles => css`
	${styles.typography.h1}
	margin-top: 10px;
`;

export const searchPageFieldStyles = (styles: TStyles): SerializedStyles => css`
	min-width: 300px;
	padding: 15px;
	border: 1px solid ${styles.colors.grey[1]};
	border-radius: 5px;
`;

export const searchPageContentContainerStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	row-gap: ${styles.spacing[1]};
	width: 100%;

	${styles.breakpoints.ms.min(`
		row-gap: ${styles.spacing[2]};
	`)}
`;
