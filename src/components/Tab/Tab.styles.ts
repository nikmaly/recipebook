import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from '../../context/Styles';

export const tabStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.resetList('')}
	${styles.mixins.fontText('')}
	margin: ${styles.spacing[4]} 0;
	border: 1px solid ${styles.colors.grey[0]};
	box-shadow: ${styles.spacing[0]} ${styles.spacing[0]} ${styles.spacing[1]} -${styles.spacing[0]} ${styles.colors.darkShade[5]};

	> div:not-first-child {
		padding: ${styles.spacing[3]};
	}
`;

export const tabButtonStyles = (styles: TStyles): SerializedStyles => css`
	img {
		position: relative;
		top: -2px;
		margin-right: ${styles.spacing[1]};
		height: ${styles.spacing[4]};
		width: ${styles.spacing[4]};
	}
`;

export const tabContentStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.fontText('')}
	padding: ${styles.spacing[1]} ${styles.spacing[3]};
	background-color: ${styles.colors.grey[0]};
	font-size: 0.9em;
	line-height: 1.8em;

	ul,
	ol {
		margin: ${styles.spacing[2]} 0;
		padding: 0 ${styles.spacing[4]};
	}

	ul {
		list-style: none;
		padding-left: 0;
	}
`;
