import React from 'react';
import Box from '@mui/material/Box';
import { SectionBuilder } from 'components/Field';
import { TRecipeData, TRecipeSections } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	fieldData: Partial<TRecipeData>;
	emitFieldData: (localFieldData: Partial<TRecipeData>) => void;
};

const Step4: React.FunctionComponent<TStepTemplateProps> = ({
	fieldData,
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [localFieldData, setLocalFieldData] = React.useState<Partial<TRecipeData>>({
		ingredients: fieldData.ingredients || [],
	});

	const handleFieldChange = (
		field: keyof TRecipeData,
		value: TRecipeSections[],
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
				Step 4: Ingredients
			</h2>

			<SectionBuilder
				name="ingredients"
				type="ingredient"
				onChange={(ingredientData: TRecipeSections[]) => {
					handleFieldChange('ingredients', ingredientData);
				}}
				value={localFieldData.ingredients || []}
			/>
		</Box>
	);
};

export default Step4;
