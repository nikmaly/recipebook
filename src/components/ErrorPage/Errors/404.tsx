import React from 'react';
import { ErrorPage, IGenericErrorProps } from '..';

const Error404: React.FunctionComponent<IGenericErrorProps> = ({
	description,
	content,
}) => (
	<ErrorPage
		code={404}
		title={'This page doesn\'t seem to exist.'}
		description={description}
		content={content}
	/>
);

export default Error404;
