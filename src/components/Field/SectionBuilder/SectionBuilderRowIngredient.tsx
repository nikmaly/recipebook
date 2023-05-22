/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { TRecipeIngredients } from 'middleware/DataLayer';

type TSectionBuilderRowIngredientProps = {
	name: string;
	ingredient: TRecipeIngredients;
	emitChange: (field: string, value: string) => void;
};

const SectionBuilderRowIngredient: React.FunctionComponent<TSectionBuilderRowIngredientProps> = ({
	name,
	ingredient,
	emitChange,
}) => {
	const units = [
		{ text: 'Teaspoon', value: 'tspn' },
		{ text: 'Tablespoon', value: 'tbls' },
		{ text: 'Cup', value: 'cup' },
		{ text: 'Millilitre', value: 'ml' },
		{ text: 'Litre', value: 'l' },
		{ text: 'Gram', value: 'g' },
		{ text: 'Kilogram', value: 'kg' },
		{ text: 'Pinch', value: 'pinch' },
		{ text: 'Slice', value: 'slice' },
	];

	return (
		<Grid
			container
			spacing={1}
			sx={{ marginBottom: '8px' }}
		>
			<Grid xs={2.5}>
				<TextField
					label="Amount"
					name={`${name}-ingredient-amount`}
					variant="outlined"
					sx={{ width: '100%' }}
					value={ingredient.amount}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
						emitChange('amount', e.target.value)
					)}
				/>
			</Grid>

			<Grid xs={3.5}>
				<TextField
					label="Unit"
					name={`${name}-ingredient-unit`}
					variant="outlined"
					select
					defaultValue=""
					sx={{ width: '100%' }}
					value={ingredient.unit}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
						emitChange('unit', e.target.value)
					)}
				>
					{units.map((unit: any) => (
						<MenuItem key={unit.value} value={unit.value}>
							{unit.text.toUpperCase()}
						</MenuItem>
					))}
				</TextField>
			</Grid>

			<Grid xs={6}>
				<TextField
					label="Name"
					name={`${name}-ingredient-name`}
					variant="outlined"
					sx={{ width: '100%' }}
					value={ingredient.ingredient}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
						emitChange('ingredient', e.target.value)
					)}
				/>
			</Grid>
		</Grid>
	);
};

export default SectionBuilderRowIngredient;
