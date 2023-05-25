import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TRecipeData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step2: React.FunctionComponent<TStepTemplateProps> = ({
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({
		description: [],
		shortDescription: '',
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: string | string[],
	) => {
		const newFieldData = {
			...fieldData,
			[field]: value,
		};

		setFieldData(newFieldData);
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
				name="shortDescription"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('shortDescription', e.target.value);
				}}
				value={fieldData.shortDescription}
				required
			/>

			<TextField
				label="Description"
				name="description"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('description', e.target.value.split('\n'));
				}}
				value={fieldData.description}
				multiline
				minRows={4}
				required
			/>
		</Box>
	);
};

export default Step2;
