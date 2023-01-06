import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const errorPageStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	flex: 1 0 auto;
	text-align: center;

	h1 {
		margin-top: 0;
		color: ${styles.colors.black.base};
	}
`;
