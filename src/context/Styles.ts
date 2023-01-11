import React from 'react';
/* eslint-disable no-unused-vars */
/* fixes a TS issue thinking the enum is undefined */
export enum TTheme {
    Dark = 'Dark',
    Light = 'Light',
}

type TCssFunction = (content: string) => string;

type TBreakpoint = {
	description: string;
	val: string;
	min: TCssFunction;
};

export type TStyles = {
	theme: TTheme;
	breakpoints: Record<string, TBreakpoint>;
	spacing: Record<string, string>;
	colors: Record<string, Record<string, string>>;
	typography: Record<string, string>;
	animations: Record<string, string>;
	z: Record<string, number>;
	components: Record<string, Record<string, string>>;
	mixins: Record<string, TCssFunction>;
};

export const Styles: TStyles = {
	theme: TTheme.Light,
	breakpoints: {
		// Mobile Sizes
		xxs: {
			description: 'iphone5s - min size',
			val: '320',
			min: (content) => `
				@media (min-width: 320px) {
					${content}
				}
			`,
		},
		xs: {
			description: 'smaller ipones and galaxy devices',
			val: '360',
			min: (content) => `
				@media (min-width: 360px) {
					${content}
				}
			`,
		},
		s: {
			description: 'transition from mobile to tablet',
			val: '400',
			min: (content) => `
				@media (min-width: 400px) {
					${content}
				}
			`,
		},
		// Tablet Sizes
		ms: {
			description: 'iPad Portrait',
			val: '768',
			min: (content) => `
				@media (min-width: 768px) {
					${content}
				}
			`,
		},
		m: {
			description: 'iPad Horizontal',
			val: '1024',
			min: (content) => `
				@media (min-width: 1024px) {
					${content}
				}
			`,
		},
		ml: {
			description: 'iPad Pro',
			val: '1668',
			min: (content) => `
				@media (min-width: 1668px) {
					${content}
				}
			`,
		},
		// Computer Sizes
		l: {
			description: '1080p',
			val: '1920',
			min: (content) => `
				@media (min-width: 1920px) {
					${content}
				}
			`,
		},
		xl: {
			description: '1440p',
			val: '2560',
			min: (content) => `
				@media (min-width: 2560px) {
					${content}
				}
			`,
		},
	},
	spacing: {
		0: '4px',
		1: '8px',
		2: '12px',
		3: '16px',
		4: '20px',
	},
	// 146
	colors: {
		brand: {
			primary: 'rgba(130, 125, 220, 1)',
			secondary: 'rgba(245, 160, 80, 1)',
		},
		primary: {
			base: 'rgba(130, 125, 220, 1)',
			mid: 'rgba(180, 180, 255, 1)',
			light: 'rgba(230, 230, 250, 1)',
		},
		secondary: {
			base: 'rgba(245, 160, 80, 1)',
			light: 'rgba(251, 234, 192, 1)',
		},
		tertiary: {
			base: 'rgba(060, 120, 180, 1)',
		},
		highlight: {
			base: 'rgba(200, 180, 190, 0.6)',
		},
		lowlight: {
			base: 'rgba(100, 000, 000, 1)',
		},
		misc: {
			coral: 'rgba(255, 100, 100, 1)',
		},
		white: {
			base: 'rgba(255, 255, 255, 1.0)',
			0: 'rgba(245, 245, 245, 1.0)',
		},
		black: {
			base: 'rgba(0, 0, 0, 1.0)',
			0: 'rgba(5, 5, 5, 1.0)',
			1: 'rgba(3, 5, 8, 1.0)',
			2: 'rgba(20, 20, 20, 1.0)',
			3: 'rgba(28, 28, 28, 1.0)',
			4: 'rgba(34, 34, 34, 1.0)',
		},
		grey: {
			0: 'rgba(238, 238, 238, 1.0)',
			1: 'rgba(220, 220, 220, 1.0)',
			2: 'rgba(130, 130, 130, 1.0)',
			3: 'rgba(61, 67, 79, 1.0)',
			4: 'rgba(60, 60, 70, 1.0)',
		},
		darkShade: {
			0: 'rgba(5, 5, 5, 0.0)',
			1: 'rgba(5, 5, 5, 0.1)',
			2: 'rgba(5, 5, 5, 0.2)',
			3: 'rgba(5, 5, 5, 0.3)',
			4: 'rgba(5, 5, 5, 0.4)',
			5: 'rgba(5, 5, 5, 0.5)',
			6: 'rgba(5, 5, 5, 0.6)',
			7: 'rgba(5, 5, 5, 0.7)',
			8: 'rgba(5, 5, 5, 0.8)',
			9: 'rgba(5, 5, 5, 0.9)',
			10: 'rgba(5, 5, 5, 1.0)',
		},
		lightShade: {
			0: 'rgba(255, 255, 255, 0.0)',
			1: 'rgba(255, 255, 255, 0.1)',
			2: 'rgba(255, 255, 255, 0.2)',
			3: 'rgba(255, 255, 255, 0.3)',
			4: 'rgba(255, 255, 255, 0.4)',
			5: 'rgba(255, 255, 255, 0.5)',
			6: 'rgba(255, 255, 255, 0.6)',
			7: 'rgba(255, 255, 255, 0.7)',
			8: 'rgba(255, 255, 255, 0.8)',
			9: 'rgba(255, 255, 255, 0.9)',
			10: 'rgba(255, 255, 255, 1.0)',
		},
	},
	typography: {
		fontHeader: '\'Poiret One\', \'Courier New\'',
		fontText: '\'Comfortaa\', \'Courier New\'',
	},
	animations: {
		duration: '0.2s',
		durationLong: '0.3s',
		durationFade: '0.2s',
		headerFadeIn: `
			animation-name: header-element-visibility;
			animation-duration: 2s;
			animation-delay: 0s;
			animation-fill-mode: forwards;

			@at-root .pg-home & {
				animation-delay: 4.5s;
			}

			@keyframes header-element-visibility {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 1;
				}
			}
		`,
	},
	z: {
		navbar: 900,
	},
	components: {},
	mixins: {},
};

Styles.components = {
	...Styles.components,
	spinner: {
		size: '30%',
		thickness: '5px',
		speed: '1s',
		colorSpinner: Styles.colors.grey[1],
		colorTrack: Styles.colors.grey[0],
		thicknessFeature: '8px',
		colorSpinnerFeature: Styles.colors.grey[1],
		colorTrackFeature: Styles.colors.grey[3],
	},
	navbar: {
		height: '50px',
		borderWidth: '7px',
		innerBorderSpacing: '55px',
	},
	landingHeader: {
		logoSize: '50px',
		backgroundImage: 'https://cdn.malyaris.com/photography/sunsets/highres/DSC_7673.jpg',
		frostingClipMobileX: '0vh',
		frostingClipMobileY: '35vh',
		frostingClipDesktopX: '0vh',
		frostingClipDesktopY: '30vh',
	},
};

Styles.mixins = {
	padding: () => `
		margin: 0 auto;

		${Styles.breakpoints.xxs.min(`
			width: ${Styles.breakpoints.xxs.val}px
		`)}

		${Styles.breakpoints.xs.min(`
			width: ${Styles.breakpoints.xs.val}px
		`)}

		${Styles.breakpoints.s.min(`
			width: ${Styles.breakpoints.s.val}px
		`)}

		${Styles.breakpoints.ms.min(`
			width: ${Styles.breakpoints.ms.val}px
		`)}

		${Styles.breakpoints.m.min(`
			width: ${Styles.breakpoints.m.val}px
		`)}

		${Styles.breakpoints.ml.min(`
			width: ${Styles.breakpoints.ml.val}px
		`)}
	`,
	fontHeader: () => `
		font-family: ${Styles.typography.fontHeader};
	`,
	fontText: () => `
		font-family: ${Styles.typography.fontText};
	`,
	pseudoDisplay: () => `
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	`,
	absoluteCentre: () => `
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	`,
	flexCentre: () => `
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	`,
	resetButton: () => `
		border: none;
		padding: 0;
		background: none;
		cursor: pointer;
		outline: none;
	`,
	resetLink: () => `
		color: inherit;
		text-decoration: none;
	`,
	resetList: () => `
		list-style: none;
		padding: 0;
		margin: 0;
	`,
	visuallyHideText: () => `
		font-size: 0;
		color: transparent;
	`,
	headerDecorator: () => `
		display: inline-block;
		position: relative;

		&:before {
			content: "";
			position: absolute;
			height: 10px;
			width: 95%;
			background: ${Styles.colors.brand.highlight};
			left: 10%;
			bottom: 5%;
			z-index: 0;
		}
	`,
	linkDecorator: (parentPadding = '0') => `
		position: relative;
		display: block;
		transition: color 0.5s;

		&:before {
			${Styles.mixins.pseudoDisplay('')}
			left: ${parentPadding}px;
			width: calc(100% - ${parseInt(parentPadding, 10) * 2}px);
			border-bottom: 1px solid ${Styles.colors.black.base};
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
	`,
	panelise: () => `
		padding: 10px 15px;
		border: 1px solid ${Styles.colors.grey[0]};
		box-shadow: ${Styles.spacing[0]} ${Styles.spacing[0]} ${Styles.spacing[1]} -${Styles.spacing[0]} ${Styles.colors.darkShade[5]};
	`,
	fadeIn: (duration = '0.1s') => `
		opacity: 0;
		animation: ${duration} ease-in 0s 1 forwards fade_in;

		@keyframes fade_in {
			0% { opacity: 0; }
			100% { opacity: 1; }
		}
	`,
};

export type StylesContextType = {
    styles: TStyles;
    setTheme: (Theme: TTheme) => void;
};

const defaultStylesContext = {
	styles: {
		...Styles,
		theme: TTheme.Light,
	},
	setTheme: () => null,
};

export const StylesContext = React.createContext<StylesContextType>(defaultStylesContext);
export const useTheme = () => React.useContext(StylesContext);
