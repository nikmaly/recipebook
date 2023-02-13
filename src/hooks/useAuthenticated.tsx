import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';

type TStateObject = {
	login_state: boolean,
	auth_token: string,
	access_token: string,
	id_token: string,
	refresh_token: string,
	expires_in: number,
	token_type: string,
	valid_until: number,
}

const emptyAuth = {
	login_state: false,
	auth_token: '',
	access_token: '',
	id_token: '',
	refresh_token: '',
	expires_in: 0,
	token_type: '',
	valid_until: 0,
};

export const useAuthenticated = () => {
	const api = Recoil.useRecoilValue(atomApi);
	const [authData, setAuthData] = React.useState<TStateObject>(emptyAuth);
	const [authenticated, setAuthenticated] = React.useState<boolean>(false);
	const [searchParams] = useSearchParams();

	const logOut = () => {
		// Update State
		setAuthData(emptyAuth);

		// Udpate Session
		// localStorage.setItem(
		// 	'authentication',
		// 	JSON.stringify(emptyAuth),
		// );
	};

	/**
	 * Validates a state object
	 * A negative or zero result represents invalid authentication
	 *
	 * @param {TStateObject} state - the state to validate
	 * @returns {number} - the seconds until expiry
	 */
	const validateStateObject = (state: TStateObject): number => {
		// Check auth exists and isn't explicitly logged out
		if (
			!state
			|| !state.login_state
		) {
			return 0;
		}

		// Check state is complete and valid
		if (
			!state.auth_token
			|| !state.access_token
			|| !state.id_token
			|| !state.refresh_token
			|| !state.expires_in
			|| state.expires_in === 0
			|| !state.token_type
			|| !state.valid_until
			|| state.valid_until === 0
		) {
			return 0;
		}

		// If it passes checks, look at expiry time
		// This will return a positive value for valid,
		// or negative for expired
		return state.valid_until - Date.now();
	};

	/**
	 * Check if the app is in an authenticated state
	 *
	 * @returns {boolean} - state validity
	 */
	const checkAuthentication = (): boolean => {
		// Retrieve session auth source
		const localAuth = localStorage.getItem('authentication')
			? JSON.parse(localStorage.getItem('authentication') || '{}')
			: emptyAuth;

		/*
			We prefer to use state auth, because whilst the app is running
			that is our source of truth. If it's valid, auth is valid.
		*/
		if (validateStateObject(authData) > 0) {
			return true;
		}

		// If state auth isn't valid, try session auth
		if (validateStateObject(localAuth) > 0) {
			setAuthData(localAuth);

			return true;
		}

		// If none of it was valid, formally log out and return false
		logOut();

		return false;
	};

	/**
	 * Request an authentication attempt
	 */
	const requestAuthentication = () => {
		// Check if we're already authed
		if (checkAuthentication()) { return; }

		const code = searchParams.get('code')?.toString() || '';

		// We need an auth code to even attempt authentication
		if (!code) { return; }

		// Exchange the auth token for access tokens
		const tokenUrl = `${api.auth.url}/${api.auth.endpoints.token}`;
		const tokenOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: '*/*',
			},
			body: `grant_type=authorization_code&client_id=${api.auth.clientId}&code=${code}&redirect_uri=${encodeURIComponent(process.env.NODE_ENV !== 'development' ? 'https://recipebook.malyaris.com/login' : 'http://localhost:3000/login')}`,
		};

		fetch(tokenUrl, tokenOptions)
			.then((response) => response.json())
			.then((data) => (async () => {
				// expires_in is measured in seconds, Date is in milliseconds
				const expiryTime = Date.now() + (data.expires_in * 1000);

				if (data.error) {
					throw new Error(data.error);
				}

				const retrievedAuthentication = {
					...data,
					login_state: true,
					auth_token: code,
					valid_until: expiryTime,
				};

				setAuthData({
					...authData,
					...retrievedAuthentication,
				});

				localStorage.setItem(
					'authentication',
					JSON.stringify(retrievedAuthentication),
				);
			})()).catch((err) => {
				if (process.env.NODE_ENV === 'development') {
					console.warn('error', err);
				}
			});
	};

	React.useEffect(() => {
		setAuthenticated(checkAuthentication);
	}, [authData]);

	return [authenticated, requestAuthentication, authData] as const;
};

export default useAuthenticated;
