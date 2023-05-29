/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { TRecipeData } from 'middleware/DataLayer';
import {
	Chip,
} from '@mui/material';
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
				</div>

				<div css={recipeRowTagStyles(styles)}>
					<ul>
						{
							tags.map((tag, i: number) => (
								<Chip
									key={tag}
									label={tag}
									component="a"
									href={`/discover/${tag}`}
									variant="outlined"
									size="small"
									color={i % 2 ? 'primary' : 'secondary'}
									clickable
								/>
							))
						}
					</ul>
				</div>

				<p css={recipeRowDescriptionStyles(styles)}>{summary || description[0]}</p>
			</div>
		</NavLink>
	);
};

export default RecipeRow;
