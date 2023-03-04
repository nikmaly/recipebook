/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const discoverPageStyles = (styles: TStyles): SerializedStyles => css`
flex: 1 1 auto;
display: flex;
flex-flow: row nowrap;
column-gap: 20px;
max-width: 1200px;
margin: 0 auto;
padding: 0 10px 10px;
text-align: left;
`;

export const filterContainerStyles = (styles: TStyles): SerializedStyles => css`
${styles.mixins.panelise('')}
display: flex;
flex-flow: column nowrap;
flex: 0 0 300px;
height: 100%;
padding: 20px;
`;

export const filterHeaderStyles = (styles: TStyles): SerializedStyles => css`
${styles.typography.h3}
margin: 0;
text-align: left;
`;

export const filterFormStyles = (styles: TStyles): SerializedStyles => css`

`;

export const filterTagWrapperStyles = (styles: TStyles): SerializedStyles => css`
margin-top: ${styles.spacing[6]};
`;

export const filterTagTitleStyles = (styles: TStyles): SerializedStyles => css`
margin: 0 0 ${styles.spacing[0]} 0;
font-size: 0.9em;
text-align: left;
font-family: ${styles.typography.fontText};
text-transform: capitalize;
font-weight: 300;
`;

export const filterTagStyles = (styles: TStyles): SerializedStyles => css`
display: flex;
flex-flow: row wrap;
row-gap: ${styles.spacing[1]};
column-gap: ${styles.spacing[1]};
`;

export const discoverSubmitStyles = (styles: TStyles): SerializedStyles => css`
margin-top: 30px;
`;

export const resultsContainerStyles = (styles: TStyles): SerializedStyles => css`
flex: 1 1 auto;
display: flex;
flex-flow: column wrap;
align-items: center;
row-gap: ${styles.spacing[1]};
height: 100%;
width: 100%;
`;
