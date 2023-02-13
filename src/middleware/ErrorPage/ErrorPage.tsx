import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBar } from 'components/NavBar';
import { StylesContext } from 'context/Styles';
/** @jsxImportSource @emotion/react */
import { errorPageStyles } from './ErrorPage.styles';

export type IGenericErrorProps = {
	description?: string;
	content?: React.ReactNode;
};

export type IErrorProps = {
	code?: number;
	title?: string;
	description?: string;
	content?: React.ReactNode;
};

const ErrorPage: React.FunctionComponent<IErrorProps> = ({
	code = 500,
	title = 'Unknown Error',
	description,
	content,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<>
			<NavBar />

			<main css={errorPageStyles(styles)}>
				<h1>{code}</h1>

				<h3>{title}</h3>

				<p>{description?.toString()}</p>

				{content && content}

				<p>
					Try pressing back or go to the homepage
					{' '}
					<NavLink to="/">here</NavLink>
				</p>
			</main>
		</>
	);
};

export default ErrorPage;
