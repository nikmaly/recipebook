/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const devStyles = (styles: TStyles): SerializedStyles => css`
	color: ${styles.colors.black.base};
`;
