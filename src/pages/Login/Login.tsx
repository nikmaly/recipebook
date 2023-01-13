import React from 'react';
import { StylesContext } from '../../context/Styles';
import { ContentPage } from '../../components/ContentPage';
/** @jsxImportSource @emotion/react */
import { loginStyles } from './Login.styles';

const Login = () => {
	const { styles } = React.useContext(StylesContext);

	return (
		<ContentPage title="Login">
			<div css={loginStyles(styles)}>
				<h2>Coming Soon</h2>
				{/*
					Check if the right things are here detect login, if not show button, otherwise redirect
				*/}
				<a href="https://auth.malyaris.com/oauth2/authorize?response_type=code&client_id=56u2njrnvps7r2dcirvk6otjnl&redirect_uri=https://recipes.malyaris.com/login">Login</a>
			</div>
		</ContentPage>
	);
};

export default Login;
