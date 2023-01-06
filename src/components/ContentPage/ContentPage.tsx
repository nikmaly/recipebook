/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { Header } from '../Header';
import { NavBar } from '../NavBar';
import { ContentWrapper } from '.';
import { Footer } from '../Footer';

type ContentProps = {
	title: string;
	children: React.ReactNode;
	stylesProp?: SerializedStyles;
	navFadeIn?: boolean;
};

const Content: React.FunctionComponent<ContentProps> = ({
	title,
	children,
	stylesProp,
	navFadeIn = false,
}) => (
	<>
		<NavBar shouldFadeIn={navFadeIn} />
		<Header content={<>{title}</>} />

		<ContentWrapper stylesProp={stylesProp}>
			{children}
		</ContentWrapper>

		<Footer />
	</>
);

export default Content;
