import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { StylesContext } from 'context/Styles';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { ContentPage } from 'middleware/ContentPage';
import { Loader } from 'components/Loader';
/** @jsxImportSource @emotion/react */
import { loginStyles } from '.';

const Login = () => {
	const { styles } = React.useContext(StylesContext);
	const api = Recoil.useRecoilValue(atomApi);
	const [authenticated, requestAuthentication] = useAuthenticated();
	const [loading, setLoading] = React.useState<boolean>(true);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const loginUrl = `${api.auth.url}/${api.auth.endpoints.login}&client_id=${api.auth.clientId}&redirect_uri=${process.env.NODE_ENV !== 'development' ? 'https://recipebook.malyaris.com/login' : 'http://localhost:3000/login'}`;

	React.useEffect(() => {
		if (!authenticated) {
			if (searchParams.get('code')?.toString()) {
				requestAuthentication();
			} else {
				window.location.replace(loginUrl);
			}
		} else {
			navigate('/');
		}
	}, [authenticated]);

	React.useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<ContentPage title="Login">
			{loading ? (
				<Loader />
			) : (
				<div css={loginStyles(styles)}>
					{!authenticated ? (
						<a href={loginUrl}>
							Click here if you are not automatically redirected.
						</a>
					) : (
						<p>Logged In.</p>
					)}
				</div>
			)}
		</ContentPage>
	);
};

export default Login;
