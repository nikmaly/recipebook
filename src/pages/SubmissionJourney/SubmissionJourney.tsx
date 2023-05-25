/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Recoil from 'recoil';
import {
	Alert,
	AlertTitle,
	Collapse,
	Fab,
	Button,
	Fade,
} from '@mui/material';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import { StylesContext } from 'context/Styles';
import { atomApi } from 'atoms/atomApi';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { ContentPage } from 'middleware/ContentPage';
import { Loader } from 'components/Loader';
import { Accordion } from 'components/Accordion';
import { StepCounter } from 'components/StepCounter';
import { TRecipeData, TRecipeSections } from 'middleware/DataLayer';
import { StepTemplate } from '.';
/** @jsxImportSource @emotion/react */
import {
	SubmissionJourneyStyles,
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
	ingredients: TRecipeSections[];
	stepsSimple: TRecipeSections[];
	stepsDetailed?: TRecipeSections[];
};

export type TRecipeFormKeys = keyof TRecipeFormData;

export type TFieldConfig = {
	name: TRecipeFormKeys;
	text: string;
	type: 'skip' | 'text' | 'textarea' | 'number' | 'select' | 'image' | 'ingredients' | 'method' | 'tags';
	data?: any;
};

type TStepData = {
	stepName: string;
	fields: TFieldConfig[];
};

const SubmissionJourney = () => {
	const [authenticated,, authData] = useAuthenticated();
	const api = Recoil.useRecoilValue(atomApi);
	const { styles } = React.useContext(StylesContext);
	const [error, setError] = React.useState<String>('');
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [currentStep, setCurrentStep] = React.useState<number>(0);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeFormData>>({});
	let formSteps: TStepData[] = [];

	const isStepValid = (step: TStepData): boolean => (
		step.fields.reduce(
			(isValid: boolean, field: TFieldConfig) => {
				if (!isValid) { return false; }

				return (
					field.type === 'skip'
					|| (
						field.name in fieldData
						&& !!fieldData[field.name]
					)
				);
			},
			true,
		)
	);

	const postRecipe = (recipe: TRecipeData) => {
		const submissionUrl = `${api.url}/${api.version}/${api.endpoints.recipe}`;
		const submissionOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				authorizationToken: authData.access_token,
			},
			body: JSON.stringify(recipe),
		};

		setLoading(true);

		fetch(submissionUrl, submissionOptions)
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 1000); });

				if (data.__type === 'com.amazon.coral.service#SerializationException') {
					throw new Error(data.__type);
				}

				if (!data.error) {
					console.log('Submitted');
				}
			})())
			.catch((err) => {
				console.error('error', err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleFormSubmit = () => {
		const formStepValidity = formSteps.map((step) => isStepValid(step));
		const formData: TRecipeData = {
			recipeName: (fieldData.title || '').replace(/ /g, '-').toLowerCase(),
			title: fieldData.title || '',
			image: fieldData.image || '',
			shortDescription: fieldData.shortDescription || '',
			description: (fieldData.description || '').split('\n'),
			tags: (fieldData.tags || '').split(','),
			metaData: {
				prepTime: fieldData.prepTime || '',
				cookTime: fieldData.cookTime || '',
				difficulty: fieldData.difficulty || '',
			},
			furtherInfo: (fieldData.furtherInfo || '').split('\n'),
			stepsSimple: fieldData.stepsSimple || [],
			stepsDetailed: fieldData.stepsDetailed || [],
			ingredients: fieldData.ingredients || [],
		};

		if (formStepValidity.includes(false)) {
			const invalidSteps = formStepValidity
				.map((item, i: number) => (!item ? i : null))
				.filter((item) => typeof item === 'number');

			if (formStepValidity.length > 0) {
				setError(
					`Some fields are missing information on steps: ${
						invalidSteps.map((step) => ` ${step && step + 1}`)
					}`,
				);
			}

			return;
		}

		// If the user is logged in
		if (authenticated) {
			postRecipe(formData);
		}
	};

	const handleStepChange = (targetStep: number, noValidate: boolean = false) => {
		if (
			!noValidate
			&& targetStep > currentStep
			&& !isStepValid(formSteps[currentStep])
		) { return; }

		if (
			targetStep < 0
			|| targetStep > formSteps.length - 1
		) {
			return;
		}

		setCurrentStep(targetStep);
	};

	formSteps = [
		{
			stepName: 'Title',
			fields: [
				{
					name: 'title',
					text: 'Recipe Title',
					type: 'text',
				},
				{
					name: 'image',
					text: 'Recipe Image',
					type: 'skip',
				},
			],
		},
		{
			stepName: 'Description',
			fields: [
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
			],
		},
		{
			stepName: 'Info',
			fields: [
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
			],
		},
		{
			stepName: 'Ingredients',
			fields: [
				{
					name: 'ingredients',
					text: 'Ingredients',
					type: 'ingredients',
				},
			],
		},
		{
			stepName: 'Method',
			fields: [
				{
					name: 'stepsSimple',
					text: 'Steps - Simplified',
					type: 'method',
				},
				{
					name: 'stepsDetailed',
					text: 'Steps - Details',
					type: 'skip',
				},
			],
		},
		{
			stepName: 'Tags',
			fields: [
				{
					name: 'tags',
					text: 'Recipe Tags',
					type: 'tags',
				},
			],
		},
		{
			stepName: 'Further Info',
			fields: [
				{
					name: 'furtherInfo',
					text: 'Additional Notes',
					type: 'textarea',
				},
			],
		},
	];

	return (
		<ContentPage title="Submit Recipe">
			<div css={SubmissionJourneyStyles(styles)}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{/* Uplift to show accessible, inaccessible and error state steps */}
						<StepCounter
							formSteps={formSteps.map((step) => step.stepName)}
							currentStep={currentStep}
							setStep={(targetStep: number) => handleStepChange(targetStep)}
						/>

						<section css={SubmissionJourneyFormContentStyles(styles)}>
							<Collapse in={error.length > 0}>
								<Alert
									severity="error"
									onClose={() => setError('')}
								>
									<AlertTitle>Required fields*</AlertTitle>
									{error}
								</Alert>
							</Collapse>

							<StepTemplate
								emitFieldData={(data: Partial<TRecipeFormData>) => setFieldData(
									{ ...fieldData, ...data },
								)}
								emitNext={() => handleStepChange(currentStep + 1)}
								stepNumber={currentStep + 1}
								{...formSteps[currentStep]}
							/>

							{/* Form: Submit */}
							<Fade
								in={
									currentStep === formSteps.length - 1
									&& isStepValid(formSteps[currentStep])
								}
							>
								<Button
									variant="text"
									onClick={() => handleFormSubmit()}
									sx={{
										display: 'block',
										marginTop: '20px',
										marginLeft: 'auto',
									}}
								>
									Submit
								</Button>
							</Fade>

							<div style={{
								display: 'flex',
								flexFlow: 'row',
								justifyContent: 'space-between',
								marginTop: 'auto',
							}}
							>
								{/* Form: Back Button */}
								<Fade in={currentStep > 0}>
									<Fab
										color="primary"
										onClick={() => handleStepChange(currentStep - 1)}
										aria-label="backward"
										size="small"
									>
										<ArrowBackIosNew />
									</Fab>
								</Fade>

								{/* Form: Forward Button */}
								<Fade
									in={
										currentStep < formSteps.length - 1
										&& isStepValid(formSteps[currentStep])
									}
								>
									<Fab
										color="primary"
										onClick={() => handleStepChange(currentStep + 1)}
										aria-label="next"
										sx={{ marginLeft: 'auto' }}
										size="small"
									>
										<ArrowForwardIos />
									</Fab>
								</Fade>
							</div>
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
					</>
				)}
			</div>
		</ContentPage>
	);
};

export default SubmissionJourney;
