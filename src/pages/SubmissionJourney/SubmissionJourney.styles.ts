/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const SubmissionJourneyStyles = (styles: TStyles): SerializedStyles => css`
display: flex;
flex-flow: column nowrap;
margin: 0 auto;
min-height: 100%;
max-width: 700px;
padding-bottom: 30px;
`;

export const SubmissionJourneyFormContentStyles = (styles: TStyles): SerializedStyles => css`
${styles.mixins.panelise('')}
flex: 1 1 auto;
display: flex;
flex-flow: column nowrap;
margin: 30px 0;
padding: 20px;
`;

export const SubmissionJourneyFormGroupStyles = (styles: TStyles): SerializedStyles => css`
display: flex;
flex-flow: row nowrap;
column-gap: 20px;
row-gap: 20px;
justify-content: space-between;
`;
