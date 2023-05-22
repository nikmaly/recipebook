/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';
import TrashLight from '../../assets/icons/trash-light.svg';
import TrashDark from '../../assets/icons/trash-dark.svg';

export const favouritesStyles = (styles: TStyles): SerializedStyles => css`
padding-bottom: 30px;
`;

export const favouritesRowStyles = (styles: TStyles): SerializedStyles => css`
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
`;

export const favouritesDeleteStyles = (styles: TStyles): SerializedStyles => css`
${styles.mixins.resetButton('')}
flex: 0 0 50px;
margin-right: ${styles.spacing[1]};
height: 50px;
border-radius: 15px;
background-size: 30px;
background-repeat: no-repeat;
background-position: center;
background-image: url(${TrashLight});
background-color: ${styles.colors.white.base};
font-size: 0px;
color: transparent;
transition: background-image 0.3s, background-color 0.5s;

&:hover,
&:focus {
	background-image: url(${TrashDark});
	background-color: ${styles.colors.grey[0]};
}
`;
