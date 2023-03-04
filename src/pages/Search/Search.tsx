/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Recoil from 'recoil';
import { atomLoadedRecipes } from 'atoms/atomLoadedRecipes';
import { atomRecipeNameList, TRecipeNameList } from 'atoms/atomRecipeNameList';
import { useLoadRecipes } from 'hooks/useLoadRecipes';
import { TRecipeData } from 'middleware/DataLayer';
import { ContentPage } from 'middleware/ContentPage';
import { Field } from 'components/Field';
import { RecipeRow } from 'components/RecipeRow';
import { StylesContext } from 'context/Styles';
/** @jsxImportSource @emotion/react */
import {
	searchPageStyles,
	searchPageFieldContainerStyles,
	searchPageContentContainerStyles,
} from './Search.styles';

const Search = () => {
	const { styles } = React.useContext(StylesContext);
	const recipeNameList: TRecipeNameList = Recoil.useRecoilValue(atomRecipeNameList);
	const loadedRecipes = Recoil.useRecoilValue(atomLoadedRecipes);
	const [searchTerm, setSearchTerm] = React.useState<string>(sessionStorage.getItem('searchTerm') || '');
	const [displayedRecipes, setDisplayedRecipes] = React.useState<TRecipeData[]>([]);
	const loadRecipes = useLoadRecipes();

	React.useEffect(() => {
		const sanitisedSearchTerm = searchTerm.toLowerCase().trim();

		if (!sanitisedSearchTerm) {
			setDisplayedRecipes([]);
		} else if (sanitisedSearchTerm && sanitisedSearchTerm.length > 2) {
			setDisplayedRecipes(
				loadedRecipes.data.filter((recipe) => (
					recipe.recipeName.includes(sanitisedSearchTerm)
				)),
			);
		}
	}, [loadedRecipes, searchTerm]);

	React.useEffect(() => {
		const sanitisedSearchTerm = searchTerm.toLowerCase().trim();

		sessionStorage.setItem('searchTerm', sanitisedSearchTerm);

		if (searchTerm.length > 2) {
			const targets = recipeNameList.filter((recipeName) => (
				recipeName.includes(sanitisedSearchTerm)
			));

			loadRecipes(targets);
		}
	}, [searchTerm]);

	return (
		<ContentPage
			title="Search"
			stylesProp={searchPageStyles(styles)}
		>
			<div css={searchPageFieldContainerStyles(styles)}>
				<Field
					labelText="Search"
					fieldName="search"
					hasInput={!!searchTerm}
				>
					<input
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.currentTarget.value)}
					/>
				</Field>
			</div>

			{ displayedRecipes && displayedRecipes.length > 0 && (
				<div css={searchPageContentContainerStyles(styles)}>
					{displayedRecipes.map((recipe) => <RecipeRow {...recipe} key={recipe.recipeName} />)}
				</div>
			)}
		</ContentPage>
	);
};

export default Search;
