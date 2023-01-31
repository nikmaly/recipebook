/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const discoverPageStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: row nowrap;
	column-gap: 20px;
	height: calc(100% - 150px);
	max-width: 1200px;
	margin: 0 auto;
`;

export const filterContainerStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.panelise('')}
	flex: 0 0 400px;
	height: 100%;
	padding: 20px;
`;

export const resultsContainerStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.panelise('')}
	flex: 1 1 auto;
	display: flex;
	flex-flow: column wrap;
	align-items: center;
	row-gap: ${styles.spacing[1]};
	height: 100%;
	width: 100%;
	margin-bottom: 30px;
	padding: 20px;

	${styles.breakpoints.ms.min(`
		margin-bottom: 50px;
	`)}
`;
