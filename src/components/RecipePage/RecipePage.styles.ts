import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const recipePageStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: row nowrap;
	min-height: 100%;
	${styles.mixins.resetList('')}
`;

export const recipePagePanelLeftStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetList('')}
	margin-top: ${styles.components.navbar.height};
	padding: 10px 20px 20px 20px;
	width: 50vw;
`;

export const recipePagePanelRightStyles = (styles: TStyles): SerializedStyles => css`
	width: 50vw;
	height: 100vh;

	img {
		position: fixed;
		width: 50vw;
		height: 100vh;
		object-fit: cover;
		color: ${styles.colors.white.base};
	}
`;
