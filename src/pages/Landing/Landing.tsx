import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import {
	landingStyles,
	landingTileStyles,
} from './Landing.styles';

import Telescope from '../../assets/icons/telescope-color.svg';
import Compass from '../../assets/icons/compass-color.svg';
import Die from '../../assets/icons/die-color.svg';
import Search from '../../assets/icons/search-color.svg';

const Landing = () => {
	const { styles } = useContext(StylesContext);

	return (
		<div className="pg-home" css={landingStyles(styles)}>
			<NavBar />

			<main>
				<ul css={landingTileStyles(styles)}>
					<li>
						<NavLink to="/search">
							Search
							<img src={Search} alt="search-icon-telescope" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/random">
							Random
							<img src={Die} alt="search-icon-telescope" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/discover">
							Discover
							<img src={Telescope} alt="search-icon-telescope" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/contact">
							contact
							<img src={Compass} alt="search-icon-telescope" />
						</NavLink>
					</li>
				</ul>
			</main>
		</div>
	);
};

export default Landing;