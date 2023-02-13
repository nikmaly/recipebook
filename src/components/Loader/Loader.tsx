/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import { loaderStyles } from './Loader.styles';

type TLoaderProps = {
	isFullScreen?: boolean;
}

const Loader: React.FunctionComponent<TLoaderProps> = ({
	isFullScreen = false,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<section css={loaderStyles(styles, isFullScreen)}>
			<div className="spinner" />
		</section>
	);
};

export default Loader;
