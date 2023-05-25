import React from 'react';
import {
	Box,
	TextField,
	InputAdornment,
	MenuItem,
} from '@mui/material';
import { TRecipeData, TRecipeMetaData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step3: React.FunctionComponent<TStepTemplateProps> = ({
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<TRecipeMetaData>({
		prepTime: '',
		cookTime: '',
		difficulty: '',
	});

	const handleFieldChange = (
		field: keyof TRecipeMetaData,
		value: string,
	) => {
		const newFieldData: TRecipeMetaData = {
			...fieldData,
			[field]: value,
		};

		setFieldData(newFieldData);
		emitFieldData({ metaData: newFieldData });
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: styles.spacing[3],
			}}
		>
			<h2>
				Step 3: Info
			</h2>

			<TextField
				label="Preparation Time"
				name="prepTime"
				variant="outlined"
				type="number"
				inputMode="numeric"
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (
						e.key !== 'Backspace'
						&& /[^0-9.]/g.test(e.key)
					) {
						e.preventDefault();
					}
				}}
				InputProps={{
					endAdornment: <InputAdornment position="end">(m)</InputAdornment>,
				}}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('prepTime', e.target.value);
				}}
				value={fieldData.prepTime}
				required
			/>

			<TextField
				label="Cooking Time"
				name="cookTime"
				variant="outlined"
				type="number"
				inputMode="numeric"
				onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
					if (
						e.key !== 'Backspace'
						&& /[^0-9.]/g.test(e.key)
					) {
						e.preventDefault();
					}
				}}
				InputProps={{
					endAdornment: <InputAdornment position="end">(m)</InputAdornment>,
				}}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('cookTime', e.target.value);
				}}
				value={fieldData.cookTime}
				required
			/>

			<TextField
				label="Difficulty"
				name="difficulty"
				select
				defaultValue=""
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('difficulty', e.target.value);
				}}
				required
			>
				{['easy', 'medium', 'hard', 'sorcery'].map((option: string) => (
					<MenuItem key={option} value={option}>
						{option.toUpperCase()}
					</MenuItem>
				))}
			</TextField>
		</Box>
	);
};

export default Step3;
