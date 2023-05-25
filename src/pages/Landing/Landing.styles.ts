import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const landingStyles = (styles: TStyles): SerializedStyles => css`
	height: 100%;
	width: 100%;
	background: ${styles.colors.white.base};

	main {
		height: 100vh;
	}
`;

export const landingTileStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetList('')}
	height: 100%;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr 1fr 1fr 1fr;
	overflow: hidden;

	${styles.breakpoints.ms.min(`
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		column-gap: 20px;
		row-gap: 20px;
		padding: 10px 20px 20px 20px;
	`)}

	li {
		a {
			${styles.mixins.resetLink('')}
			${styles.mixins.visuallyHideText('')}
			display: block;
			position: relative;
			height: 100%;
			width: 100%;
			text-transform: capitalize;
			letter-spacing: 2px;
			background: ${styles.colors.white[0]};
			cursor: pointer;
			transition:
				box-shadow 0.4s,
				background 0.2s,
				filter 0.8s,
				background 0.6s;

			${styles.breakpoints.ms.min(`
				filter: grayscale(1);
			`)}

			&:hover {
				filter: grayscale(0);
				background: ${styles.colors.grey[0]};

				img {
					transform: scale(1.1) translateX(-50%) translateY(-50%);
				}
			}

			img {
				${styles.mixins.absoluteCentre('')}
				height: 100px;
				width: 100px;
				transform: scale(1) translateX(-50%) translateY(-50%);
				transform-origin: 0 0;
				transition: transform 0.6s;

				${styles.breakpoints.ms.min(`
					height: 150px;
					width: 150px;
				`)}
			}
		}

		${styles.breakpoints.ms.min(`
			&:nth-of-type(1) a {
				border-top-right-radius: 100px;
				border-bottom-left-radius: 100px;

				&:hover {
					background: ${styles.colors.primary.light};
				}
			}

			&:nth-of-type(2) a {
				border-top-left-radius: 100px;
				border-bottom-right-radius: 100px;

				&:hover {
					background: ${styles.colors.secondary.light};
				}
			}

			&:nth-of-type(3) a {
				border-top-left-radius: 100px;
				border-bottom-right-radius: 100px;

				&:hover {
					background: ${styles.colors.secondary.light};
				}
			}

			&:nth-of-type(4) a {
				border-top-right-radius: 100px;
				border-bottom-left-radius: 100px;

				&:hover {
					background: ${styles.colors.primary.light};
				}
			}
		`)}
	}
`;
