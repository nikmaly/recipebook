import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';
import { TPillThemes } from './Pill';

export const pillListItemStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetLink('')}
`;

export const pillStyles = (
	styles: TStyles,
	theme: TPillThemes,
	compact: boolean = false,
): SerializedStyles => css`
	${styles.mixins.resetLink('')}
	${styles.mixins.panelise('')}
	display: block;
	padding: ${styles.spacing[0]} ${styles.spacing[1]};
	background-color: ${styles.colors.primary.light};
	color: ${styles.colors.primary.dark};
	border-radius: ${styles.spacing[2]};
	transition: background-color 0.2s;

	&:hover {
		background-color: ${styles.colors.primary.base};
		color: ${styles.colors.primary.light};
	}

	${theme === 'secondary' && `
		background-color: ${styles.colors.secondary.light};
		color: ${styles.colors.secondary.dark};

		&:hover {
			background-color: ${styles.colors.secondary.base};
			color: ${styles.colors.secondary.dark};
		}
	`}

	${styles.breakpoints.ms.max(`
		${compact && `
			padding: 2px 6px;
			border-radius: ${styles.spacing[1]};
			font-size: 0.7em;
			line-height: 1.2em;
		`}
	`)}
`;
