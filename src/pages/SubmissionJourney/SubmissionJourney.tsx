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
import { TRecipeData } from 'middleware/DataLayer';
import {
	Step1,
	Step2,
	Step3,
	Step4,
	Step5,
	Step6,
	Step7,
} from '.';
/** @jsxImportSource @emotion/react */
import {
	SubmissionJourneyStyles,
	SubmissionJourneyFormContentStyles,
} from './SubmissionJourney.styles';

const SubmissionJourney = () => {
	const [authenticated,, authData] = useAuthenticated();
	const api = Recoil.useRecoilValue(atomApi);
	const { styles } = React.useContext(StylesContext);
	const [error, setError] = React.useState<String>('');
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [currentStep, setCurrentStep] = React.useState<number>(0);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({});
	const steps = [
		<Step1
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
		<Step2
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
		<Step3
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
		<Step4
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
		<Step5
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
		<Step6
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
		<Step7
			emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
				{ ...fieldData, ...data },
			)}
		/>,
	];

	// const isStepValid = (step: TStepData): boolean => (
	// 	step.fields.reduce(
	// 		(isValid: boolean, field: TFieldConfig) => {
	// 			if (!isValid) { return false; }

	// 			return (
	// 				field.type === 'skip'
	// 				|| (
	// 					field.name in fieldData
	// 					&& !!fieldData[field.name]
	// 				)
	// 			);
	// 		},
	// 		true,
	// 	)
	// );

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
		// const formStepValidity = steps.map((step) => isStepValid(step));
		const formData: TRecipeData = {
			recipeName: (fieldData.title || '').replace(/ /g, '-').toLowerCase(),
			title: fieldData.title || '',
			image: fieldData.image || '',
			shortDescription: fieldData.shortDescription || '',
			description: fieldData.description || [''],
			tags: fieldData.tags || [''],
			metaData: fieldData.metaData || {
				prepTime: '',
				cookTime: '',
				difficulty: '',
			},
			furtherInfo: fieldData.furtherInfo || [],
			method: fieldData.method || [],
			stepsDetailed: fieldData.stepsDetailed || [],
			ingredients: fieldData.ingredients || [],
		};

		// if (formStepValidity.includes(false)) {
		// 	const invalidSteps = formStepValidity
		// 		.map((item, i: number) => (!item ? i : null))
		// 		.filter((item) => typeof item === 'number');

		// 	if (formStepValidity.length > 0) {
		// 		setError(
		// 			`Some fields are missing information on steps: ${
		// 				invalidSteps.map((step) => ` ${step && step + 1}`)
		// 			}`,
		// 		);
		// 	}

		// 	return;
		// }

		// If the user is logged in
		if (authenticated) {
			postRecipe(formData);
		}
	};

	const handleStepChange = (targetStep: number, noValidate: boolean = false) => {
		if (
			!noValidate
			&& targetStep > currentStep
			// FIXME:
			// && !isStepValid(steps[currentStep])
		) { return; }

		if (
			targetStep < 0
			|| targetStep > steps.length - 1
		) {
			return;
		}

		setCurrentStep(targetStep);
	};

	const runValidation = () => {
		const data = { ...fieldData };

		const fieldValidity = data.map(())

		const isStepValid = (step): boolean => (
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
	};

	React.useEffect(() => {
		runValidation();
	}, [fieldData]);

	return (
		<ContentPage title="Submit Recipe">
			<div css={SubmissionJourneyStyles(styles)}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{/* Uplift to show accessible, inaccessible and error state steps */}
						<StepCounter
							steps={steps.map((step) => step.stepName)}
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

							{ steps[currentStep] }

							{/* Form: Submit */}
							<Fade in={currentStep === steps.length - 1}>
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
									in={currentStep < steps.length - 1}
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
