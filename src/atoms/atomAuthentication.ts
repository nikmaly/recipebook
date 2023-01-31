import { atom } from 'recoil';

export const atomAuthentication = atom({
	key: 'authentication',
	default: {
		url: 'https://auth.malyaris.com/oauth2',
		clientId: '56u2njrnvps7r2dcirvk6otjnl',
		endpoints: {
			login: 'authorize?response_type=code',
			token: 'token',
		},
		error: '',
		loginState: false,
		authentication: {
			auth_token: '',
			access_token: '',
			id_token: '',
			refresh_token: '',
			expires_in: 0,
			token_type: '',
			valid_until: 0,
		},
	},
});
