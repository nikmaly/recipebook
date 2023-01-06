import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import {
	navbarStyles,
	navbarLogoStyles,
	// navbarLinkStyles,
	navbarLinkMenuWrapperStyles,
	navbarLinkMenuButtonStyles,
	navbarLinkMenuStyles,
} from './NavBar.styles';

const NavBar: React.FunctionComponent = () => {
	const { styles } = useContext(StylesContext);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { pathname } = useLocation();
	const isLanding: boolean = pathname === '/';

	const handleScroll = () => {
		const scrolled = window.pageYOffset > (window.innerHeight - 50) * 0.35;

		if (scrolled) {
			if (!isScrolled) {
				setIsScrolled(true);
			}
		} else if (isScrolled) {
			setIsScrolled(false);
		}
	};

	useEffect(() => {
		const floatingHeader = document.getElementById('floating-navbar');

		if (floatingHeader) {
			// setHeaderOffset(floatingHeader.offsetTop);
			window.addEventListener('scroll', handleScroll);
			// TODO: update offset on resize
		}

		return () => { window.removeEventListener('scroll', handleScroll); };
	}, []);

	// const heroLinks: string[] = [
	// 	'discover',
	// 	'search',
	// 	'random',
	// ];

	const menuLinks: string[] = [
		'login',
		'settings',
		'contact',
	];

	const buildLink = (link: string, key: number) => (
		<li key={key}>
			<NavLink
				to={`/${link}`}
				onClick={() => setMenuOpen(false)}
			>
				{link}
			</NavLink>
		</li>
	);

	return (
		<nav
			css={navbarStyles(styles, isLanding)}
			id="floating-navbar"
		>
			{/* Navbar Logo / Home */}
			<div css={navbarLogoStyles(styles)}>
				<NavLink
					to="/"
					className="v-hidden"
				>
					Home Icon Link
				</NavLink>
			</div>

			{/* Navbar Links - non Landing */}
			{/* { !isLanding && (
				<ul css={navbarLinkStyles(styles)}>
					{ heroLinks.map((link, i) => buildLink(link, i)) }
				</ul>
			)} */}

			{/* Navbar Menu */}
			<div css={navbarLinkMenuWrapperStyles(styles)}>
				<button
					type="button"
					css={navbarLinkMenuButtonStyles(styles, isMenuOpen, isLanding)}
					onClick={() => setMenuOpen(!isMenuOpen)}
				>
					Open Menu
				</button>

				<ul css={navbarLinkMenuStyles(styles, isMenuOpen, isLanding)}>
					{ menuLinks.map((link, i) => buildLink(link, i)) }
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
