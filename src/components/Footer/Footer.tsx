/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import {
	footerStyles,
	footerWrapperStyles,
	footerTextStyles,
} from './Footer.styles';

const Footer = () => {
	const { styles } = useContext(StylesContext);

	return (
		<section css={footerStyles(styles)}>
			<div css={footerWrapperStyles(styles)}>
				<div css={footerTextStyles(styles)}>© Nik Malyaris Photography | 2022</div>
			</div>
		</section>
	);
};

export default Footer;
