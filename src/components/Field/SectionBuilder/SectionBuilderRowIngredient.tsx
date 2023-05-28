/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
	TextField,
	Autocomplete,
} from '@mui/material';
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
		'Teaspoon',
		'Tablespoon',
		'Cup',
		'Millilitre',
		'Litre',
		'Gram',
		'Kilogram',
		'Pinch',
		'Slice',
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
					required
				/>
			</Grid>

			<Grid xs={3.5}>
				<Autocomplete
					sx={{ width: '100%' }}
					disablePortal
					options={units}
					renderInput={(params) => (
						<TextField
							// eslint-disable-next-line react/jsx-props-no-spreading
							{...params}
							label="Unit (opt)"
							name={`${name}-ingredient-unit`}
							variant="outlined"
							value={ingredient.unit}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
								emitChange('unit', e.target.value)
							)}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					)}
				/>
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
					required
				/>
			</Grid>
		</Grid>
	);
};

export default SectionBuilderRowIngredient;
