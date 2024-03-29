import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const contentPageContentStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fadeIn(styles.animations.durationFade)};
	width: 100%;
	height: auto;
	max-width: 1080px;
	margin: 0 auto;
	padding: 0 10px;
	min-height: calc(100% - ${styles.components.header.heightBase});

	${styles.breakpoints.s.min(`
		min-height: calc(100% - ${styles.components.header.heightS});
	`)}

	${styles.breakpoints.ms.min(`
		min-height: calc(100% - ${styles.components.header.heightMS});
	`)}
`;
