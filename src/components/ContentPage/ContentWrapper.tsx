/** @jsxImportSource @emotion/react */
import React from 'react';
import { SerializedStyles } from '@emotion/react';
import { StylesContext } from '../../context/Styles';
import { contentWrapperStyles } from './ContentWrapper.styles';

type ContentWrapperProps = {
	children: React.ReactNode;
	stylesProp?: SerializedStyles;
};

const ContentWrapper: React.FunctionComponent<ContentWrapperProps> = ({
	children,
	stylesProp,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<main css={[contentWrapperStyles(styles), stylesProp]}>
			{children}
		</main>
	);
};

export default ContentWrapper;
