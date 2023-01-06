/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import { loadingSkeletonStyles } from './LoadingSkeleton.styles';

type LoadingSkeletonProps = {
};

const LoadingSkeleton: React.FunctionComponent<LoadingSkeletonProps> = () => {
	const { styles } = useContext(StylesContext);

	return (
		<div css={loadingSkeletonStyles(styles)} />
	);
};

export default LoadingSkeleton;
