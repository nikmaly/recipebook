/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { Header } from '../Header';
import { NavBar } from '../NavBar';

type ContentProps = {
	title: string;
	children: React.ReactNode;
	stylesProp?: SerializedStyles;
};

const Content: React.FunctionComponent<ContentProps> = ({
	title,
	children,
	stylesProp,
}) => (
	<>
		<NavBar />
		<Header content={<>{title}</>} />

		<main css={stylesProp}>
			{children}
		</main>
	</>
);

export default Content;
