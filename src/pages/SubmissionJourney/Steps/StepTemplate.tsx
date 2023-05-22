import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { TagBuilder, SectionBuilder } from 'components/Field';
import { TRecipeIngredientSections } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';
import {
	TRecipeFormData,
	TFieldConfig,
	TRecipeFormKeys,
} from '..';

type TStepTemplateProps = {
	fields: TFieldConfig[];
	emitFieldData: (fieldData: Partial<TRecipeFormData>) => void;
	emitNext: () => void;
};

const StepTemplate: React.FunctionComponent<TStepTemplateProps> = ({
	fields,
	emitFieldData,
	emitNext,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeFormData>>({
		ingredients: [{
			sectionName: '',
			sectionIngredients: [{
				ingredient: '',
				unit: '',
				amount: '',
			}],
		}],
	});

	const handleFieldChange = (
		field: TRecipeFormKeys,
		value: string | number | TRecipeIngredientSections[],
	) => {
		const newFieldData = {
			...fieldData,
			[field]: value,
		};

		setFieldData(newFieldData);
		emitFieldData(newFieldData);
	};

	const fieldBuilder = (field: TFieldConfig) => {
		const {
			text,
			name,
			type,
			data,
		} = field;

		return (
			{
				text: (
					<TextField
						label={text}
						name={name}
						key={type + name}
						variant="outlined"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							handleFieldChange(name, e.target.value);
						}}
						value={fieldData[name] || ''}
					/>
				),
				number: (
					<TextField
						label={text}
						name={name}
						key={type + name}
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
							handleFieldChange(name, e.target.value);
						}}
						value={fieldData[field.name] || ''}
					/>
				),
				textarea: (
					<TextField
						label={text}
						name={name}
						key={type + name}
						variant="outlined"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							handleFieldChange(name, e.target.value);
						}}
						value={fieldData[name] || ''}
						multiline
						minRows={4}
					/>
				),
				select: (
					<TextField
						label={text}
						name={name}
						key={type + name}
						select
						defaultValue=""
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							handleFieldChange(name, e.target.value);
						}}
					>
						{(data || []).map((option: string) => (
							<MenuItem key={option} value={option}>
								{option.toUpperCase()}
							</MenuItem>
						))}
					</TextField>
				),
				image: (
					<input
						type="text"
					/>
				),
				tags: (
					<TagBuilder
						key={type + name}
						name={name}
						label={text}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							handleFieldChange(name, e.target.value);
						}}
						value={fieldData[name]?.toString() || ''}
					/>
				),
				ingredients: (
					<SectionBuilder
						key={type + name}
						name={name}
						type="ingredient"
						onChange={(ingredientData: TRecipeIngredientSections[]) => {
							handleFieldChange(name, ingredientData);
						}}
						value={fieldData[name] || '{}'}
					/>
				),
				method: <h1 key={name}>h1</h1>,
			}[type]
		);
	};

	return (
		<div>
			<Box
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					rowGap: styles.spacing[3],
				}}
				noValidate
				autoComplete="off"
				onSubmit={() => emitNext()}
			>
				{fields.map((field: TFieldConfig) => (
					<React.Fragment key={field.name}>
						{fieldBuilder(field)}
					</React.Fragment>
				))}
			</Box>
		</div>
	);
};

export default StepTemplate;
