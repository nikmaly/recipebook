/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';

export const testStyles = (): SerializedStyles => css`
	margin: auto;
	max-width: 1240px;
	text-align: center;
`;

export const testStylesColors = (): SerializedStyles => css`
	section {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: center;
		margin: 10px 0;
		padding: 0 50px 20px;
		background: #EEE;
	}

	h2 {
		flex: 0 0 auto;
		margin: 10px 0;
		text-transform: capitalize;
	}

	ul {
		flex: 1 1 auto;
		display: flex;
		flex-flow: row wrap;
		align-content: center;
		justify-content: center;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		flex: 0 0 150px;
		margin: 10px 10px 0;
	}

	p {
		margin: 0;
		padding: 15px 10px;
		font-size: 11px;

		&:nth-of-type(1) {
			margin-bottom: 5px;
			padding: 0;
			text-transform: capitalize;
			font-size: 20px;
		}

		&:nth-of-type(2) {
			padding-bottom: 5px;
		}

		&:nth-of-type(3) {
			padding-top: 5px;
		}
	}
`;
