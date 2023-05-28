import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { atomRecipeNameList } from 'atoms/atomRecipeNameList';
import { atomRecipeFilterList } from 'atoms/atomRecipeFilterList';
import {
	atomMetaData,
	TMetaTags,
} from 'atoms/atomMetaData';
import { Loader } from 'components/Loader';

type TSantitisedMetaDDB = {
	type: string,
	content: string[],
};

export type TRecipeMetaData = {
	prepTime: number,
	cookTime: number,
	difficulty: number,
};

export type TRecipeIngredients = {
	ingredient: string,
	unit: string,
	amount: string,
};

export type TRecipeSections = {
	sectionName: string;
	sectionItems: string[] | TRecipeIngredients[];
};

export type TRecipeData = {
	recipeName: string;
	image: string;
	title: string;
	summary: string;
	description: string;
	metaData: TRecipeMetaData;
	tags: string[];
	ingredients: TRecipeSections[];
	method: TRecipeSections[];
	furtherInfo: string;
};

export type TRecipeDataKeys = keyof TRecipeData;

type DataLayerProps = {
	children: React.ReactNode;
};

const DataLayer: React.FunctionComponent<DataLayerProps> = ({
	children,
}) => {
	const [, setRecipeNameList] = Recoil.useRecoilState(atomRecipeNameList);
	const [, setRecipeFilterList] = Recoil.useRecoilState(atomRecipeFilterList);
	const [metadata, setMetadata] = Recoil.useRecoilState(atomMetaData);
	const [isLoading, setLoading] = React.useState(true);
	const api = Recoil.useRecoilValue(atomApi);
	const [errors, setErrors] = React.useState([]);

	const fetchRecipeMetaData = () => {
		fetch(`${api.url}/${api.version}/${api.endpoints.data}/`)
			.then((response) => response.json())
			.then((data) => (async () => {
				const sanitisedData: TSantitisedMetaDDB[] = data.Items.map((item: any) => (
					DynamoDB.Converter.output({ M: item })
				));

				const outputData: TMetaTags = sanitisedData.reduce(
					(previous: TMetaTags, item: TSantitisedMetaDDB) => (
						{
							...previous,
							[item.type]: item.content,
						}
					),
					{},
				);

				setMetadata({
					tags: {
						...metadata.tags,
						...outputData,
					},
				});
			})()).catch((_error) => {
				setErrors(_error);
			});
	};

	const fetchRecipeNameData = () => {
		fetch(`${api.url}/${api.version}/${api.endpoints.listByAttribute}/recipeName,tags,ingredients/`)
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 1000); });

				const recipeNameItems = data.Items.map((item: any) => (
					DynamoDB.Converter.output({ M: item }).recipeName
				));

				let recipeFilterItems = data.Items.map((item: any) => (
					DynamoDB.Converter.output({ M: item })
				));

				recipeFilterItems = recipeFilterItems.map((recipe: any) => {
					const sanitisedRecipe = recipe;

					sanitisedRecipe.ingredients = sanitisedRecipe.ingredients.map(
						(ingredientSection: any) => (
							ingredientSection.sectionItems.map((ingredient: any) => (
								ingredient.ingredient
							))
						),
					).flat();

					return sanitisedRecipe;
				});

				setRecipeNameList(recipeNameItems);
				setRecipeFilterList(recipeFilterItems);

				setLoading(false);
			})()).catch((_error) => {
				setLoading(false);
				setErrors(_error);
			});
	};

	React.useEffect(() => {
		fetchRecipeMetaData();
		fetchRecipeNameData();
	}, []);

	return (
		<>
			{ isLoading && <Loader /> }

			{ !isLoading && errors.length !== 0 && (
				<>
					<h3>Uh-oh, an error has happened.</h3>
					{
						errors.length > 0
							? errors.forEach((error) => <p>{error}</p>)
							: <p>Could not find this recipe.</p>
					}
				</>
			)}

			{ !isLoading && errors.length < 1 && children }
		</>
	);
};

export default DataLayer;
