/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { SerializedStyles } from '@emotion/react';
import { StylesContext } from '../../context/StylesContext';
import { contentWrapperStyles } from './ContentWrapper.styles';

type ContentWrapperProps = {
	children: React.ReactNode;
	stylesProp?: SerializedStyles;
};

const ContentWrapper: React.FunctionComponent<ContentWrapperProps> = ({
	children,
	stylesProp,
}) => {
	const { styles } = useContext(StylesContext);

	return (
		<main css={[stylesProp, contentWrapperStyles(styles)]}>
			{children}
		</main>
	);
};

export default ContentWrapper;
