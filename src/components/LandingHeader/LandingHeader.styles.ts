import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const landingHeaderStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	height: 100vh;
	width: 100%;
	overflow: hidden;
	${styles.typography.fontPrimary}

	${styles.breakpoints.ms.min(`
		padding: 5px;
	`)}

	&:before,
	&:after {
		display: block;
		position: absolute;
		content: "";
		width: calc(100% - ${styles.components.header.borderWidth});
		height: calc(100% - ${styles.components.header.borderWidth});
		border: ${styles.components.header.borderWidth} none ${styles.colors.white[0]};
		pointer-events: none;
		z-index: 12;
	}

	&:before {
		top: 0;
		left: 0;
		border-top-style: solid;
		border-right-style: solid;
		animation-fill-mode: forwards;
	}

	&:after {
		bottom: 0;
		right: 0;
		border-bottom-style: solid;
		border-left-style: solid;
		animation-fill-mode: forwards;
	}

	@keyframes header-border {
		0% {
			width: 0%;
			height: 0%;
		}
		50% {
			width: calc(100% - ${styles.components.header.borderWidth});
			height: 0%;
		}
		100% {
			width: calc(100% - ${styles.components.header.borderWidth});
			height: calc(100% - ${styles.components.header.borderWidth});
		}
	}

	&:before,
	&:after {
		width: 0%;
		height: 0%;
		animation-name: header-border;
		animation-duration: 4s;
		animation-delay: 0s;
		animation-timing-function: linear;
	}
`;

export const landingHeaderBackgroundStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(28, 28, 28, 0.99);
	background-image: url(${styles.components.landingHeader.backgroundImage});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-attachment: fixed;
	transition: transform 2s ease-in-out;
`;

export const landingHeaderShadeStyles = (styles: TStyles): SerializedStyles => css`
	position: absolute;
	z-index: 11;
	height: 100%;
	width: 100%;
	background-color: ${styles.colors.darkShade[3]};

	&:after {
		${styles.mixins.pseudoDisplay('')}
		pointer-events: none;
		z-index: 14;
		background-color: ${styles.colors.black[1]};
		animation-name: header-background;
		animation-duration: 3s;
		animation-delay: 1.5s;
		animation-fill-mode: forwards;
	}

	@keyframes header-background {
		0% {
			background-color: ${styles.colors.darkShade[10]};
		}
		100% {
			background-color: ${styles.colors.darkShade[0]};
		}
	}
`;

export const landingHeaderFrostingStyles = (styles: TStyles): SerializedStyles => css`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-image: url(${styles.components.landingHeader.backgroundImage});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-attachment: fixed;
	clip-path: inset(
		${styles.components.landingHeader.frostingClipMobileY} ${styles.components.landingHeader.frostingClipMobileX}
	);
	filter: blur(6px);
	z-index: 10;

	${styles.breakpoints.ms.min(`
		clip-path: inset(
			${styles.components.landingHeader.frostingClipDesktopY} ${styles.components.landingHeader.frostingClipDesktopX}
		);
	`)}
`;

export const landingHeaderFrostingEdgesStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	height: calc(100% - (${styles.components.landingHeader.frostingClipMobileY} * 2));
	width: calc(100% - (${styles.components.landingHeader.frostingClipMobileX} * 2));
	box-shadow: ${styles.colors.darkShade[4]} 0 0 80px 0;
	z-index: 10;

	${styles.breakpoints.ms.min(`
		height: calc(100% - (${styles.components.landingHeader.frostingClipDesktopY} * 2));
		width: 100%;
	`)}

	&:before {
		${styles.mixins.pseudoDisplay('')}
		box-shadow: inset ${styles.colors.lightShade[9]} 0 0 30px -10px;
	}

	&:after {
		${styles.mixins.pseudoDisplay('')}
		background-color: ${styles.colors.lightShade[1]};
	}
`;

export const landingHeaderContentStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	flex-flow: column nowrap;
	height: 100%;
	width: 100%;
	z-index: 15;

	&:before {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: block;
		content: "";
		pointer-events: none;
		opacity: 0;
		box-shadow: inset 0 0 100px -30px ${styles.colors.lightShade[6]};
		animation-name: header-element-visibility;
		animation-duration: 3s;
		animation-fill-mode: forwards;
		animation-delay: 4s;

		@keyframes header-element-visibility {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}

		${styles.breakpoints.m.min(`
			box-shadow: inset 0 0 120px -20px ${styles.colors.lightShade[6]};
		`)}
	}
`;

export const landingHeaderContentTextStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	display: flex;
	justify-content: center;
	width: 100%;

	// We want the height to match the frosting. It's size is defined as the page's height minus the clip distance on each edge.
	// So to get it's height, we take 100vh and take two lots of it's clip distance off (one for each side, top and bottom).
	height: calc(100vh - (${styles.components.landingHeader.frostingClipMobileY} * 2));
	transition: transform 2s ease-in-out;

	${styles.breakpoints.ms.min(`
		height: auto;
		width: auto;
	`)}

	// Header Text top and bottom borders
	&:before,
	&:after {
		position: absolute;
		display: block;
		width: 0;
		content: "";
		animation-name: header-text-border;
		animation-duration: 2.5s;
		animation-delay: 1s;
		animation-fill-mode: forwards;
	}

	&:before {
		top: 0;
		left: 0;
		border-top: 1px dotted ${styles.colors.white[0]};
	}

	&:after {
		bottom: 0;
		right: 0;
		border-bottom: 1px dotted ${styles.colors.white[0]};
	}

	@keyframes header-text-border {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}
`;

export const landingHeaderContentTextWrapperStyles = (styles: TStyles): SerializedStyles => css`
	${styles.typography.fontPrimary}
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	padding: 25px 20px;
	color: transparent;
	font-size: 18px;
	text-transform: uppercase;
	text-align: center;
	letter-spacing: 12px;

	animation-name: header-text;
	animation-duration: 4s;
	animation-fill-mode: forwards;
	animation-delay: 1.5s;

	h1 {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column nowrap;
		margin: 0;
		font-size: 20px;

		${styles.breakpoints.ms.min(`
			flex-flow: row nowrap;
		`)}
	}

	@keyframes header-text {
		from {
			color: transparent;
		}
		to {
			color: ${styles.colors.white[0]};
		}
	}

	.header-logo {
		display: block;
		visibility: hidden;
		margin: 10px 20px;
		height: 20px;
		opacity: 0;

		background-image: url("/assets/images/logo-physys.png");
		background-size: ${styles.components.landingHeader.logoSize};
		background-position: center;
		background-repeat: no-repeat;

		animation-name: header-logo;
		animation-duration: 2.5s;
		animation-delay: 0s;
		animation-fill-mode: forwards;

		${styles.breakpoints.ms.min(`
			display: inline-block;
			visibility: visible;
			height: ${styles.components.landingHeader.logoSize};
			width: ${styles.components.landingHeader.logoSize};
			margin: 0 20px;
		`)}
	}

	@keyframes header-logo {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
`;

// export const landingHeaderSnakes = (styles: TStyles): SerializedStyles => css`
// 	> * {
// 		height: 20px;
// 		width: 0px;
// 		border-left: 1px dotted #EEE;
// 		border-top: 1px dotted #EEE;
// 		top: 0;
// 		left: 70%;
// 		position: absolute;
// 		z-index: 11;
// 		opacity: 0;
// 		animation-name: snake-a;
// 		animation-duration: 10s;
// 		animation-iteration-count: infinite;
// 		animation-timing-function: linear;
// 	}

// 	@keyframes snake-a {
// 		49% {
// 			opacity: 0;
// 			top: 0;
// 			left: 0;
// 		}
// 		50% {
// 			opacity: 0.5;
// 			top: 0;
// 			left: 70%;
// 		}
// 		74% {
// 			height: 20px;
// 			width: 0;
// 		}
// 		75% {
// 			top: 60%;
// 			left: 70%;
// 			height: 0;
// 			width: 0;
// 		}
// 		76% {
// 			height: 0;
// 			width: 20px;
// 		}
// 		100% {
// 			top: 60%;
// 			left: 0%;
// 			height: 0;
// 			width: 20px;
// 		}
// 	}
// `;
