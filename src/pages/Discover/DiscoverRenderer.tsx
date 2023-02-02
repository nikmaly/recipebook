/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StylesContext } from '../../context/Styles';
import { TRecipeData } from '../../components/DataLayer';
// eslint-disable-next-line import/order
import { ContentPage } from 'components/ContentPage';
import { Field } from '../../components/Field';
import { RecipeRow } from '../../components/RecipeRow';
/** @jsxImportSource @emotion/react */
import {
	discoverPageStyles,
	filterContainerStyles,
	resultsContainerStyles,
} from '.';

type TDiscoverRendererProps = {
	inputVal: string;
	// eslint-disable-next-line no-unused-vars
	inputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
	loadedRecipes: TRecipeData[];
}

const DiscoverRenderer: React.FunctionComponent<TDiscoverRendererProps> = ({
	inputVal,
	inputHandler,
	loadedRecipes,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<ContentPage
			title="Discover"
			stylesProp={discoverPageStyles(styles)}
		>
			<section css={filterContainerStyles(styles)}>
				<Field
					labelText="Discover"
					fieldName="discover"
					hasInput={!!inputVal}
				>
					<input
						value={inputVal}
						onChange={(e) => inputHandler(e)}
					/>
				</Field>
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

export default DiscoverRenderer;
