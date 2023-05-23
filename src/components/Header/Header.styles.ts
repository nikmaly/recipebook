import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const headerStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fontHeader('')};
	position: relative;
	height: ${styles.components.header.heightBase};
	width: 100%;
	overflow: hidden;

	${styles.breakpoints.s.min(`
		height: ${styles.components.header.heightS};
	`)}

	${styles.breakpoints.ms.min(`
		height: ${styles.components.header.heightMS};
	`)}
`;

export const headerContentTextStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fontHeader('')};
	${styles.mixins.fadeIn(styles.animations.durationFade)};
	margin-bottom: 5px;
	padding: 15px 20px;
	color: ${styles.colors.primary.dark};
	font-size: 1.5em;
	text-transform: uppercase;
	text-align: center;
	letter-spacing: 12px;

	${styles.breakpoints.xs.min(`
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
