import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Recoil from 'recoil';
import { atomAuthentication } from '../../atoms/atomAuthentication';
import { LoginRenderer } from '.';

const Login = () => {
	const [authData, setAuthData] = Recoil.useRecoilState(atomAuthentication);
	const [searchParams] = useSearchParams();
	const loginUrl = `${authData.url}/${authData.endpoints.login}&client_id=${authData.clientId}&redirect_uri=${process.env.NODE_ENV !== 'development' ? 'https://recipebook.malyaris.com/login' : 'http://localhost:3000/login'}`;

	React.useEffect(() => {
		const code = searchParams.get('code')?.toString() || '';
		const tokenUrl = `${authData.url}/${authData.endpoints.token}`;
		const tokenOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: '*/*',
			},
			body: `grant_type=authorization_code&client_id=${authData.clientId}&code=${code}&redirect_uri=${encodeURIComponent(process.env.NODE_ENV !== 'development' ? 'https://recipebook.malyaris.com/login' : 'http://localhost:3000/login')}`,
		};

		if (!code) { return; }
		// If we're already logged in and the token hasn't expired, don't double up requests
		if (authData.loginState && Date.now() < authData.authentication.valid_until) { return; }

		fetch(tokenUrl, tokenOptions)
			.then((response) => response.json())
			.then((data) => (async () => {
				const currentTime = Date.now();
				await new Promise((resolve) => { setTimeout(resolve, 1000); });

				if (data.error) {
					throw new Error(data.error);
				}

				setAuthData({
					...authData,
					loginState: true,
					authentication: {
						...data,
						auth_token: code,
						valid_until: currentTime + data.expires_in,
					},
				});
			})()).catch((err) => {
				console.warn('error', err);
				setAuthData({
					...authData,
					error: err || 'Unknown Error',
				});
			});
	}, []);

	return (
		<LoginRenderer
			loginUrl={loginUrl}
		/>
	);
};

export default Login;
