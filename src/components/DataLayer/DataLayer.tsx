import React from 'react';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { atomRecipeNameList } from '../../atoms/atomRecipeNameList';
import { Loader } from '../Loader';

export type TRecipeInfo = {
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
	data: TRecipeInfo;
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
	// eslint-disable-next-line no-unused-vars
	const [recipeNameList, setRecipeNameList] = Recoil.useRecoilState(atomRecipeNameList);
	const [isLoading, setLoading] = React.useState(true);
	const api = Recoil.useRecoilValue(atomApi);
	const [errors, setErrors] = React.useState([]);

	const fetchRecipeData = () => {
		fetch(`${api.uri}/${api.version}/${api.endpoints.listNames}/`)
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 1000); });
				setLoading(false);
				setRecipeNameList(data.Items.map((item: any) => (
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
