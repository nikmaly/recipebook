import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const galleryControllerStyles = (styles: TStyles): SerializedStyles => css`
	color: ${styles.colors.black.base};
`;
