import React, { useContext } from 'react';
import { LandingHeader } from '../../components/LandingHeader';
import { NavBar } from '../../components/NavBar';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import { landingStyles } from './Landing.styles';

const Landing = () => {
	const { styles } = useContext(StylesContext);

	return (
		<div className="pg-home" css={landingStyles(styles)}>
			<LandingHeader />
			<NavBar />
		</div>
	);
};

export default Landing;
