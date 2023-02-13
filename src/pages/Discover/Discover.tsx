/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { atomRecipeNameList, TRecipeNameList } from 'atoms/atomRecipeNameList';
import { atomRecipeFilterList, TRecipeFilterList } from 'atoms/atomRecipeFilterList';
import { TRecipeData } from 'middleware/DataLayer';
import { PureDiscover } from '.';

export type TFilterFormData = {
	search: string;
	tags: string[];
	ingredients: string[];
};

const Discover = () => {
	const api = Recoil.useRecoilValue(atomApi);
	const recipeNameList: TRecipeNameList = Recoil.useRecoilValue(atomRecipeNameList);
	const recipeFilterList: TRecipeFilterList = Recoil.useRecoilValue(atomRecipeFilterList);
	const [searchInputVal, setsearchInputVal] = React.useState('');
	const [formData, setFormData] = React.useState<TFilterFormData>();
	const [loadedRecipeData, setLoadedRecipeData] = React.useState<TRecipeData[]>([]);
	const {
		register,
		handleSubmit,
		watch,
		formState: {
			errors,
		},
	} = useForm<TFilterFormData>();

	const onSubmit: SubmitHandler<TFilterFormData> = (data) => {
		const sanitisedData: TFilterFormData = {
			search: data.search.trim(),
			tags: data.tags,
			ingredients: data.ingredients,
		};

		setFormData(sanitisedData);
	};

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
		setsearchInputVal(discoverValue);
	};

	React.useEffect(() => {
		console.log(recipeFilterList);
	}, []);

	return (
		<PureDiscover
			searchInputVal={searchInputVal}
			searchInputHandler={handleDiscoverInput}
			loadedRecipes={loadedRecipeData}
		/>
	);
};

export default Discover;
