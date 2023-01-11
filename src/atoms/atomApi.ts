import { atom } from 'recoil';

export const atomApi = atom({
	key: 'api',
	default: {
		uri: 'https://0hgyyrn329.execute-api.ap-southeast-2.amazonaws.com',
		version: 'v1',
		endpoints: {
			getRecipe: 'recipes',
			listNames: 'recipes/list/recipeName',
		},
	},
});
