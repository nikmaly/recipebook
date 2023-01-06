import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const accordionStyles = (styles: TStyles): SerializedStyles => css`
color: #555;

h3 {
	margin: 0;
}

ul {
	list-style-type: none;
	padding: 0;

	li {
		margin: 3px 0;
		position: relative;

		a {
			display: block;
			position: relative;
			padding: 20px;
			text-decoration: none;
			color: #333;
			font-weight: bold;
			background-color: ${styles.colors.grey[0]};
		}

		&:hover,
		&:focus,
		&:active {
			background-color: #DDD;
		}

		a:before {
			position: absolute;
			width: 30px;
			height: 30px;
			right: 1em;
			top: 50%;
			content: "";
			transform: translate(0, -50%);
			background-position: 50% 50%;
			background-repeat: no-repeat;
			background-image: url("/assets/images/svg/accordion-closed-plus.svg");
			background-size: 15px;
			opacity: 1;

			:target {
				opacity: 0;
			}
		}

		a:before:target {
			opacity: 0;
		}

		a:target:before {
			opacity: 0;
		}

		a:after {
			position: absolute;
			width: 30px;
			height: 30px;
			right: 1em;
			top: 50%;
			content: "";
			transform: translate(0, -50%);
			background-position: 50% 50%;
			background-repeat: no-repeat;
			background-image: url("/assets/images/svg/accordion-open-minus.svg");
			background-size: 15px;
			opacity: 0;
		}

		a::after:target {
			opacity: 1;
		}

		// Max Height is used here because transitions on auto heights don't work
		.accordion-content {
			background-color: #FAFAFA;
			overflow: hidden;
			padding: 0px 20px;
			max-height: 0px;
			transition: max-height 0.5s;
			overflow: scroll;
		}

		.accordion-content:target {
			padding: 10px 20px;
			max-height: 300px;
			overflow-y: scroll;
			transition: max-height 2s;
		}

		p {
			padding: 0;
			margin: 0;
			margin-top: 10px;
		}
	}
}
`;
