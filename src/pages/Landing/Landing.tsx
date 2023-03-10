import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavBar } from 'components/NavBar';
import { StylesContext } from 'context/Styles';
/** @jsxImportSource @emotion/react */
import {
	landingStyles,
	landingTileStyles,
} from './Landing.styles';

import Telescope from '../../assets/icons/telescope-color.svg';
import Heart from '../../assets/icons/heart-color.svg';
import Die from '../../assets/icons/die-color.svg';
import Search from '../../assets/icons/search-color.svg';

const Landing = () => {
	const { styles } = React.useContext(StylesContext);

	return (
		<div className="pg-home" css={landingStyles(styles)}>
			<NavBar />

			<main>
				<ul css={landingTileStyles(styles)}>
					<li>
						<NavLink to="/search">
							Search
							<img src={Search} alt="search-icon-search" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/random">
							Random
							<img src={Die} alt="search-icon-dice" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/discover">
							Discover
							<img src={Telescope} alt="search-icon-telescope" />
						</NavLink>
					</li>
					<li>
						<NavLink to="/favourites">
							Favourites
							<img src={Heart} alt="search-icon-heart" />
						</NavLink>
					</li>
				</ul>
			</main>
		</div>
	);
};

export default Landing;
