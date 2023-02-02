import React from 'react';
import Recoil from 'recoil';
import { atomAuthentication } from '../../atoms/atomAuthentication';
import { StylesContext } from '../../context/Styles';
import { ContentPage } from '../../components/ContentPage';
/** @jsxImportSource @emotion/react */
import { loginStyles } from '.';

type TLoginRendererProps = {
	loginUrl: string;
}

const LoginRenderer: React.FunctionComponent<TLoginRendererProps> = ({
	loginUrl,
}) => {
	const { styles } = React.useContext(StylesContext);
	const authData = Recoil.useRecoilValue(atomAuthentication);

	return (
		<ContentPage title="Login">
			<div css={loginStyles(styles)}>
				<h2>Coming Soon</h2>

				{!authData.loginState ? (
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
