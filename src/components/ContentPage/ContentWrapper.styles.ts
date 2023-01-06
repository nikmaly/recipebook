import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const contentWrapperStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fadeIn(styles.animations.durationFade)};
	width: 100%;
	max-width: 1080px;
	margin: 0 auto;
	padding: 0 10px;
	text-align: center;

	${styles.breakpoints.l.min(`
		width: 90%;
	`)}
`;
