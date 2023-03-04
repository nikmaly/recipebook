import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { atomLoadedRecipes } from 'atoms/atomLoadedRecipes';

export const useLoadRecipes = () => {
	const api = Recoil.useRecoilValue(atomApi);
	const [loadedRecipes, setLoadedRecipes] = Recoil.useRecoilState(atomLoadedRecipes);

	const fetchRecipes = (fetchTargets: string[]) => {
		Promise.all(
			fetchTargets.map((recipe) => (
				fetch(`${api.url}/${api.version}/${api.endpoints.recipe}/${recipe}`)
					.then((response) => response.json())
					.then((data) => (
						async () => data.Items.map((item: any) => DynamoDB.Converter.output({ M: item }))[0]
					)()).catch((error) => error)
			)),
		).then((returnedRecipes) => setLoadedRecipes({
			index: [...loadedRecipes.index, ...fetchTargets],
			data: [
				...loadedRecipes.data,
				...returnedRecipes,
			],
		}));
	};

	const sanitiseRequest = (requestedRecipes: string[]) => {
		// Only request recipes not already stored
		const sanitisedRecipeList: string[] = requestedRecipes.filter((recipe) => (
			!loadedRecipes.index.includes(recipe)
		));

		if (sanitisedRecipeList.length > 0) {
			fetchRecipes(sanitisedRecipeList);
		}
	};

	return sanitiseRequest;
};

export default useLoadRecipes;
