/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { StylesContext } from '../../context/Styles';
import { NavBar } from '../NavBar';
import { Header } from '../Header';
import { contentPageContentStyles } from './ContentPage.styles';

type ContentProps = {
	title: string;
	children: React.ReactNode;
	stylesProp?: SerializedStyles;
};

const Content: React.FunctionComponent<ContentProps> = ({
	title,
	children,
	stylesProp,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<>
			<NavBar />
			<Header content={<>{title}</>} />

			<main css={[contentPageContentStyles(styles), stylesProp]}>
				{children}
			</main>
		</>
	);
};

export default Content;
