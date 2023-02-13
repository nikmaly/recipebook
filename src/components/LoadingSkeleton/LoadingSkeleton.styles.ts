/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const loadingSkeletonStyles = (styles: TStyles): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: ${styles.colors.grey[2]};

	&:after {
		${styles.mixins.pseudoDisplay('')}
		background-color: ${styles.colors.lightShade[1]};
		animation-name: loading-pulse;
		// animation-delay: ${Math.random()}s;
		// animation-duration: ${Math.random() + 2}s;
		animation-delay: 0.5s;
		animation-duration: 2.5s;
		animation-timing-function: ease-in-out;
		animation-iteration-count: infinite;
	}

	@keyframes loading-pulse {
		0% {
			background-color: ${styles.colors.lightShade[1]};
		}
		50% {
			background-color: ${styles.colors.lightShade[3]};
		}
		100% {
			background-color: ${styles.colors.lightShade[1]};
		}
	}
`;
