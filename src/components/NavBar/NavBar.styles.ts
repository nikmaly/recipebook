import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

const linkPaddingHorizontal = 30;

export const navbarStyles = (
	styles: TStyles,
	isScrolled: boolean,
	isLanding: boolean = false,
	shouldFade: boolean = false,
): SerializedStyles => css`
	z-index: ${styles.z.navbar};
	position: relative;
	top: 0;
	left: ${styles.components.header.borderWidth};
	flex: 0 0 ${styles.components.header.headerContainerHeight};
	width: calc(
		100%
		- ${styles.components.header.borderWidth}
		- ${styles.components.header.borderWidth}
	);
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	transition: background 1s;
	${styles.typography.fontPrimary}

	${shouldFade && `
		display: flex;
	`}

	${isLanding && `
		position: fixed;
		flex-flow: row nowrap;
		border-top: ${styles.components.header.borderWidth} solid ${styles.colors.white[0]};
		opacity: 0;
		${styles.animations.headerFadeIn}
		animation-delay: 4s;

		&:before {
			position: absolute;
			display: block;
			content: "";
			top: 0;
			left: 0;
			width: 100%;
			height: ${styles.components.header.headerContainerHeight} + 10px;
			opacity: 0;
			background-color: transparent;
			pointer-events: none;
		}
	`}

	${isLanding && isScrolled && `
		background-color: ${styles.colors.darkShade[3]};

		&:before {
			transition: opacity ${styles.animations.duration};
			opacity: 1;
		}
	`}
`;

export const navbarLogoStyles = (styles: TStyles, isLanding: boolean): SerializedStyles => css`
	width: 70px;
	height: 70px;

	a {
		position: relative;
		display: block;
		height: 100%;
		width: 100%;

		&:after,
		&:before {
			${styles.mixins.pseudoDisplay('')}
			background-size: 100%;
			background-repeat: no-repeat;
			background-position: center;
			transition: opacity 0.5s;
		}

		&:before {
			background-image: url("/assets/images/logo-physys-dark.png");
			opacity: 1;
		}

		&:after {
			background-image: url("/assets/images/logo-physys-dark-wireframe.png");
			opacity: 0.000001;
		}

		&:hover,
		&:focus,
		&:active {
			&:before {
				opacity: 0;
			}

			&:after {
				opacity: 1;
			}
		}
	}

	${!isLanding && `
		margin: 10px auto;

		${styles.breakpoints.xs.min(`
			margin: 20px auto 10px;
		`)}

		${styles.breakpoints.s.min(`
			margin: 30px auto 20px;
		`)}
	`}

	${isLanding && `
		width: 50px;
		height: 50px;
		margin: 0;

		a {
			&:after,
			&:before {
				background-size: 40px;
			}

			&:before {
				background-image: url("/assets/images/logo-physys.png");
				opacity: 1;
			}

			&:after {
				background-image: url("/assets/images/logo-physys-wireframe.png");
				opacity: 0.000001;
			}
		}
	`}
`;

export const navbarLinkMobileStyles = (styles: TStyles): SerializedStyles => css`
	flex: 0 0
		calc(
			${styles.components.header.innerBorderSpacing}
			- ${styles.components.header.borderWidth}
		);
	height: 50px;

	${styles.breakpoints.ms.min(`
		button,
		nav {
			display: none;
		}
	`)}
`;

export const navbarLinkMobileButtonStyles = (
	styles: TStyles,
	isOpen: boolean,
): SerializedStyles => css`
	${styles.mixins.resetButton('')}
	height: ${styles.components.header.containerHeight};
	width: ${styles.components.header.containerHeight};
	background-size: 50%;
	background-repeat: no-repeat;
	background-position: center;
	transition: background-image ${styles.animations.duration};
	font-size: 1px;
    color: transparent;
	overflow: hidden;
    text-indent: -200vw;

	${isOpen
		? 'background-image: url("/assets/images/svg/menu-close-white.svg")'
		: 'background-image: url("/assets/images/svg/menu-white.svg")'
};

	${styles.breakpoints.ms.min(`
		display: none;
	`)}
`;

export const navbarLinkMobileNavStyles = (
	styles: TStyles,
	isOpen: boolean,
): SerializedStyles => css`
	display: flex;
	position: absolute;
	left: ${isOpen ? '0' : '110%'};
	top: 0;
	height: calc(100vh - 57px); // I'm sorrry future me, but it adds up, I promise
	width: 100%;
	margin-top: ${styles.components.header.containerHeight};
	transition: left 0.5s ease-in-out;

	${styles.breakpoints.ms.min(`
		display: none;
	`)}

	ul {
		flex: 1 0 auto;
		display: flex;
		flex-flow: column;
		justify-content: space-around;
		align-content: center;
		margin: 0;
		padding: 0;
		list-style: none;
		background: ${styles.colors.primary.a9};
		text-align: center;

		a {
			display: inline-block;
			margin: 0 30px;
			padding: 10px 0;
			font-size: 3em;
			color: ${styles.colors.white.base};
			font-weight: bold;
			text-decoration: none;
			letter-spacing: 5px;
			border-bottom: 1px solid transparent;
			transition: border-bottom ${styles.animations.duration};

			&:hover {
				border-bottom: 1px solid ${styles.colors.white.base};
			}
		}
	}
`;

export const navbarLinkDesktopStyles = (styles: TStyles, isLanding: boolean): SerializedStyles => css`
	flex: 1;
	display: flex;
	flex-flow: row wrap;
	justify-content: center;
	align-items: center;
	padding: 0;
	margin: 0;
	list-style: none;

	ul {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		align-items: center;
		padding: 0;
		margin: 0;
		flex: 1 1 auto;
		list-style: none;
	}

	li {
		margin: 3px 0;
	}

	a {
		position: relative;
		display: block;
		padding: 10px ${linkPaddingHorizontal}px 6px;
		font-size: 0.8em;
		letter-spacing: 4px;
		color: ${isLanding ? styles.colors.white.base : styles.colors.black.base};
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.5s;
		${styles.typography.fontText}

		&:before {
			${styles.mixins.pseudoDisplay('')}
			left: ${linkPaddingHorizontal}px;
			width: calc(100% - ${linkPaddingHorizontal * 2}px);
			border-bottom: 1px solid ${isLanding ? styles.colors.white.base : styles.colors.black.base};
			transition: transform 0.5s;
			transform: scaleX(0);
		}

		&:hover,
		&:focus,
		&:active {
			&:before {
				transform: scaleX(0.99);
			}
		}
	}

	${isLanding && `
		display: none;

		${styles.breakpoints.ms.min(`
			display: flex;
		`)}

		ul {
			flex-flow: row nowrap;
			justify-content: center;
		}
	`}
`;
