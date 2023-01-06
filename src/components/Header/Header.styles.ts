import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const headerStyles = (styles: TStyles): SerializedStyles => css`
	${styles.typography.fontPrimary};
	position: relative;
	width: 100%;
	overflow: hidden;
`;

export const headerContentTextStyles = (styles: TStyles): SerializedStyles => css`
	${styles.typography.fontPrimary};
	${styles.mixins.fadeIn(styles.animations.durationFade)};
	padding: 20px;
	color: ${styles.colors.black.base};
	font-size: 1.5em;
	text-transform: uppercase;
	text-align: center;
	letter-spacing: 12px;

	${styles.breakpoints.xs.min(`
		padding: 20px;
		font-size: 2em;
	`)}

	${styles.breakpoints.s.min(`
		padding: 30px 20px;
		font-size: 2.5em;
	`)}

	${styles.breakpoints.ms.min(`
		padding: 30px 20px 40px;
		font-size: 4em;
	`)}
`;
