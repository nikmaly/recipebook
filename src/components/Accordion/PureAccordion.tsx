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
		content.map((item: TAccordionContent, i: number) => {
			const summary = (
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`accordion-${i}-content`}
					id={`accordion-${i}-controller`}
					key={`accordion-${i}-controller`}
					css={accordionSummaryStyles(styles)}
					sx={{
						fontSize: '0.875em',
						color: styles.colors.primary.base,
						textTransform: 'uppercase',
					}}
				>
					{item.itemTitle}
				</AccordionSummary>
			);

			const detail = (
				<AccordionDetails
					key={`accordion-${i}-content`}
					css={accordionDetailStyles(styles)}
				>
					{item.itemContent}
				</AccordionDetails>
			);

			return ([
				summary,
				detail,
			]);
		})
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
