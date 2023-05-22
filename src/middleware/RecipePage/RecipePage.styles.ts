/* eslint-disable @typescript-eslint/no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const recipePageStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	display: flex;
	flex-flow: column-reverse nowrap;
	height: 100%;
	background-color: ${styles.colors.white.base};

	${styles.breakpoints.m.min(`
		flex-flow: row nowrap;
	`)}
`;

export const recipePagePanelLeftStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetList('')}
	position: relative;
	height: 100%;
    margin-top: 30vh;
	padding: ${styles.spacing[4]};
    background-color: ${styles.colors.white.base};
    z-index: 1;

	${styles.breakpoints.s.min(`
		padding: ${styles.spacing[4]} ${styles.spacing[10]};
	`)}

	${styles.breakpoints.m.min(`
		flex: 0 0 50vw;
		margin-top: 0;
		padding-top: 50px;
		padding-right: ${styles.spacing[6]};
	`)}

	article {
		position: relative;
	}
`;

export const recipePagePanelRightStyles = (styles: TStyles): SerializedStyles => css`
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 30vh;

	a {
		display: block;
		width: 100%;
    	height: 100%;
	}

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}

	${styles.breakpoints.m.min(`
		flex: 0 0 50vw;
		position: relative;
		height: 100vh;
		color: ${styles.colors.white.base};

		a {
			position: fixed;
			width: 50vw;
			height: 100vh;
		}
	`)}
`;

export const recipePageNextLinkStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetLink('')}
	${styles.mixins.visuallyHideText('')}

	&:after {
		content: "";
		position: fixed;
		right: 0;
		bottom: 0;
		width: 0;
		border-style: solid;
		box-shadow: -1px -1px 5px ${styles.colors.darkShade[4]};
		border-width: 40px;
		border-color:
			${styles.colors.grey[1]}
			${styles.colors.black[4]}
			${styles.colors.black[4]}
			${styles.colors.grey[1]};
		border-radius: 20px 0 0 0;
		transform: scale(0);
		transform-origin: bottom right;
		transition: transform 1s;
	}

	&:hover:after {
		transform: scale(1);
	}
`;

export const recipePageTitleStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fontHeader('')}
	margin: 0 0 0.5em;
	padding-right: 40px;
	font-size: 3em;
	font-weight: 100;
	letter-spacing: ${styles.spacing[0]};
	line-height: 1em;
`;

export const recipePageFavouriteStyles = (styles: TStyles): SerializedStyles => css`
position: absolute;
right: 0;
top: 8px;
`;

export const recipePageTagStyles = (styles: TStyles): SerializedStyles => css`
	margin: 20px 0;

	ul {
		${styles.mixins.resetList('')}
		display: flex;
		flex-flow: row wrap;
		row-gap: ${styles.spacing[1]};
		column-gap: ${styles.spacing[1]};
	}
`;

export const recipePageDescriptionStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.panelise('')}
	${styles.mixins.fontText('')}
	padding: 0 ${styles.spacing[3]};
	font-size: 0.8em;
	line-height: 1.6em;
	letter-spacing: 0.02em;
`;

export const recipePageInfoDataStyles = (styles: TStyles): SerializedStyles => css`
	margin: 20px 0;

	ul {
		${styles.mixins.resetList('')}
		display: flex;
		flex-flow: row wrap;

		li {
			${styles.mixins.panelise('')}
			margin-right: ${styles.spacing[3]};
			padding: ${styles.spacing[0]} ${styles.spacing[1]};
			border-radius: 2px;

			&:last-child {
				margin-right: 0;
			}

			p {
				${styles.mixins.fontText('')}
				margin: 2px 0;
				text-transform: capitalize;

				&:first-of-type {
					margin-top: 0;
					font-size: 0.8em;
				}

				&:last-of-type {
					margin-bottom: 0;
				}
			}
		}
	}
`;

export const recipePageTabStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetList('')}
	${styles.mixins.fontText('')}
	margin: ${styles.spacing[4]} 0;

	> div:not-first-child {
		padding: ${styles.spacing[3]};
	}
`;
