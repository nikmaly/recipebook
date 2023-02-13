import { atom } from 'recoil';

export const atomApi = atom({
	key: 'api',
	default: {
		url: 'https://0hgyyrn329.execute-api.ap-southeast-2.amazonaws.com',
		version: 'v1',
		endpoints: {
			recipe: 'recipes',
			listByAttribute: 'recipes/list',
			favourites: 'favourites',
		},
		auth: {
			url: 'https://auth.malyaris.com/oauth2',
			clientId: '56u2njrnvps7r2dcirvk6otjnl',
			endpoints: {
				login: 'authorize?response_type=code',
				token: 'token',
			},
		},
	},
});
