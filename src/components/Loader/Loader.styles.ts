import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const loaderStyles = (
	styles: TStyles,
	isFullScreen: boolean,
): SerializedStyles => css`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${styles.colors.black[1]};

	.spinner {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 15%; // We use padding because percentages calculate on width for it with the circle
		transform: translate(0, 0);
		opacity: 1;

		&:before {
			content: "";
			position: absolute;
			width: 50px;
			height: 50px;
			margin-left: 1px;
			background-image: url("/assets/images/logo-physys.png");
			background-size: contain;
			background-position: center;
			background-repeat: no-repeat;
			opacity: 0.6;
		}

		&:after {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			height: calc(100% - ${styles.components.spinner.thicknessFeature} - ${styles.components.spinner.thicknessFeature});
			width: calc(100% - ${styles.components.spinner.thicknessFeature} - ${styles.components.spinner.thicknessFeature});
			border: ${styles.components.spinner.thicknessFeature} solid ${styles.components.spinner.colorTrackFeature};
			border-top: ${styles.components.spinner.thicknessFeature} solid ${styles.components.spinner.colorSpinnerFeature};
			transform: rotate(30deg);
			border-radius: 50%;

			animation: spinner-spin;
			animation-duration: ${styles.components.spinner.speed};
			animation-timing-function: cubic-bezier(.8, .2, .2, .8);
			animation-iteration-count: infinite;
			animation-fill-mode: forwards;
		}
	}

	${isFullScreen && `
		height: 100%;

		.spinner {
			animation: logo-shrink;
			animation-duration: 1s;
			animation-delay: 2s;
			animation-timing-function: linear;
			animation-fill-mode: forwards;

			&:before {
				width: 70%;
				height: 70%;
				animation: spinner-fade;
				animation-duration: 1s;
				animation-delay: 2s;
				animation-timing-function: ease-out;
				animation-fill-mode: forwards;
			}

			&:after {
				animation-iteration-count: 2;
			}
		}
	`}

	${!isFullScreen && `
		width: 200px;
		height: 200px;
		background: transparent;

		.spinner {
			padding: 20%;

			&:before {
				background-image: url("/assets/images/logo-physys-dark.png");
			}

			&:after {
				height: calc(100% - ${styles.components.spinner.thickness} - ${styles.components.spinner.thickness});
				width: calc(100% - ${styles.components.spinner.thickness} - ${styles.components.spinner.thickness});
				border: ${styles.components.spinner.thickness} solid ${styles.components.spinner.colorTrack};
				border-top: ${styles.components.spinner.thickness} solid ${styles.components.spinner.colorSpinner};
			}
		}
	`}

	@keyframes spinner-spin {
		0% {
			transform: rotate(30deg);
		}

		100% {
			transform: rotate(390deg);
		}
	}

	@keyframes spinner-fade {
		0% {
			opacity: .6;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes logo-shrink {
		0% {
			transform: scale(1);
		}

		100% {
			transform: scale(0);
		}
	}
`;
