/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

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

	label {
		> input {
			padding-left: 10px;
			padding-left: 10px;
			text-align: center;
		}

		> span {
			left: 50%;
			transform: translate(-55%, 0);
		}
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
