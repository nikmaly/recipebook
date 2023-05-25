import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TRecipeData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step1: React.FunctionComponent<TStepTemplateProps> = ({
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({
		furtherInfo: [],
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: string[],
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
				Step 7: Further Info
			</h2>

			<TextField
				label="Further Info"
				name="furtherInfo"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('furtherInfo', e.target.value.split('\n'));
				}}
				value={fieldData.furtherInfo}
				required
			/>
		</Box>
	);
};

export default Step1;
