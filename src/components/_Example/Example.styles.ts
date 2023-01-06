import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const exampleStyles = (styles: TStyles): SerializedStyles => css`
	colors: ${styles.colors.black.base};
`;
