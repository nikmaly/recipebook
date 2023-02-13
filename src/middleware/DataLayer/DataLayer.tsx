import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { atomRecipeNameList } from 'atoms/atomRecipeNameList';
import { atomRecipeFilterList } from 'atoms/atomRecipeFilterList';
import { Loader } from 'components/Loader';

export type TRecipeMetaData = {
	prepTime: string,
	cookTime: string,
	difficulty: string,
};

export type TRecipeIngredients = {
	ingredient: string,
	unit: string,
	amount: string,
};

export type TRecipeIngredientSections = {
	sectionName: string;
	sectionIngredients: TRecipeIngredients[];
};

export type TRecipeStepSections = {
	sectionName: string;
	sectionSteps: string[];
};

export type TRecipeData = {
	recipeName: string;
	image: string;
	title: string;
	shortDescription: string;
	description: string[];
	metaData: TRecipeMetaData;
	tags: string[];
	ingredients: TRecipeIngredientSections[];
	stepsSimple: TRecipeStepSections[];
	stepsDetailed: TRecipeStepSections[];
	furtherInfo: string[];
};

type DataLayerProps = {
	children: React.ReactNode;
};

const DataLayer: React.FunctionComponent<DataLayerProps> = ({
	children,
}) => {
	const [, setRecipeNameList] = Recoil.useRecoilState(atomRecipeNameList);
	const [, setRecipeFilterList] = Recoil.useRecoilState(atomRecipeFilterList);
	const [isLoading, setLoading] = React.useState(true);
	const api = Recoil.useRecoilValue(atomApi);
	const [errors, setErrors] = React.useState([]);

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
							ingredientSection.sectionIngredients.map((ingredient: any) => (
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
