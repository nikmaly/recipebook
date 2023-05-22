/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Fab from '@mui/material/Fab';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import { StylesContext } from 'context/Styles';
import { ContentPage } from 'middleware/ContentPage';
import { Loader } from 'components/Loader';
import { Accordion } from 'components/Accordion';
import { StepCounter } from 'components/StepCounter';
import { TRecipeStepSections, TRecipeIngredientSections } from 'middleware/DataLayer';
import { StepTemplate } from '.';
/** @jsxImportSource @emotion/react */
import {
	SubmissionJourneyStyles,
	SubmissionJourneyHeaderStyles,
	SubmissionJourneyFormWrapperStyles,
	SubmissionJourneyFormContentStyles,
} from './SubmissionJourney.styles';

// TODO: accept a image and submit it to the s3 CDN
export type TRecipeFormData = {
	// image: FileList[];
	image: string;
	title: string;
	shortDescription: string;
	description: string;
	tags: string
	furtherInfo: string;
	prepTime: string;
	cookTime: string;
	difficulty: string;
	ingredients: TRecipeIngredientSections[];
	stepsSimple: TRecipeStepSections[];
	stepsDetailed: TRecipeStepSections[];
};

export type TRecipeFormKeys = keyof TRecipeFormData;

export type TFieldConfig = {
	name: TRecipeFormKeys;
	text: string;
	type: 'text' | 'textarea' | 'number' | 'select' | 'image' | 'ingredients' | 'method' | 'tags';
	data?: any;
};

const SubmissionJourney = () => {
	const { styles } = React.useContext(StylesContext);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [currentStep, setCurrentStep] = React.useState<number>(0);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeFormData>>({});
	let formSteps = [];

	const handleStepChange = (next: boolean = true) => {
		const targetStep = currentStep + (next ? 1 : -1);

		if (
			targetStep < 0
			|| targetStep > formSteps.length - 1
		) {
			return;
		}

		setCurrentStep(
			currentStep + (next ? 1 : -1),
		);
	};

	const fields: TFieldConfig[] = [
		{
			name: 'title',
			text: 'Recipe Title',
			type: 'text',
		},
		{
			name: 'image',
			text: 'Recipe Image',
			type: 'image',
		},
		{
			name: 'shortDescription',
			text: 'Summary',
			type: 'text',
		},
		{
			name: 'description',
			text: 'Description',
			type: 'textarea',
		},
		{
			name: 'prepTime',
			text: 'Preparation Time (mins)',
			type: 'number',
		},
		{
			name: 'cookTime',
			text: 'Cooking Time (mins)',
			type: 'number',
		},
		{
			name: 'difficulty',
			text: 'Difficulty',
			type: 'select',
			data: ['easy', 'medium', 'hard', 'sorcery'],
		},
		{
			name: 'ingredients',
			text: 'Ingredients',
			type: 'ingredients',
		},
		{
			name: 'stepsSimple',
			text: 'Steps - Simplified',
			type: 'method',
		},
		{
			name: 'stepsDetailed',
			text: 'Steps - Details',
			type: 'method',
		},
		{
			name: 'tags',
			text: 'Recipe Tags',
			type: 'tags',
		},
		{
			name: 'furtherInfo',
			text: 'Additional Notes',
			type: 'textarea',
		},
	];

	formSteps = [
		{
			stepName: 'Title',
			stepComponent: <StepTemplate
				fields={fields.slice(0, 2)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
		{
			stepName: 'Description',
			stepComponent: <StepTemplate
				fields={fields.slice(2, 4)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
		{
			stepName: 'Details',
			stepComponent: <StepTemplate
				fields={fields.slice(4, 7)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
		{
			stepName: 'Ingredients',
			stepComponent: <StepTemplate
				fields={fields.slice(7, 8)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
		{
			stepName: 'Method',
			stepComponent: <StepTemplate
				fields={fields.slice(8, 10)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
		{
			stepName: 'Tags',
			stepComponent: <StepTemplate
				fields={fields.slice(10, 11)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
		{
			stepName: 'Notes',
			stepComponent: <StepTemplate
				fields={fields.slice(11, 12)}
				emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData({ ...fieldData, ...data })}
				emitNext={() => handleStepChange()}
			/>,
		},
	];

	return (
		<ContentPage title="Submit Recipe">
			<div css={SubmissionJourneyStyles(styles)}>
				{isLoading ? (
					<Loader />
				) : (
					<div css={SubmissionJourneyFormWrapperStyles(styles)}>
						<StepCounter
							formSteps={formSteps.map((step) => step.stepName)}
							currentStep={currentStep}
							setStep={(targetStep: number) => setCurrentStep(targetStep)}
						/>

						<section css={SubmissionJourneyFormContentStyles(styles)}>
							<h2 css={SubmissionJourneyHeaderStyles(styles)}>
								{`Step: ${currentStep + 1} - ${formSteps[currentStep].stepName}`}
							</h2>

							<div style={{
								display: 'flex',
								flexFlow: 'row',
								justifyContent: 'space-between',
								marginBottom: styles.spacing[6],
							}}
							>
								{ currentStep > 0 && (
									<Fab
										color="primary"
										onClick={() => handleStepChange(false)}
										aria-label="backward"
										size="medium"
									>
										<ArrowBackIosNew />
									</Fab>
								)}
								{ currentStep < formSteps.length - 1 && (
									<Fab
										color="primary"
										onClick={() => handleStepChange(true)}
										aria-label="next"
										sx={{ marginLeft: 'auto' }}
										size="medium"
									>
										<ArrowForwardIos />
									</Fab>
								)}
							</div>

							{formSteps[currentStep].stepComponent}
						</section>

						{process.env.NODE_ENV === 'development' && (
							<Accordion
								content={[{
									itemTitle: 'Recipe Data',
									itemContent: (
										<pre>
											{JSON.stringify(fieldData, null, '\t')}
										</pre>
									),
								}]}
							/>
						)}
					</div>
				)}
			</div>
		</ContentPage>
	);
};

export default SubmissionJourney;
