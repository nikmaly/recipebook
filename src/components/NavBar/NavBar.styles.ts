import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const navbarStyles = (
	styles: TStyles,
	isLanding: boolean,
): SerializedStyles => css`
	${styles.mixins.fontHeader('')}
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
	pointer-events: none;

	${isLanding && `
		top: 50%;
		transform: translateY(-50%);
		padding: 40px 0;
	`}
`;

export const navbarLogoStyles = (styles: TStyles): SerializedStyles => css`
	position: relative;
	height: ${styles.components.navbar.height};
	width: ${styles.components.navbar.height};
	padding: 4px;
	pointer-events: all;

	&:before {
		content: "";
		position: absolute;
		top: 50%;
		left: -4px;
		transform: scaleX(0.001) translate(0, -50%);
		height: 100px;
		width: 55px;
		background-color: ${styles.colors.primary.base};
		transform-origin: left center;
		transition: transform 0.3s;
		--mask:
			radial-gradient(32px at calc(100% - 32.00px) 50%,#000 99%,#0000 103%) 0 calc(50% - 0px)/100% 120px,
			radial-gradient(28px at calc(100% + 3.00px) 50%,#0000 99%,#000 103%) calc(100% - 30px) 350%/100% 120px repeat-y;

		mask: var(--mask);
	}

	&:hover:before {
		transform: scaleX(1.1) translate(0, -50%);
	}
`;

export const navbarLogoLinkStyles = (styles: TStyles): SerializedStyles => css`
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
		${styles.mixins.fontText('')}
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
	pointer-events: all;
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
	font-size: 1px;
    color: transparent;
    text-indent: -200vw;

	&:before {
		content: "";
		position: absolute;
		top: 50%;
		left: 100%;
		transform: rotate(180deg) scaleX(0.001) translate(0, 50%);
		height: 100px;
		width: 55px;
		background-color: ${styles.colors.secondary.base};
		transform-origin: left center;
		transition: transform 0.3s;
		--mask:
			radial-gradient(32px at calc(100% - 32.00px) 50%,#000 99%,#0000 103%) 0 calc(50% - 0px)/100% 120px,
			radial-gradient(28px at calc(100% + 3.00px) 50%,#0000 99%,#000 103%) calc(100% - 30px) 350%/100% 120px repeat-y;

		mask: var(--mask);
	}

	&:hover:before {
		transform: rotate(180deg) scaleX(1) translate(0, 50%);
	}

	&:after {
		${styles.mixins.pseudoDisplay('')}
		background-size: 50%;
		background-repeat: no-repeat;
		background-position: center;
		transition: background-image ${styles.animations.duration};

		${isOpen
		? `background-image: url("/assets/images/svg/menu-close-${isLanding ? 'black' : 'black'}.svg");`
		: 'background-image: url("/assets/images/svg/menu-black.svg");'
}
	}
`;
