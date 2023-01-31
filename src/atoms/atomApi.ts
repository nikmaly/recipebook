import { atom } from 'recoil';

export const atomApi = atom({
	key: 'api',
	default: {
		url: 'https://0hgyyrn329.execute-api.ap-southeast-2.amazonaws.com',
		version: 'v1',
		endpoints: {
			recipe: 'recipes',
			listNames: 'recipes/list/recipeName',
			favourites: 'favourites',
		},
	},
});
