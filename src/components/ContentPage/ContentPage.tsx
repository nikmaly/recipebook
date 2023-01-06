/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { NavBar } from '../NavBar';
import { Header } from '../Header';
import { ContentWrapper } from '.';

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

		<ContentWrapper stylesProp={stylesProp}>
			{children}
		</ContentWrapper>
	</>
);

export default Content;
