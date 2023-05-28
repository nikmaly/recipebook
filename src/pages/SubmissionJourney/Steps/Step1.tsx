import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TRecipeData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	fieldData: Partial<TRecipeData>;
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step1: React.FunctionComponent<TStepTemplateProps> = ({
	fieldData,
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [localFieldData, setLocalFieldData] = React.useState<Partial<TRecipeData>>({
		title: fieldData.title || '',
		image: fieldData.image || '',
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
				Step 1: Recipe Name
			</h2>

			<TextField
				label="Title"
				name="title"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('title', e.target.value);
				}}
				value={localFieldData.title}
				required
			/>

			<TextField
				label="Image URL"
				name="title"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('image', e.target.value);
				}}
				value={localFieldData.image}
				required
			/>
		</Box>
	);
};

export default Step1;
