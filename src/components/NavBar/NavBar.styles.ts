import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const navbarStyles = (
	styles: TStyles,
	isLanding: boolean,
): SerializedStyles => css`
	${styles.typography.fontPrimary}
	z-index: ${styles.z.navbar};
	position: fixed;
	height: ${styles.components.navbar.height};
	width: 100%;
	display: flex;
	flex-flow: row nowrap;
	justify-content: space-between;
	align-items: center;
	background-color: transparent;
	transition: background 1s;

	${isLanding && `
		top: 50%;
		transform: translateY(-59%);
	`}
`;

export const navbarLogoStyles = (styles: TStyles): SerializedStyles => css`
	height: ${styles.components.navbar.height};
	width: ${styles.components.navbar.height};
	padding: 4px;

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
`;

const linkPaddingHorizontal = 30;

export const navbarLinkStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetList('')}
	${styles.mixins.flexCentre('')}
	height: ${styles.components.navbar.height};

	li {
		margin: 3px 0;
	}

	a {
		padding: 10px 8px 6px;
		font-size: 0.8em;
		letter-spacing: 2px;
		color: ${styles.colors.black.base};
		text-transform: uppercase;
		text-decoration: none;
		${styles.typography.fontText}
		${styles.mixins.linkDecorator('')}

		${styles.breakpoints.s.min(`
		${styles.mixins.linkDecorator((linkPaddingHorizontal / 2).toString())}
		padding: 10px ${linkPaddingHorizontal / 2}px 6px;
			letter-spacing: 3px;
		`)}

		${styles.breakpoints.ms.min(`
			${styles.mixins.linkDecorator(linkPaddingHorizontal.toString())}
			padding: 10px ${linkPaddingHorizontal}px 6px;
			letter-spacing: 4px;
		`)}
`;

export const navbarLinkMenuWrapperStyles = (
	styles: TStyles,
): SerializedStyles => css`
	transition: background-image ${styles.animations.duration};
`;

export const navbarLinkMenuButtonStyles = (
	styles: TStyles,
	isOpen: boolean,
	isLanding: boolean,
): SerializedStyles => css`
	${styles.mixins.resetButton('')}
	z-index: ${styles.z.navbar + 2};
	position: relative;
	height: ${styles.components.navbar.height};
	width: ${styles.components.navbar.height};
	background-size: 50%;
	background-repeat: no-repeat;
	background-position: center;
	transition: background-image ${styles.animations.duration};
	font-size: 1px;
    color: transparent;
	overflow: hidden;
    text-indent: -200vw;

	${isOpen
		? `background-image: url("/assets/images/svg/menu-close-${isLanding ? 'white' : 'black'}.svg")`
		: 'background-image: url("/assets/images/svg/menu-black.svg")'
};
`;

export const navbarLinkMenuStyles = (
	styles: TStyles,
	isOpen: boolean,
	isLanding: boolean,
): SerializedStyles => css`
	${styles.mixins.resetList('')}
	z-index: ${styles.z.navbar + 1};
	display: flex;
	position: absolute;
	flex-flow: column wrap;
	right: 0;
	height: calc(100vh - ${styles.components.navbar.height});
	width: 100%;
	background: rgb(190, 135, 50);
	transform: translate(100%, 0);
	overflow: hidden;
	transition: transform 1s;

	${styles.breakpoints.s.min(`
		justify-content: space-around;
		height: 400px;
		width: 200px;
		transform: translate(100%, -57.5%);
	`)}

	${!isLanding && `
		top: 50vh;
	`}

	${isOpen && `
		transform: translate(0, 0);

		${styles.breakpoints.s.min(`
			transform: translate(0, -57.5%);
		`)}
	`};

	a {
		${styles.mixins.resetLink('')}
		display: block;
		margin: 10px 0;
		padding: 10px;
		color: ${styles.colors.white.base};
		font-weight: bold;
		font-size: 2em;
		letter-spacing: 2px;

		&:hover {
			text-decoration: underline;
		}
	}
`;