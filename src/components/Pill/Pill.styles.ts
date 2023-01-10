import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';
import { TPillThemes } from './Pill';

export const pillListItemStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetLink('')}
`;

export const pillStyles = (
	styles: TStyles,
	theme: TPillThemes,
): SerializedStyles => css`
	${styles.mixins.resetLink('')}
	display: block;
	padding: 5px 10px;
	background-color: ${styles.colors.primary.light};
	border-radius: 10px;
	box-shadow: 5px 5px 7px -7px ${styles.colors.darkShade[5]};
	transition: background-color 0.2s;

	&:hover {
		background-color: ${styles.colors.primary.base};
	}

	${theme === 'secondary' && `
		background-color: ${styles.colors.secondary.light};

		&:hover {
			background-color: ${styles.colors.secondary.base};
		}
	`}
`;
