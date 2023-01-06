import React, { useContext } from 'react';
import { StylesContext } from '../../context/StylesContext';
import { accordionStyles } from './Accordion.styles';

export type IAccordionContentRow = {
	contentItem: string;
}

export type IAccordionContent = {
	row_title: string;
	row_content: string[];
}

export type IAccordionData = {
	title: string
	content: IAccordionContent[];
}

export type IAccordionProps = {
	accordionData: IAccordionData;
}

const Accordion: React.FunctionComponent<IAccordionProps> = ({
	accordionData,
}) => {
	const { styles } = useContext(StylesContext);

	const createInnerHtml = (htmlItem: string) => ({
		__html: htmlItem,
	});

	const accordionBuilder = () => (
		accordionData.content.map((row: IAccordionContent, i: number) => (
			// this array will never change a single item, so it's safe to use index
			// eslint-disable-next-line react/no-array-index-key
			<li key={i}>
				<a
					href={`#accordion-content-${i}`}
					className="accordion-title"
				>
					{row.row_title}
				</a>
				<div
					id={`accordion-content-${i}`}
					className="accordion-content"
				>
					{row.row_content.map((contentItem: string, j: number) => (
						<p
							// eslint-disable-next-line react/no-array-index-key
							key={j}
							dangerouslySetInnerHTML={createInnerHtml(contentItem)}
						/>
					))}
				</div>
			</li>
		)));

	return (
		<div css={accordionStyles(styles)}>
			{ accordionData.title && <h3>{accordionData.title}</h3> }
			<ul>
				{ accordionData.content && accordionBuilder()}
			</ul>
		</div>
	);
};

export default Accordion;
