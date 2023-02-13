import React from 'react';
import { useNavigate } from 'react-router-dom';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { LoginRenderer } from '.';

const Login = () => {
	const api = Recoil.useRecoilValue(atomApi);
	const [authenticated, requestAuthentication] = useAuthenticated();
	const navigate = useNavigate();
	const loginUrl = `${api.auth.url}/${api.auth.endpoints.login}&client_id=${api.auth.clientId}&redirect_uri=${process.env.NODE_ENV !== 'development' ? 'https://recipebook.malyaris.com/login' : 'http://localhost:3000/login'}`;

	React.useEffect(() => {
		if (!authenticated) {
			requestAuthentication();
		} else {
			navigate('/');
		}
	}, [authenticated]);

	return (
		<LoginRenderer
			loginUrl={loginUrl}
			isLoggedIn={authenticated}
		/>
	);
};

export default Login;
