import { atom } from 'recoil';
import { TRecipeData } from 'middleware/DataLayer';

export const atomLoadedRecipes = atom({
	key: 'loadedRecipes',
	default: {
		index: [] as string[],
		data: [] as TRecipeData[],
	},
});
