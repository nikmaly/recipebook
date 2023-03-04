/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StylesContext } from 'context/Styles';
import { TRecipeData } from 'middleware/DataLayer';
import { ContentPage } from 'middleware/ContentPage';
// import { Field } from 'components/Field';
import { RecipeRow } from 'components/RecipeRow';
/** @jsxImportSource @emotion/react */
import {
	discoverPageStyles,
	filterContainerStyles,
	filterHeaderStyles,
	resultsContainerStyles,
} from '.';

type TPureDiscoverProps = {
	loadedRecipes: TRecipeData[];
	children: React.ReactNode;
}

const PureDiscover: React.FunctionComponent<TPureDiscoverProps> = ({
	loadedRecipes,
	children,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<ContentPage
			title="Discover"
			stylesProp={discoverPageStyles(styles)}
		>

			<section css={filterContainerStyles(styles)}>
				<h3 css={filterHeaderStyles(styles)}>Filters</h3>

				{children}
			</section>

			<section css={resultsContainerStyles(styles)}>
				{loadedRecipes.map((recipe) => (
					<RecipeRow
						key={recipe.recipeName}
						{...recipe}
					/>
				))}
			</section>
		</ContentPage>
	);
};

export default PureDiscover;
