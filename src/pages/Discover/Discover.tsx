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
	discoverPageStyles,
	filterContainerStyles,
	resultsContainerStyles,
} from './Discover.styles';

const Discover = () => {
	const { styles } = React.useContext(StylesContext);
	const api = Recoil.useRecoilValue(atomApi);
	const recipeNameList: TRecipeNameList = Recoil.useRecoilValue(atomRecipeNameList);
	const [inputVal, setInputVal] = React.useState('');
	const [loadedRecipeData, setLoadedRecipeData] = React.useState<TRecipeData[]>([]);

	const fetchRecipes = (recipes: string[]) => {
		Promise.all(
			recipes.map((recipe) => (
				fetch(`${api.url}/${api.version}/${api.endpoints.recipe}/${recipe}`)
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

	const handleDiscoverInput = (e: React.FormEvent<HTMLInputElement>) => {
		// TODO: debounce
		const discoverValue = e.currentTarget.value;
	};

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
						onChange={(e) => handleDiscoverInput(e)}
					/>
				</Field>
			</section>

			<section css={resultsContainerStyles(styles)}>
				{loadedRecipeData.map((recipe) => <RecipeRow {...recipe} key={recipe.recipeName} />)}
			</section>
		</ContentPage>
	);
};

export default Discover;
