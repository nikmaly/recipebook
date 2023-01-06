import React, { useContext } from 'react';
import { StylesContext, StylesContextType } from '../../context/StylesContext';
import { SocialLinkStyles } from './SocialLinks.styles';

type SocialLinksProps = {
	sites: string[];
}

const siteList: Record<string, string> = {
	instagram: 'www.instagram.com',
	linkedin: 'www.linkedin.com',
};

const SocialLinks: React.FunctionComponent<SocialLinksProps> = ({
	sites,
}) => {
	const { styles } = useContext<StylesContextType>(StylesContext);

	const buildIcons = () => (
		sites.map((site: string, i: number) => (
			// eslint-disable-next-line react/no-array-index-key
			<div key={i} className={`icon-${site}`}>
				<a href={siteList[site]}> </a>
			</div>
		))
	);

	return (
		<div css={SocialLinkStyles(styles)}>
			{ buildIcons() }
		</div>
	);
};

export default SocialLinks;
