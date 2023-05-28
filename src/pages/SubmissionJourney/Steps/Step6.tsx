import React from 'react';
import {
	Box,
	TextField,
} from '@mui/material';
import { TagBuilder } from 'components/Field';
import { TRecipeData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	fieldData: Partial<TRecipeData>;
	emitFieldData: (localFieldData: Partial<TRecipeData>) => void;
};

const Step6: React.FunctionComponent<TStepTemplateProps> = ({
	fieldData,
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [localFieldData, setLocalFieldData] = React.useState<Partial<TRecipeData>>({
		tags: fieldData.tags || [],
		furtherInfo: '',
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: string[] | string,
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
				Step 6: Other Information
			</h2>

			<TagBuilder
				name="tags"
				label="Recipe Tags"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('tags', e.target.value.split(',').map((tag: string) => tag.trim()));
				}}
				value={localFieldData.tags?.toString() || ''}
				required
			/>

			<TextField
				label="Further Info"
				name="furtherInfo"
				variant="outlined"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('furtherInfo', e.target.value);
				}}
				value={localFieldData.furtherInfo}
				required
				multiline
				minRows={4}
			/>
		</Box>
	);
};

export default Step6;
