import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../../context/Styles';

export const imageTileStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	max-height: 350px;

	${styles.breakpoints.ms.min(`
		max-height: 300px;
	`)}

	&:hover,
	&:focus,
	&:active {
		.image-tile__image {
			transform: scale(1.05);
		}

		.image-tile__link:before {
			opacity: 1;
			margin: 10px;
		}

		.image-tile__link:after {
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
`;

export const imageTileImageStyles = (styles: TStyles): SerializedStyles => css`
	margin-bottom: -4px;
	width: 100%;
	colors: ${styles.colors.black.base};
	transition: transform 0.3s ease-in-out;
	will-change: transform;
`;

export const imageTileLinkStyles = (styles: TStyles, isLoaded: boolean): SerializedStyles => css`
	display: block;
	position: relative;
	overflow: hidden;
	height: 100%;
	text-decoration: none;
	opacity: 1;
	transition: opacity 0.3s;
	border: 2px solid #FFF;
	background-image: linear-gradient(
		to top,
		rgba(0, 0, 0, 0.4),
		rgba(0, 0, 0, 0) 50%,
		rgba(0, 0, 0, 0) 85%,
		rgba(0, 0, 0, 0.2)
	);

	// === Hover Photomark Overlay
	&:before {
		z-index: 1;
		opacity: 0;
		position: absolute;
		content: "";
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 5px;
		border: 2px solid ${styles.colors.lightShade[10]};
		clip-path: polygon(0 0, 0 7px, 7px 7px, 7px 0, 100% 0, 100% 7px, calc(100% - 7px) 7px, calc(100% - 7px) 0, 100% 0, 100% 100%, calc(100% - 7px) 100%, calc(100% - 7px) calc(100% - 7px), 100% calc(100% - 7px), 100% 0, 0 0, 0 calc(100% - 7px), 7px calc(100% - 7px), 7px 100%, 0 100%);
		transition: margin ${styles.animations.duration}, opacity ${styles.animations.duration};
	}

	// === Hover Shade Overlay
	&:after {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0);
		transition: background-color 0.3s;
	}

	${!isLoaded && 'visibility: hidden;'}
`;
