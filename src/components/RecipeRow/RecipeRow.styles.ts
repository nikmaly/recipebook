/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const recipeRowStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.panelise('')}
	display: flex;
	flex-flow: row nowrap;
	text-decoration: none;
	border: 1px solid transparent;
	color: ${styles.colors.grey[3]};
	transition: background-color 0.2s, transform 0.2s, color 0.2s;

	&:hover {
		transform: scale(1.02);
		background-color: ${styles.colors.primary.light};
		color: ${styles.colors.black.base};
	}
`;

export const recipeRowImageStyles = (
	styles: TStyles,
	image: string,
): SerializedStyles => css`
	flex: 0 0 25%;
	margin-right: 5px;
	height: 100%;
	min-height: 100px;
	background-image: url(${image});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	${styles.breakpoints.ms.min(`
		flex: 0 0 20%;
		min-height: 120px;
		margin-right: 10px;
	`)}
`;

export const recipeRowContentStyles = (styles: TStyles): SerializedStyles => css`
	flex: 1 1 auto;
	display: flex;
	flex-flow: column nowrap;
	padding: ${styles.spacing[0]};

	${styles.breakpoints.ms.min(`
		padding: ${styles.spacing[2]};
	`)}
`;

export const recipeRowHeaderStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-between;

	${styles.breakpoints.ms.min(`
		flex-flow: row nowrap;
		align-items: center;
		margin-bottom: ${styles.spacing[1]};
	`)}
`;

export const recipeRowTitleStyles = (styles: TStyles): SerializedStyles => css`
	${styles.typography.h4}
	margin: 0;
`;

export const recipeRowTagStyles = (styles: TStyles): SerializedStyles => css`
	margin: ${styles.spacing[0]} 0;

	ul {
		${styles.mixins.resetList('')}
		display: flex;
		flex-flow: row wrap;
		row-gap: ${styles.spacing[1]};
		column-gap: ${styles.spacing[1]};
		margin-left: -2px;

		${styles.breakpoints.ms.min(`
			margin: 0 ${styles.spacing[0]} 0 0;
		`)}
	}
`;

export const recipeRowDescriptionStyles = (styles: TStyles): SerializedStyles => css`
	margin: ${styles.spacing[1]} 0 0;
	font-size: 0.7em;
	line-height: 1.2em;
	overflow: hidden;
    max-height: 28px;

	${styles.breakpoints.ms.min(`
		margin: ${styles.spacing[0]} 0 -2px;
		font-size: 0.8em;
		line-height: 1.4em;
		max-height: unset;
	`)}
`;
