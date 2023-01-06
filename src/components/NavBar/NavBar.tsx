import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import {
	navbarStyles,
	navbarLogoStyles,
	navbarLinkDesktopStyles,
	navbarLinkMobileStyles,
	navbarLinkMobileButtonStyles,
	navbarLinkMobileNavStyles,
} from './NavBar.styles';

type NavbarProps = {
	isLanding?: boolean
	shouldFadeIn?: boolean
}

const NavBar: React.FunctionComponent<NavbarProps> = ({
	isLanding = false,
	shouldFadeIn = false,
}) => {
	const { styles } = useContext(StylesContext);
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const { pathname } = useLocation();
	const sanitisedIsLanding: boolean = pathname === '/' || isLanding;

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

	const linkData: Record<string, string>[] = [
		{
			title: 'Gallery',
			path: '/gallery',
		},
		{
			title: 'Prints',
			path: '/prints',
		},
		{
			title: 'Contact',
			path: '/contact',
		},
	];

	const buildLink = (link: Record<string, string>, key: number) => (
		<li key={key}>
			<NavLink
				to={link.path}
				onClick={() => setMenuOpen(false)}
			>
				{link.title}
			</NavLink>
		</li>
	);

	const links = (
		<ul>
			{ linkData.map((link, i) => buildLink(link, i)) }

			<li>
				<a
					href="https://nik.malyaris.com"
					target="_blank"
					rel="noreferrer"
				>
					About
				</a>
			</li>
		</ul>
	);

	return (
		<nav
			css={navbarStyles(styles, isScrolled, sanitisedIsLanding, shouldFadeIn)}
			id="floating-navbar"
		>
			{/* Navbar Logo / Home */}
			<div css={navbarLogoStyles(styles, sanitisedIsLanding)}>
				{/* <NavLink to="/" /> */}
				<a href="https://photography.malyaris.com" className="v-hidden">
					Home Icon Link
				</a>
			</div>

			{/* Navbar Links - Desktop */}
			<div css={navbarLinkDesktopStyles(styles, sanitisedIsLanding)}>
				{links}
			</div>

			{/*
				Navbar Links - Mobile
				We use the desktop links on non-landing pages
			*/}
			{sanitisedIsLanding && (
				<div css={navbarLinkMobileStyles(styles)}>
					<nav
						css={navbarLinkMobileNavStyles(styles, isMenuOpen)}
					>
						{links}
					</nav>

					<button
						type="button"
						css={navbarLinkMobileButtonStyles(styles, isMenuOpen)}
						onClick={() => setMenuOpen(!isMenuOpen)}
					>
						Open Menu
					</button>
				</div>
			)}
		</nav>
	);
};

export default NavBar;
