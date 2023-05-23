/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

type TSectionBuilderRowStepProps = {
	name: string;
	label: string;
	step: string;
	emitChange: (value: string) => void;
};

const SectionBuilderRowStep: React.FunctionComponent<TSectionBuilderRowStepProps> = ({
	name,
	label,
	step,
	emitChange,
}) => (
	<Grid
		container
		spacing={1}
		sx={{ marginBottom: '8px' }}
	>
		<Grid xs={12}>
			<TextField
				label={label}
				name={`${name}-step-name`}
				variant="outlined"
				sx={{ width: '100%' }}
				value={step}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
					emitChange(e.target.value)
				)}
				required
			/>
		</Grid>
	</Grid>
);

export default SectionBuilderRowStep;
