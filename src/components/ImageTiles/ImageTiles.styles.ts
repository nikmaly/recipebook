import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const imageTilesStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	flex-flow: row wrap;
	width: 100%;
	color: ${styles.colors.black.base};
`;

export const imageTilesColumnStyles = (styles: TStyles, numCols: number): SerializedStyles => css`
	display: flex;
	flex-flow: column nowrap;
	flex: 0 0 100%;
	flex: 0 0 ${100 / numCols}%;
	color: ${styles.colors.black.base};
`;
