import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { TagBuilder, SectionBuilder } from 'components/Field';
import { TRecipeData, TRecipeSections } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';
import {
	TFieldConfig,
} from '..';

type TStepTemplateProps = {
	stepName: string;
	stepNumber: number;
	fields: TFieldConfig[];
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
	// emitNext: () => void;
};

const StepTemplate: React.FunctionComponent<TStepTemplateProps> = ({
	stepName,
	stepNumber,
	fields,
	emitFieldData,
	// emitNext,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({
		ingredients: [],
		method: [],
		stepsDetailed: [],
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: string | number | TRecipeSections[],
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
						required
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
						required
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
						required
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
						required
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
						required
					/>
				),
				ingredients: (
					<SectionBuilder
						key={type + name}
						name={name}
						type="ingredient"
						onChange={(ingredientData: TRecipeSections[]) => {
							handleFieldChange(name, ingredientData);
						}}
						value={fieldData[name] || '{}'}
					/>
				),
				method: (
					<SectionBuilder
						key={type + name}
						name={name}
						type="method"
						onChange={(stepData: TRecipeSections[]) => {
							handleFieldChange(name, stepData);
						}}
						value={fieldData[name] || '{}'}
					/>
				),
				skip: (
					<></>
				),
			}[type]
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: styles.spacing[3],
			}}
			// onSubmit={() => emitNext()}
		>
			<h2>
				{`Step: ${stepNumber} - ${stepName}`}
			</h2>

			{fields.map((field: TFieldConfig) => (
				<React.Fragment key={field.name}>
					{fieldBuilder(field)}
				</React.Fragment>
			))}
		</Box>
	);
};

export default StepTemplate;
