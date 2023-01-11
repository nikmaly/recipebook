/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from '../../context/Styles';
import { loadingSkeletonStyles } from './LoadingSkeleton.styles';

type LoadingSkeletonProps = {
};

const LoadingSkeleton: React.FunctionComponent<LoadingSkeletonProps> = () => {
	const { styles } = React.useContext(StylesContext);

	return (
		<div css={loadingSkeletonStyles(styles)} />
	);
};

export default LoadingSkeleton;
