/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import { exampleStyles } from './Example.styles';

const Example = () => {
	const { styles } = useContext(StylesContext);

	return (
		<div css={exampleStyles(styles)} />
	);
};

export default Example;
