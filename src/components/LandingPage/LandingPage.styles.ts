import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const linkStyles = (styles: TStyles): SerializedStyles => css`
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 1fr;
		column-gap: 20px;
		row-gap: 20px;
		justify-items: center;
		align-items: center;
		list-style: none;
		padding: 0;
		width: 90%;
		max-width: 1440px;
		margin: 20px auto 0;

		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr 1fr;
			column-gap: 50px;
			row-gap: 50px;
		}
	}

	li {
		height: 100%;
		width: 100%;
	}

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100%;
		padding: 20px;
		color: ${styles.colors.black[4]};
		text-decoration: none;
		outline: none;
		transition: box-shadow 0.5s ease-out, background-color 0.5s ease-out;
		font-size: 0.9em;

		@media (min-width: 768px) {
			font-size: 1em;
		}

		&::first-letter {
			text-transform: capitalize;
		}

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
		}

		&:hover,
		&:focus,
		&:active {
			border: none;
			background-color: ${styles.colors.white.base};
			box-shadow:
				-10px -10px 23px 3px ${styles.colors.lightShade[9]},
				-7px -7px 8px 3px ${styles.colors.lightShade[9]},
				10px 10px 23px 3px ${styles.colors.darkShade[2]},
				7px 7px 8px 3px ${styles.colors.darkShade[1]};

			&:after {
				border: 1px solid ${styles.colors.white[0]};
				border-right-color: transparent;
			}
		}

		&:after {
			content: "";
			position: absolute;
			height: 100%;
			width: 100%;
			left: 0;
			bottom: 0;
			border: 1px solid ${styles.colors.grey[0]};
			transition: border 0.5s;
		}
	}
`;
