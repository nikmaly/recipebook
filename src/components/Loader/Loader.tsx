/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import { loaderStyles } from './Loader.styles';

type TLoaderProps = {
	isFullScreen?: boolean;
}

const Loader: React.FunctionComponent<TLoaderProps> = ({
	isFullScreen = false,
}) => {
	const { styles } = useContext(StylesContext);

	return (
		<section css={loaderStyles(styles, isFullScreen)}>
			<div className="spinner" />
		</section>
	);
};

export default Loader;
