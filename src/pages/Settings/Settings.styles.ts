/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const settingsStyles = (styles: TStyles): SerializedStyles => css`
	p {
		line-height: 1.5em;
	}

	a {
		color: ${styles.colors.grey[2]};
	}
`;
