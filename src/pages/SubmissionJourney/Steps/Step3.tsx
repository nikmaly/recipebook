import React from 'react';
import {
	Box,
	TextField,
	InputAdornment,
	Rating,
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import { TRecipeData, TRecipeMetaData } from 'middleware/DataLayer';
import { StylesContext } from 'context/Styles';

type TStepTemplateProps = {
	fieldData: Partial<TRecipeData>;
	emitFieldData: (localFieldData: Partial<TRecipeData>) => void;
};

const Step3: React.FunctionComponent<TStepTemplateProps> = ({
	fieldData,
	emitFieldData,
}) => {
	const { styles } = React.useContext(StylesContext);
	const [difficultyValue, setDifficultyValue] = React.useState<number | null>(0);
	const [localFieldData, setLocalFieldData] = React.useState<Partial<TRecipeData>>({
		metaData: {
			prepTime: fieldData.metaData?.prepTime || 0,
			cookTime: fieldData.metaData?.cookTime || 0,
			difficulty: fieldData.metaData?.difficulty || 0,
		},
	});

	const handleFieldChange = (
		field: keyof TRecipeMetaData,
		value: number,
	) => {
		const newMetaData = {
			prepTime: localFieldData.metaData?.prepTime || 0,
			cookTime: localFieldData.metaData?.cookTime || 0,
			difficulty: localFieldData.metaData?.difficulty || 0,
			[field]: value || 0,
		};

		setLocalFieldData({ metaData: newMetaData });
		emitFieldData({ metaData: newMetaData });
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
				Step 3: Info
			</h2>

			<TextField
				label="Preparation Time"
				name="prepTime"
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
					handleFieldChange('prepTime', parseInt(e.target.value, 10));
				}}
				value={localFieldData.metaData?.prepTime}
				required
			/>

			<TextField
				label="Cooking Time"
				name="cookTime"
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
					handleFieldChange('cookTime', parseInt(e.target.value, 10));
				}}
				value={localFieldData.metaData?.cookTime}
				required
			/>

			<Box
				sx={{
					display: 'flex',
					flexFlow: 'row nowrap',
					alignItems: 'center',
					padding: '15px',
					border: '1px solid rgba(0, 0, 0, 0.23)',
					borderRadius: '4px',
					color: 'rgba(0, 0, 0, 0.54)',
				}}
			>
				Difficulty:

				<Rating
					name="difficulty"
					size="large"
					value={difficultyValue}
					onChange={(event, newValue) => {
						handleFieldChange('difficulty', newValue || 0);
						setDifficultyValue(newValue);
					}}
					icon={<CookieIcon fontSize="inherit" />}
					emptyIcon={<CookieIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
					max={5}
					sx={{
						marginLeft: '10px',
						'& .MuiRating-iconFilled': {
							color: styles.colors.secondary.base,
						},
						'& .MuiRating-iconActive': {
							color: styles.colors.primary.base,
						},
					}}
				/>
			</Box>
		</Box>
	);
};

export default Step3;
