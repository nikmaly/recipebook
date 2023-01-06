/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import type { TRouteData } from '../../App';
import { ContentPage } from '../ContentPage';
import { StylesContext, StylesContextType } from '../../context/StylesContext';
import { linkStyles } from './LandingPage.styles';

type GalleryLandingPageProps = {
	routeData: TRouteData[];
	title: string;
	isSecure?: boolean;
};

const GalleryLandingPage: React.FunctionComponent<GalleryLandingPageProps> = ({
	routeData,
	title,
	isSecure = false,
}) => {
	const { styles } = useContext<StylesContextType>(StylesContext);

	const generateLinks = () => (
		<div css={linkStyles(styles)}>
			<ul>
				{
					routeData.map((route: TRouteData) => (
						<li key={route.routeId}>
							<NavLink to={`/${route.routeType}/${route.routeId}`}>
								{route.routeName}
							</NavLink>
						</li>
					))
				}
			</ul>
		</div>
	);

	return (
		<ContentPage title={title} navFadeIn>
			{
				!!isSecure
				&& routeData.length > 0
					? (
						// <Authenticated>
						generateLinks()
						// </Authenticated>
					)
					: generateLinks()
			}
		</ContentPage>
	);
};

export default GalleryLandingPage;
