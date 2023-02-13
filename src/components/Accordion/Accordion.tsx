/** @jsxImportSource @emotion/react */
import React from 'react';
import { PureAccordion } from '.';

export type TAccordionContent = {
	itemTitle: string;
	itemContent: React.ReactNode;
}

export type TAccordionProps = {
	title?: string
	content: TAccordionContent[];
}

const Accordion: React.FunctionComponent<TAccordionProps> = ({
	title,
	content,
}) => (
	<PureAccordion
		title={title}
		content={content}
	/>
);

export default Accordion;
