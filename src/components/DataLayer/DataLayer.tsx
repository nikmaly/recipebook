import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { atomRecipeNames } from '../../atoms/atomRecipeNames';
import { Loader } from '../Loader';

type RecipeInfo = {
	prepTime: string,
	cookTime: string,
	difficulty: string,
};

type RecipeIngredients = {
	ingredient: string,
	unit: string,
	amount: string,
};

type RecipeIngredientSections = {
	sectionName: string;
	sectionIngredients: RecipeIngredients[];
};

type RecipeStepSections = {
	sectionName: string;
	sectionSteps: string[];
};

export type TRecipeData = {
	recipeName: string;
	image: string;
	title: string;
	shortDescription: string;
	description: string[];
	data: RecipeInfo;
	tags: string[];
	ingredients: RecipeIngredientSections[];
	stepsSimple: RecipeStepSections[];
	stepsDetailed: RecipeStepSections[];
	furtherInfo: string[];
};

type DataLayerProps = {
	children: React.ReactNode;
};

const DataLayer: React.FunctionComponent<DataLayerProps> = ({
	children,
}) => {
	// eslint-disable-next-line no-unused-vars
	const [recipes, setRecipeNames] = Recoil.useRecoilState(atomRecipeNames);
	const [isLoading, setLoading] = React.useState(true);
	const api = Recoil.useRecoilValue(atomApi);
	const [errors, setErrors] = React.useState([]);

	const fetchRecipeData = () => {
		fetch(`${api.uri}/${api.version}/${api.endpoints.listNames}/`)
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 1000); });
				setLoading(false);
				setRecipeNames(data.Items.map((item: any) => (
					DynamoDB.Converter.output({ M: item }).recipeName
				)));
			})()).catch((_error) => {
				setLoading(false);
				setErrors(_error);
			});
	};

	React.useEffect(() => {
		fetchRecipeData();
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
