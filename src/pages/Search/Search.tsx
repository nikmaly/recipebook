/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { atomRecipeNameList, TRecipeNameList } from '../../atoms/atomRecipeNameList';
import { TRecipeData } from '../../components/DataLayer';
import { ContentPage } from '../../components/ContentPage';
import { Field } from '../../components/Field';
import { RecipeRow } from '../../components/RecipeRow';
import { StylesContext } from '../../context/Styles';
/** @jsxImportSource @emotion/react */
import {
	searchPageStyles,
	searchPageFieldContainerStyles,
	searchPageContentContainerStyles,
} from './Search.styles';

const Search = () => {
	const { styles } = React.useContext(StylesContext);
	const api = Recoil.useRecoilValue(atomApi);
	const recipeNameList: TRecipeNameList = Recoil.useRecoilValue(atomRecipeNameList);
	const [inputVal, setInputVal] = React.useState('');
	const [loadedRecipeData, setLoadedRecipeData] = React.useState<TRecipeData[]>([]);

	const fetchRecipes = (recipes: string[]) => {
		Promise.all(
			recipes.map((recipe) => (
				fetch(`${api.uri}/${api.version}/${api.endpoints.getRecipe}/${recipe}`)
					.then((response) => response.json())
					.then((data) => (
						async () => data.Items.map((item: any) => DynamoDB.Converter.output({ M: item }))[0]
					)()).catch((error) => error)
			)),
		).then((returnedRecipes) => setLoadedRecipeData([
			...loadedRecipeData,
			...returnedRecipes,
		]));
	};

	const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
		// TODO: debounce
		const searchValue = e.currentTarget.value;
		let matches: TRecipeNameList = [];
		let matchesToQuery: TRecipeNameList = [];

		setInputVal(searchValue);

		// Check the recipe list for any matches against the search value
		// Reminder that this is using the ID - recipeName, NOT title
		matches = searchValue === ''
			? []
			: recipeNameList.filter((recipe) => recipe.includes(searchValue.replaceAll(' ', '-')));

		// Remove any recipes in loadedRecipeData if they are no longer a match
		const updatedRecipeData = matches.length > 0
			? loadedRecipeData.filter((recipe) => (
				matches.includes(recipe.recipeName)
			)) : [];
		setLoadedRecipeData(updatedRecipeData);

		if (searchValue.length > 2 && matches.length > 0) {
			// Filter out recipes in matches if it already exists in loadedRecipeData
			matchesToQuery = loadedRecipeData.length > 0
				? matchesToQuery = matches?.filter((match) => (
					loadedRecipeData.filter((recipe) => (
						recipe.recipeName === match
					)).length === 0
				)) : matches;

			// If there are matches that don't exist in loadedRecipes, fetch them
			if (matchesToQuery.length > 0) {
				fetchRecipes(matchesToQuery);
			}
		}
	};

	return (
		<ContentPage
			title="Search"
			stylesProp={searchPageStyles(styles)}
		>
			<div css={searchPageFieldContainerStyles(styles)}>
				<Field
					labelText="Search"
					fieldName="search"
					hasInput={!!inputVal}
				>
					<input
						value={inputVal}
						onChange={(e) => handleSearchInput(e)}
					/>
				</Field>
			</div>

			{ loadedRecipeData && loadedRecipeData.length > 0 && (
				<div css={searchPageContentContainerStyles(styles)}>
					{loadedRecipeData.map((recipe) => <RecipeRow {...recipe} key={recipe.recipeName} />)}
				</div>
			)}
		</ContentPage>
	);
};

export default Search;
