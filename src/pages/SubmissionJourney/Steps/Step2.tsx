import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TRecipeData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	fieldData: Partial<TRecipeData>;
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step2: React.FunctionComponent<TStepTemplateProps> = ({
	fieldData,
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [localFieldData, setLocalFieldData] = React.useState<Partial<TRecipeData>>({
		description: fieldData.description || '',
		summary: fieldData.summary || '',
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: string,
	) => {
		const newFieldData = {
			...localFieldData,
			[field]: value,
		};

		setLocalFieldData(newFieldData);
		emitFieldData(newFieldData);
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
				Step 2: Description
			</h2>

			<TextField
				label="Summary"
				name="summary"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('summary', e.target.value);
				}}
				value={localFieldData.summary}
			/>

			<TextField
				label="Description"
				name="description"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('description', e.target.value);
				}}
				value={localFieldData.description}
				multiline
				minRows={4}
			/>
		</Box>
	);
};

export default Step2;
