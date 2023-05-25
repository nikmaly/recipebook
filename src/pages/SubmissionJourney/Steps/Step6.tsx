import React from 'react';
import Box from '@mui/material/Box';
import { TagBuilder } from 'components/Field';
import { TRecipeData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step6: React.FunctionComponent<TStepTemplateProps> = ({
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({
		tags: [],
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
				Step 6: Tags
			</h2>

			<TagBuilder
				name="tags"
				label="Recipe Tags"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleFieldChange('tags', e.target.value.split(','));
				}}
				value={fieldData.tags?.toString() || ''}
				required
			/>
		</Box>
	);
};

export default Step6;
