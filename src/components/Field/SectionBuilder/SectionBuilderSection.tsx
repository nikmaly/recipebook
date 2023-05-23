/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { TRecipeSections, TRecipeIngredients } from 'middleware/DataLayer';
import { SectionBuilderRowIngredient, SectionBuilderRowStep } from '.';

type TSectionBuilderSectionProps = {
	name: string;
	type: 'method' | 'ingredient';
	section: TRecipeSections | TRecipeSections;
	emitChange: (data: TRecipeSections | TRecipeSections) => void;
};

const SectionBuilderSection: React.FunctionComponent<TSectionBuilderSectionProps> = ({
	name,
	type,
	section,
	emitChange,
}) => {
	const rowTemplate = type === 'ingredient'
		? {
			ingredient: '',
			unit: '',
			amount: '',
		} : '';

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
				required
			/>

			{
				section.sectionItems.map(
					(sectionItem: TRecipeIngredients | string, i: number) => {
						if (type === 'method') {
							return (
								<SectionBuilderRowStep
									label={`Step ${i + 1}`}
									name={`${name}-row-${i}`}
									key={i}
									step={sectionItem as string}
									emitChange={(value: string) => {
										const newSectionData = JSON.parse(JSON.stringify(section));

										newSectionData.sectionItems[i] = value;
										emitChange(newSectionData);
									}}
								/>
							);
						}

						return (
							<SectionBuilderRowIngredient
								name={`${name}-row-${i}`}
								key={i}
								ingredient={sectionItem as TRecipeIngredients}
								emitChange={(field: string, value: string) => {
									const newSectionData = JSON.parse(JSON.stringify(section));

									newSectionData.sectionItems[i][field] = value;
									emitChange(newSectionData);
								}}
							/>
						);
					},
				)
			}

			<Fab
				color="primary"
				onClick={() => {
					const newSectionData = JSON.parse(JSON.stringify(section));

					newSectionData.sectionItems.push(rowTemplate);
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
