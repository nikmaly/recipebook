/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Button from '@mui/material/Button';
import { TRecipeIngredientSections, TRecipeStepSections } from 'middleware/DataLayer';
import { SectionBuilderSection } from '.';

type TSectionBuilderProps = {
	name: string;
	type: 'ingredient' | 'method';
	onChange: (data: TRecipeIngredientSections[]) => void;
	value: string | TRecipeIngredientSections[] | TRecipeStepSections[];
};

const SectionBuilder: React.FunctionComponent<TSectionBuilderProps> = ({
	name,
	type,
	onChange,
	value,
}) => {
	const fieldTemplate = {
		sectionName: '',
		sectionIngredients: [{
			ingredient: '',
			unit: '',
			amount: '',
		}],
	};

	return (
		<>
			{Array.isArray(value) && value.map(
				(section: TRecipeIngredientSections | TRecipeStepSections, i: number) => (
					<SectionBuilderSection
						name={name + i}
						key={`${name}-i`}
						type={type}
						section={section}
						emitChange={(data: TRecipeIngredientSections | TRecipeStepSections) => {
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
