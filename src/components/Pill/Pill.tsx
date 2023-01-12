/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from '../../context/Styles';
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
	compact?: boolean;
}

const Pill: React.FunctionComponent<TPillProps> = ({
	text,
	theme = 'primary',
	href,
	onClick,
	isListItem = false,
	compact = false,
}) => {
	const { styles } = React.useContext(StylesContext);
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
			css={pillStyles(styles, theme, compact)}
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
