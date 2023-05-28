/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TRecipeData } from 'middleware/DataLayer';
import { Pill } from 'components/Pill';
import { StylesContext } from 'context/Styles';
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
	recipeName,
	image,
	title,
	description,
	summary,
	tags,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<NavLink
			css={recipeRowStyles(styles)}
			to={`/recipe/${recipeName}`}
		>
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
										href={`/discover/${tag}`}
										theme={i % 2 ? 'secondary' : 'primary'}
										compact
									/>
								))
							}
						</ul>
					</div>
				</div>

				<p css={recipeRowDescriptionStyles(styles)}>{summary || description[0]}</p>
			</div>
		</NavLink>
	);
};

export default RecipeRow;
