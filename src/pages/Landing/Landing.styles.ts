import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const landingStyles = (styles: TStyles): SerializedStyles => css`
	color: ${styles.colors.black.base};
`;
