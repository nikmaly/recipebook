/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { atomRecipeNameList, TRecipeNameList } from '../../atoms/atomRecipeNameList';
import { TRecipeData } from '../../components/DataLayer';
import { DiscoverRenderer } from '.';

const Discover = () => {
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
		setInputVal(discoverValue);
	};

	return (
		<DiscoverRenderer
			inputVal={inputVal}
			inputHandler={handleDiscoverInput}
			loadedRecipes={loadedRecipeData}
		/>
	);
};

export default Discover;
