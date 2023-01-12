/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { TRecipeData } from '../DataLayer';
import { Pill } from '../Pill';
import { StylesContext } from '../../context/Styles';
import {
	recipeRowStyles,
	recipeRowImageStyles,
	recipeRowContentStyles,
	recipeRowHeaderStyles,
	recipeRowTitleStyles,
	recipeRowTagStyles,
	recipeRowDescriptionStyles,
} from './RecipeRow.styles';

const RecipeRow: React.FunctionComponent<TRecipeData> = ({
	image,
	title,
	description,
	shortDescription,
	tags,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<div css={recipeRowStyles(styles)}>
			<div css={recipeRowImageStyles(styles, image)} />


			<div css={recipeRowContentStyles(styles)}>
				<div css={recipeRowHeaderStyles(styles)}>
					<h4 css={recipeRowTitleStyles(styles)}>{title}</h4>

					<div css={recipeRowTagStyles(styles)}>
						<ul>
							{
								tags.map((tag, i) => (
									<Pill
										key={tag}
										text={tag}
										href={`/tags/${tag}`}
										theme={i % 2 ? 'secondary' : 'primary'}
										compact
									/>
								))
							}
						</ul>
					</div>
				</div>

				<p css={recipeRowDescriptionStyles(styles)}>{shortDescription || description[0]}</p>
			</div>
		</div>
	);
};

export default RecipeRow;
