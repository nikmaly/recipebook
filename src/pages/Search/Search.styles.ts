/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const searchPageStyles = (styles: TStyles): SerializedStyles => css`
	text-align: left;
`;

export const searchPageFieldContainerStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	margin-bottom: 10px;

	${styles.breakpoints.s.min(`
		margin-bottom: 25px;
	`)}

	${styles.breakpoints.m.min(`
		margin: 10px 0 35px;
	`)}
`;

export const searchPageFieldStyles = (styles: TStyles): SerializedStyles => css`
	width: 100%;
	padding: 15px;
	background-color: ${styles.colors.white.base};
	border: none;
	border-bottom: 1px solid ${styles.colors.secondary.base};
	margin-bottom: 2px;
	color: ${styles.colors.grey[2]};
	transition: border-bottom 0.2s, color 0.2s, margin-bottom 0.2s;

	${styles.breakpoints.s.min(`
		width: 420px;
	`)}

	&:active,
	&:focus {
		border-bottom: 3px solid ${styles.colors.secondary.base};
		color: ${styles.colors.primary.dark};
		margin-bottom: 0px;
	}
`;

export const searchPageContentContainerStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	row-gap: ${styles.spacing[1]};
	width: 100%;
	margin-bottom: 30px;

	${styles.breakpoints.ms.min(`
		margin-bottom: 50px;
	`)}
`;
