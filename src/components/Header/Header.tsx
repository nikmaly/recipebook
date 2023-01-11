/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from '../../context/Styles';
import {
	headerStyles,
	headerContentTextStyles,
} from './Header.styles';

export type IHeaderProps = {
	content: React.ReactElement
}

const Header: React.FunctionComponent<IHeaderProps> = ({
	content,
}) => {
	const { styles } = React.useContext(StylesContext);

	return (
		<section
			css={headerStyles(styles)}
		>
			<div css={headerContentTextStyles(styles)}>
				{content}
			</div>
		</section>
	);
};

export default Header;
