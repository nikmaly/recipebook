import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { StylesContext } from 'context/Styles';
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
	const [authenticated] = useAuthenticated();
	const [isMenuOpen, setMenuOpen] = React.useState(false);
	const navMenuRef = React.useRef(null);
	const { pathname } = useLocation();
	const isLanding: boolean = pathname === '/';

	const handleClickOutside = (e: MouseEvent | TouchEvent) => {
		if (navMenuRef?.current) {
			const el: Node = navMenuRef?.current;

			if (!el.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
	};

	React.useEffect(() => {
		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClickOutside);
		}

		return () => { window.removeEventListener('mousedown', handleClickOutside); };
	}, [isMenuOpen]);

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
			<div
				css={navbarLinkMenuWrapperStyles(styles)}
				ref={navMenuRef}
			>
				<button
					type="button"
					css={navbarLinkMenuButtonStyles(styles, isMenuOpen, isLanding)}
					onClick={() => setMenuOpen(!isMenuOpen)}
				>
					Open Menu
				</button>

				<ul
					css={navbarLinkMenuStyles(styles, isMenuOpen, isLanding)}
				>
					{!authenticated && (
						<li>
							<NavLink
								to="/login"
								onClick={() => setMenuOpen(false)}
							>
								Login
							</NavLink>
						</li>
					)}
					<li>
						<NavLink
							to="/settings"
							onClick={() => setMenuOpen(false)}
						>
							Settings
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/submit-recipe"
							onClick={() => setMenuOpen(false)}
						>
							Submit
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
