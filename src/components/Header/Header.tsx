/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
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
	const { styles } = useContext(StylesContext);

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
