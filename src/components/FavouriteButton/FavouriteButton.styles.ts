/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { lighten } from 'polished';
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';
import HeartAdd from '../../assets/icons/heart-add.svg';
import HeartAddAlt from '../../assets/icons/heart-add-secondary.svg';

export const favouriteButtonStyles = (
	styles: TStyles,
	selected: boolean = false,
): SerializedStyles => css`
	${styles.mixins.resetButton('')}
	position: relative;
	font-size: 0;
	color: transparent;
	height: 50px;
	width: 50px;
	border-radius: 50%;
	border: 2px dotted transparent;
	transition:
		box-shadow 0.45s,
		border 0.2s;

	&:before,
	&:after {
		${styles.mixins.pseudoDisplay('')}
		height: 60%;
		width: 60%;
		left: 20%;
		top: 20%;
		background-size: contain;
		background-repeat: no-repeat;
		transform: scale(0.9);
		transition:
			opacity 0.4s,
			transform 0.4s;
	}

	&:before {
		background-image: url(${HeartAdd});
		opacity: 1;
	}

	&:after {
		background-image: url(${HeartAddAlt});
		opacity: 0.001;
	}

	&:hover {
		box-shadow:
			0
			0
			20px
			-5px
			'rgb(0 0 0 / 50%)';

		&:before,
		&:after {
			transform: scale(1);
		}
	}

	${selected && `
		border: 2px dotted ${lighten(0.25, styles.colors.misc.coral)};

		// &:before,
		// &:after {
		// 	transform: scale(1);
		// }

		&:before {
			opacity: 0.001;
		}

		&:after {
			opacity: 0.5;
		}
	`}
`;
