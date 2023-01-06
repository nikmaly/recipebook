import React from 'react';
import { ErrorPage, IGenericErrorProps } from '..';

const Error405: React.FunctionComponent<IGenericErrorProps> = ({
	description,
	content,
}) => (
	<ErrorPage
		code={500}
		title={'You don\'t have access to this page.'}
		description={description}
		content={content}
	/>
);

export default Error405;
