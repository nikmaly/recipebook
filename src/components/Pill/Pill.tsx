/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import {
	pillStyles,
	pillListItemStyles,
} from './Pill.styles';

export type TPillThemes = 'primary' | 'secondary' | 'grey';

type TPillProps = {
	text: string;
	theme?: TPillThemes;
	href?: string;
	onClick?: () => void;
	isExternalLink?: boolean;
	isListItem?: boolean;
}

const Pill: React.FunctionComponent<TPillProps> = ({
	text,
	theme = 'primary',
	href,
	onClick,
	isListItem = false,
}) => {
	const { styles } = useContext(StylesContext);
	let ElementType: React.ElementType = 'div';

	if (href) {
		ElementType = 'a';
	} else if (onClick) {
		ElementType = 'button';
	} else {
		ElementType = 'div';
	}

	const tagFactory = () => (
		<ElementType
			css={pillStyles(styles, theme)}
			href={href}
		>
			{text}
		</ElementType>
	);

	const listTemplate = (children: React.ReactNode) => (
		<li css={pillListItemStyles(styles)}>
			{children}
		</li>
	);

	return (
		isListItem ? (
			listTemplate(tagFactory())
		) : (
			tagFactory()
		)
	);
};

export default Pill;
