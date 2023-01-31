import React from 'react';
import Recoil from 'recoil';
import { atomAuthentication } from '../atoms/atomAuthentication';

export const useAuthenticated = () => {
	const [authData, setAuthData] = Recoil.useRecoilState(atomAuthentication);
	const [isAuthenticated, setAuthenticated] = React.useState<boolean>(false);

	const logOutHandler = () => {
		setAuthData({
			...authData,
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
		});

		localStorage.setItem('authentication', '');
	};

	// If the app thinks we should be logged in and we have credentials, attempt to do so
	const updateAuthentication = () => {
		// TODO:
		// Attempt to acquire new tokens

		// If success, update auth obect and set auth to true
		// FIXME:
		setAuthenticated(false);

		// Else set auth to false
	};

	const checkAuthentication = () => {
		const auth = authData.authentication;
		const authExpired = Date.now() < (auth.valid_until || 0);
		const authPopulated = !!auth.auth_token
			&& !!auth.access_token
			&& !!auth.id_token
			&& !!auth.refresh_token
			&& !!auth.expires_in
			&& !!auth.token_type
			&& !!auth.valid_until;

		// If we're not supposed to be logged in, or we're in an invalid state,
		// log out and reset authentication state
		if (
			!authData.loginState
			|| !authPopulated
		) {
			logOutHandler();
			return;
		}

		// If auth is expired, update it
		if (authExpired) {
			updateAuthentication();
			return;
		}

		// Otherwise if everything is good, we're logged in
		setAuthenticated(true);
	};

	React.useEffect(() => {
		checkAuthentication();
	}, []);

	return isAuthenticated;
};

export default useAuthenticated;
