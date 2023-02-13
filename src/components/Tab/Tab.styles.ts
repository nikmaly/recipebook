import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const tabStyles = (styles: TStyles): SerializedStyles => css`
${styles.mixins.resetList('')}
${styles.mixins.fontText('')}
${styles.mixins.panelise('')}
margin: ${styles.spacing[4]} 0;
border: 1px solid ${styles.colors.grey[0]};

> div:not-first-child {
	padding: ${styles.spacing[3]};
}
`;

export const tabButtonStyles = (styles: TStyles): SerializedStyles => css`
flex-flow: column nowrap;
justify-content: space-evenly;
row-gap: ${styles.spacing[0]};

${styles.breakpoints.ms.min(`
	flex-flow: row nowrap;
	justify-content: center;
`)}

img {
	position: relative;
	top: -2px;
	height: ${styles.spacing[4]};
	width: ${styles.spacing[4]};

	${styles.breakpoints.ms.min(`
		margin-right: ${styles.spacing[2]};
	`)}
}
`;

export const tabContentStyles = (styles: TStyles): SerializedStyles => css`
${styles.mixins.fontText('')}
background-color: ${styles.colors.grey[0]};
padding: ${styles.spacing[3]};
`;

export const tabContentWrapperStyles = (
	styles: TStyles,
	split: boolean = false,
): SerializedStyles => css`
display: flex;
flex-flow: row wrap;
justify-content: space-between;
column-gap: 10px;
row-gap: 10px;

> div {
	font-size: 0.9em;
	line-height: 1.8em;

	${split ? (
		'flex: 0 1 calc(50% - 5px);'
	) : (
		'width: 100%;'
	)}
}

h4 {
	margin: 0 0 ${styles.spacing[2]};
	font-size: 1.4em;
	text-transform: capitalize;
}

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
