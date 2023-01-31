/* eslint-disable no-unused-vars */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';
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
	height: 40px;
	width: 40px;
	border-radius: 40%;
	transition: box-shadow 0.2s;

	&:before,
	&:after {
		${styles.mixins.pseudoDisplay('')}
		height: 80%;
		width: 80%;
		left: 10%;
		top: 10%;
		background-size: contain;
		background-repeat: no-repeat;
		transition: opacity 0.2s;
	}

	&:before {
		background-image: url(${HeartAdd});
		opacity: 1;
	}

	&:after {
		background-image: url(${HeartAddAlt});
		opacity: 0.001;
	}

	&:hover,
	&:focus {
		box-shadow: 2px 2px 5px -1px rgba(0,0,0,0.75);
	}

	${selected && `
		&:before {
			opacity: 0.001;
		}

		&:after {
			opacity: 0.5;
		}
	`}
`;
