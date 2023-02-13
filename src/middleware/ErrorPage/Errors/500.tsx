import React from 'react';
import { ErrorPage, IGenericErrorProps } from '..';

const Error500: React.FunctionComponent<IGenericErrorProps> = ({
	description,
	content,
}) => (
	<ErrorPage
		code={500}
		title="Unknown Error"
		description={`An unknown server error occurred: ${description}`}
		content={content}
	/>
);

export default Error500;
