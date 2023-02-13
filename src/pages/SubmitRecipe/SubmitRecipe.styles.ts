/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { css, SerializedStyles } from '@emotion/react';
import { TStyles } from 'context/Styles';

export const submitRecipeStyles = (styles: TStyles): SerializedStyles => css`
	padding-bottom: 30px;
`;

export const submitRecipeFormWrapperStyles = (styles: TStyles): SerializedStyles => css`
	${styles.mixins.panelise('')}
	max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

export const submitRecipeFormStyles = (styles: TStyles): SerializedStyles => css`
	max-width: 500px;
	margin: 0 auto;
`;

export const submitRecipeFormGroupStyles = (styles: TStyles): SerializedStyles => css`
	display: flex;
    flex-flow: row nowrap;
    column-gap: 20px;
    row-gap: 20px;
    justify-content: space-between;
`;
