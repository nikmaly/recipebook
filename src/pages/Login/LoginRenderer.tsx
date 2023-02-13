import React from 'react';
import { StylesContext } from 'context/Styles';
import { ContentPage } from 'middleware/ContentPage';
/** @jsxImportSource @emotion/react */
import { loginStyles } from '.';

type TLoginRendererProps = {
	loginUrl: string;
	isLoggedIn: boolean;
};

const LoginRenderer: React.FunctionComponent<TLoginRendererProps> = ({
	loginUrl,
	isLoggedIn,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<ContentPage title="Login">
			<div css={loginStyles(styles)}>
				{!isLoggedIn ? (
					<a href={loginUrl}>
						Login
					</a>
				) : (
					<p>Logged In.</p>
				)}
			</div>
		</ContentPage>
	);
};

export default LoginRenderer;
