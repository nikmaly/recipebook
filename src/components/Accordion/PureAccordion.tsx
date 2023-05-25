/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StylesContext } from 'context/Styles';
import {
	TAccordionContent,
	TAccordionProps,
	accordionStyles,
	accordionWrapperStyles,
	accordionSummaryStyles,
	accordionDetailStyles,
} from '.';

const Accordion: React.FunctionComponent<TAccordionProps> = ({
	title,
	content,
}) => {
	const { styles } = React.useContext(StylesContext);

	const accordionBuilder = () => (
		content.map((item: TAccordionContent, i: number) => ([
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`accordion-${i + item.itemTitle}-content`}
				id={`accordion-${i + item.itemTitle}-controller`}
				key={`accordion-${i + item.itemTitle}-controller`}
				css={accordionSummaryStyles(styles)}
				sx={{
					fontSize: '0.875em',
					color: styles.colors.primary.base,
					textTransform: 'uppercase',
				}}
			>
				{item.itemTitle}
			</AccordionSummary>,
			<AccordionDetails
				key={`accordion-${i + item.itemTitle}-content`}
				css={accordionDetailStyles(styles)}
			>
				{item.itemContent}
			</AccordionDetails>,
		]))
	);

	return (
		<div css={accordionStyles(styles)}>
			{ title && <h3>{title}</h3> }

			{ content && (
				<MuiAccordion
					css={accordionWrapperStyles(styles)}
					square
				>
					{ accordionBuilder() }
				</MuiAccordion>
			)}
		</div>
	);
};

export default Accordion;
