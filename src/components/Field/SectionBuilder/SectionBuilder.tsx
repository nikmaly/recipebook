/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Button from '@mui/material/Button';
import { TRecipeSections } from 'middleware/DataLayer';
import { SectionBuilderSection } from '.';

type TSectionBuilderProps = {
	name: string;
	type: 'ingredient' | 'method';
	onChange: (data: TRecipeSections[]) => void;
	value: string | TRecipeSections[] | TRecipeSections[];
};

const SectionBuilder: React.FunctionComponent<TSectionBuilderProps> = ({
	name,
	type,
	onChange,
	value,
}) => {
	const fieldTemplate = {
		sectionName: '',
		sectionItems: [
			type === 'ingredient' ? {
				ingredient: '',
				unit: '',
				amount: '',
			} : '',
		],
	};

	return (
		<>
			{Array.isArray(value) && value.map(
				(section: TRecipeSections | TRecipeSections, i: number) => (
					<SectionBuilderSection
						name={name + i}
						key={`${name}-${i}`}
						type={type}
						section={section}
						emitChange={(data: TRecipeSections | TRecipeSections) => {
							const newStepData = JSON.parse(JSON.stringify(value));

							newStepData[i] = data;
							onChange(newStepData);
						}}
					/>
				),
			)}

			<Button
				variant="text"
				onClick={() => {
					const newStepData = JSON.parse(JSON.stringify(value));

					newStepData.push(fieldTemplate);
					onChange(newStepData);
				}}
			>
				Add Section +
			</Button>
		</>
	);
};

export default SectionBuilder;
