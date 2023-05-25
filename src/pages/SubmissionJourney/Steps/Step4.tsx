import React from 'react';
import Box from '@mui/material/Box';
import { SectionBuilder } from 'components/Field';
import { TRecipeData, TRecipeSections } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	emitFieldData: (fieldData: Partial<TRecipeData>) => void;
};

const Step4: React.FunctionComponent<TStepTemplateProps> = ({
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({
		ingredients: [],
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: TRecipeSections[],
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
				Step 4: Ingredients
			</h2>

			<SectionBuilder
				name="ingredients"
				type="ingredient"
				onChange={(ingredientData: TRecipeSections[]) => {
					handleFieldChange('ingredients', ingredientData);
				}}
				value={fieldData.ingredients || []}
			/>
		</Box>
	);
};

export default Step4;
