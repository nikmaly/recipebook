/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { TRecipeIngredientSections, TRecipeStepSections, TRecipeIngredients } from 'middleware/DataLayer';
import { SectionBuilderRowIngredient } from '.';

type TSectionBuilderSectionProps = {
	name: string;
	type: 'method' | 'ingredient';
	section: TRecipeIngredientSections | TRecipeStepSections;
	emitChange: (data: TRecipeIngredientSections | TRecipeStepSections) => void;
};

const SectionBuilderSection: React.FunctionComponent<TSectionBuilderSectionProps> = ({
	name,
	type,
	section,
	emitChange,
}) => {
	const rowTemplate = {
		ingredient: '',
		unit: '',
		amount: '',
	};

	return (
		<Paper
			variant="outlined"
			sx={{ padding: '20px' }}
		>
			<TextField
				label="Section Name:"
				name={`${name}-section-name`}
				value={section.sectionName}
				variant="outlined"
				sx={{ marginBottom: '10px' }}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					emitChange({ ...JSON.parse(JSON.stringify(section)), sectionName: e.target.value });
				}}
			/>

			{
				type === 'ingredient'
				&& 'sectionIngredients' in section
				&& section.sectionIngredients.map(
					(ingredientRow: TRecipeIngredients, i: number) => (
						<SectionBuilderRowIngredient
							name={`${name}-row-${i}`}
							key={i}
							ingredient={ingredientRow}
							emitChange={(field: string, value: string) => {
								const newSectionData = JSON.parse(JSON.stringify(section));

								newSectionData.sectionIngredients[i][field] = value;
								emitChange(newSectionData);
							}}
						/>
					),
				)
			}

			<Fab
				color="primary"
				onClick={() => {
					const newSectionData = JSON.parse(JSON.stringify(section));

					newSectionData.sectionIngredients.push(rowTemplate);
					emitChange(newSectionData);
				}}
				aria-label="add ingredient"
				sx={{ marginLeft: 'auto' }}
				size="small"
			>
				<PlaylistAddIcon />
			</Fab>
		</Paper>
	);
};

export default SectionBuilderSection;
