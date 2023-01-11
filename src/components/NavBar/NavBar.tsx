import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { StylesContext } from '../../context/Styles';
/** @jsxImportSource @emotion/react */
import {
	navbarStyles,
	navbarLogoStyles,
	navbarLogoLinkStyles,
	navbarLinkMenuWrapperStyles,
	navbarLinkMenuButtonStyles,
	navbarLinkMenuStyles,
} from './NavBar.styles';

const NavBar: React.FunctionComponent = () => {
	const { styles } = React.useContext(StylesContext);
	const [isMenuOpen, setMenuOpen] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
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

	React.useEffect(() => {
		const floatingHeader = document.getElementById('floating-navbar');

		if (floatingHeader) {
			// setHeaderOffset(floatingHeader.offsetTop);
			window.addEventListener('scroll', handleScroll);
			// TODO: update offset on resize
		}

		return () => { window.removeEventListener('scroll', handleScroll); };
	}, []);

	return (
		<nav
			css={navbarStyles(styles, isLanding)}
			id="floating-navbar"
		>
			{/* Navbar Logo / Home */}
			<div css={navbarLogoStyles(styles)}>
				<NavLink
					css={navbarLogoLinkStyles(styles)}
					to="/"
					className="v-hidden"
				>
					Home Icon Link
				</NavLink>
			</div>

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
					<li>
						<NavLink
							to="/login"
							onClick={() => setMenuOpen(false)}
						>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/settings"
							onClick={() => setMenuOpen(false)}
						>
							Settings
						</NavLink>
					</li>
					<li>
						<a href="https://nik.malyaris.com">
							Contact
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
