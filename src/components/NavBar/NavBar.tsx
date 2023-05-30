import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
// import SettingsIcon from '@mui/icons-material/Settings';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { StylesContext } from 'context/Styles';
/** @jsxImportSource @emotion/react */
import {
	navbarStyles,
	navbarLogoStyles,
	navbarLogoLinkStyles,
	navbarLinkMenuWrapperStyles,
	navbarLinkMenuButtonStyles,
} from './NavBar.styles';

const SimplifiedLink = React.forwardRef<any, any>((props, ref) => (
	<Link
		ref={ref}
		to={props.to}
		style={{
			color: '#000',
			textDecoration: 'none',
		}}
	>
		{props.children}
	</Link>
));

const NavBar: React.FunctionComponent = () => {
	const { styles } = React.useContext(StylesContext);
	const [authenticated] = useAuthenticated();
	const [isMenuOpen, setMenuOpen] = React.useState(false);
	const navMenuRef = React.useRef(null);
	const { pathname } = useLocation();
	const isLanding: boolean = pathname === '/';

	const handleClickOutsideMenu = (e: MouseEvent | TouchEvent) => {
		if (navMenuRef?.current) {
			const el: Node = navMenuRef?.current;

			if (!el.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		}
	};

	React.useEffect(() => {
		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClickOutsideMenu);
		}

		return () => { window.removeEventListener('mousedown', handleClickOutsideMenu); };
	}, [isMenuOpen]);

	return (
		<nav
			css={navbarStyles(styles, isLanding)}
			id="floating-navbar"
		>
			{/* Navbar Logo / Home */}
			<div css={navbarLogoStyles(styles)}>
				<Link
					css={navbarLogoLinkStyles(styles)}
					to="/"
					className="v-hidden"
				>
					Home Icon Link
				</Link>
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

				<Drawer
					anchor="right"
					open={isMenuOpen}
				>
					<Box
						role="presentation"
						sx={{ minWidth: '200px', height: '100%' }}
						ref={navMenuRef}
					>
						<List>
							{/* Internal Links */}
							{[
								{ text: 'Home', link: '/', icon: <HomeIcon /> },
								{ text: 'Random', link: '/random', icon: <ShuffleIcon /> },
								{ text: 'Search', link: '/search', icon: <SearchIcon /> },
								{ text: 'Discover', link: '/discover', icon: <LocationSearchingIcon /> },
								{ text: 'Favourites', link: '/favourites', icon: <FavoriteIcon /> },
								// { text: 'Settings', link: '/settings', icon: <SettingsIcon /> },
							].map((nav) => (
								<ListItem
									key={nav.text}
									disablePadding
									component={SimplifiedLink}
									to={nav.link}
								>
									<ListItemButton>
										<ListItemIcon>
											{nav.icon}
										</ListItemIcon>

										<ListItemText
											primary={nav.text}
											sx={{ color: styles.colors.black.base }}
										/>
									</ListItemButton>
								</ListItem>
							))}

							{authenticated && ([
								{ text: 'Submit', link: '/submit', icon: <InboxIcon /> },
							].map((nav) => (
								<ListItem
									key={nav.text}
									disablePadding
									component={SimplifiedLink}
									to={nav.link}
								>
									<ListItemButton>
										<ListItemIcon>
											{nav.icon}
										</ListItemIcon>

										<ListItemText
											primary={nav.text}
											sx={{ color: styles.colors.black.base }}
										/>
									</ListItemButton>
								</ListItem>
							)))}
						</List>

						<Divider />

						<List>
							{/* External Links */}
							{[
								{ text: 'Contact', link: 'https://nik.malyaris.com', icon: <CallIcon /> },
							].map((nav) => (
								<ListItem
									key={nav.text}
									disablePadding
									component="a"
									href={nav.link}
								>
									<ListItemButton>
										<ListItemIcon>
											{nav.icon}
										</ListItemIcon>

										<ListItemText
											primary={nav.text}
											sx={{ color: styles.colors.black.base }}
										/>
									</ListItemButton>
								</ListItem>
							))}

							{!authenticated && (
								<ListItem
									disablePadding
									component={SimplifiedLink}
									to="/login"
								>
									<ListItemButton>
										<ListItemIcon>
											<LockOpenIcon />
										</ListItemIcon>

										<ListItemText
											primary="Login"
											sx={{ color: styles.colors.black.base }}
										/>
									</ListItemButton>
								</ListItem>
							)}
						</List>
					</Box>
				</Drawer>
			</div>
		</nav>
	);
};

export default NavBar;
