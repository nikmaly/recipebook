import React, { useContext } from 'react';
import { NavBar } from '../../components/NavBar';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import { devStyles } from './Dev.styles';

const Dev = () => {
	const { styles } = useContext(StylesContext);

	return (
		<div className="pg-home" css={devStyles(styles)}>
			<NavBar isLanding />
		</div>
	);
};

export default Dev;
