/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { StylesContext } from 'context/Styles';
import { TRecipeData } from 'middleware/DataLayer';
import { ContentPage } from 'middleware/ContentPage';
import { Field } from 'components/Field';
import { RecipeRow } from 'components/RecipeRow';
/** @jsxImportSource @emotion/react */
import {
	discoverPageStyles,
	filterContainerStyles,
	resultsContainerStyles,
} from '.';

type TPureDiscoverProps = {
	searchInputVal: string;
	// eslint-disable-next-line no-unused-vars
	searchInputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
	loadedRecipes: TRecipeData[];
}

const PureDiscover: React.FunctionComponent<TPureDiscoverProps> = ({
	searchInputVal,
	searchInputHandler,
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
					labelText="Search"
					fieldName="search"
					hasInput={!!searchInputVal}
				>
					<input
						value={searchInputVal}
						onChange={(e) => searchInputHandler(e)}
					/>
				</Field>

				<fieldset>
					<div>
						<Field
							labelText="Tags"
							fieldName="tags"
							hasInput={false}
						>
							<input type="checkbox" id="scales" name="scales" />
							<input type="checkbox" id="scales" name="scales" />
							<input type="checkbox" id="scales" name="scales" />
						</Field>
					</div>
				</fieldset>
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
