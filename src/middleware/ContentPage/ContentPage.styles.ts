import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const contentPageContentStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fadeIn(styles.animations.durationFade)};
	height: calc(100vh - ${styles.components.header.height} - 20px);
	width: 100%;
	max-width: 1080px;
	margin: 0 auto;
	padding: 0 10px;
	text-align: center;
	overflow-y: scroll;

	${styles.breakpoints.s.min(`
		height: calc(100% - ${styles.components.header.heightS} - 20px);
	`)}

	${styles.breakpoints.ms.min(`
	height: calc(100% - ${styles.components.header.heightMs} - 20px);
	`)}

	${styles.breakpoints.l.min(`
		width: 90%;
	`)}
`;
