/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { objectDeepCopy } from 'utils/objectDeepCopy';
import { StylesContext } from 'context/Styles';
import { atomApi } from 'atoms/atomApi';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { ContentPage } from 'middleware/ContentPage';
import { Loader } from 'components/Loader';
import { Accordion } from 'components/Accordion';
import { StepCounter } from 'components/StepCounter';
import { TRecipeData, TRecipeMetaData } from 'middleware/DataLayer';
import {
	Step1,
	Step2,
	Step3,
	Step4,
	Step5,
	Step6,
} from '.';
/** @jsxImportSource @emotion/react */
import {
	SubmissionJourneyStyles,
	SubmissionJourneyFormContentStyles,
} from './SubmissionJourney.styles';

export type TStepData = {
	stepName: string,
	isValid: boolean,
	component: React.ReactNode,
	fields: string[],
}

const SubmissionJourney = () => {
	const [authenticated,, authData] = useAuthenticated();
	const api = Recoil.useRecoilValue(atomApi);
	const { styles } = React.useContext(StylesContext);
	const [error, setError] = React.useState<String>('');
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [currentStep, setCurrentStep] = React.useState<number>(0);
	const [fieldData, setFieldData] = React.useState<Partial<TRecipeData>>({});
	const [formValidity, setFormValidity] = React.useState<any>();
	const steps: TStepData[] = [
		{
			stepName: 'title',
			isValid: false,
			component: <Step1
				fieldData={fieldData}
				emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
					{ ...fieldData, ...data },
				)}
			/>,
			fields: [
				'title',
				'image',
			],
		},
		{
			stepName: 'description',
			isValid: false,
			component: <Step2
				fieldData={fieldData}
				emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
					{ ...fieldData, ...data },
				)}
			/>,
			fields: [
				'summary',
				'description',
			],
		},
		{
			stepName: 'data',
			isValid: false,
			component: <Step3
				fieldData={fieldData}
				emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
					{ ...fieldData, ...data },
				)}
			/>,
			fields: [
				'metaData',
			],
		},
		{
			stepName: 'ingredients',
			isValid: false,
			component: <Step4
				fieldData={fieldData}
				emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
					{ ...fieldData, ...data },
				)}
			/>,
			fields: [
				'ingredients',
			],
		},
		{
			stepName: 'method',
			isValid: false,
			component: <Step5
				fieldData={fieldData}
				emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
					{ ...fieldData, ...data },
				)}
			/>,
			fields: [
				'method',
			],
		},
		{
			stepName: 'info',
			isValid: false,
			component: <Step6
				fieldData={fieldData}
				emitFieldData={(data: Partial<TRecipeData>) => setFieldData(
					{ ...fieldData, ...data },
				)}
			/>,
			fields: [
				'tags',
				'furtherInfo',
			],
		},
	];

	const isStepValid = (): boolean[] => {
		const activeFields = steps.map((step) => step.fields);

		const stepValidity: boolean[] = activeFields.map((stepFields) => (
			stepFields.reduce(
				(isValid: boolean, fieldName: string) => {
					if (
						!isValid
						|| !(fieldName in fieldData)
						|| !fieldData[fieldName as keyof TRecipeData]
					) { return false; }

					// ==== Special Cases
					// Meta Data
					if (fieldName === 'metaData') {
						const { cookTime, prepTime, difficulty } = fieldData[
							fieldName as keyof TRecipeData
						] as TRecipeMetaData;

						if (
							cookTime > 0
							&& prepTime > 0
							&& difficulty > 0
						) {
							return true;
						}

						return false;
					}

					// Tags
					if (fieldName === 'tags') {
						const tags = fieldData[fieldName as keyof TRecipeData] as string[];

						if (tags.length > 0) {
							return true;
						}

						return false;
					}

					// TODO: Ingredients
					// TODO: Method

					return true;
				},
				true,
			)
		));

		return stepValidity;
	};

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
			summary: fieldData.summary || '',
			description: fieldData.description || '',
			tags: fieldData.tags || [''],
			metaData: fieldData.metaData || {
				prepTime: 0,
				cookTime: 0,
				difficulty: 0,
			},
			furtherInfo: fieldData.furtherInfo || '',
			method: fieldData.method || [],
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
		console.log('handle step change');
		if (
			!noValidate
			&& targetStep > currentStep
			&& !isStepValid()[currentStep]
		) { return; }

		console.log('1');

		if (
			targetStep < 0
			// || targetStep > steps.length - 1
		) {
			return;
		}

		console.log('2');

		setCurrentStep(targetStep);
	};

	React.useEffect(() => {
		setFormValidity(
			steps.map((step) => (
				step.fields.map((field) => ({ [field]: false }))
			)),
		);
	}, []);

	return (
		<ContentPage title="Submit Recipe">
			<div css={SubmissionJourneyStyles(styles)}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{/* Uplift to show accessible, inaccessible and error state steps */}
						<StepCounter
							formSteps={steps.map((step: TStepData, i: number) => ({
								name: step.stepName,
								valid: isStepValid()[i],
							}))}
							currentStep={currentStep}
							setStep={(targetStep: number) => {
								console.log('step counter change', targetStep);
								handleStepChange(targetStep);
							}}
						/>

						<section css={SubmissionJourneyFormContentStyles(styles)}>
							{/* Form: Error Status */}
							<Collapse in={error.length > 0}>
								<Alert
									severity="error"
									onClose={() => setError('')}
								>
									<AlertTitle>Required fields*</AlertTitle>
									{error}
								</Alert>
							</Collapse>

							{/* Form: Current Step */}
							{ steps[currentStep].component }

							{/* Form: Submit */}
							<Fade
								in={
									currentStep === steps.length - 1
									&& isStepValid().splice(0, currentStep + 1).every(Boolean)
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

							{/* Form: Controls */}
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
										currentStep < steps.length - 1
										&& isStepValid().splice(0, currentStep + 1).every(Boolean)
									}
								>
									<Fab
										color="primary"
										onClick={() => handleStepChange(currentStep + 1, true)}
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
											<p>
												Validity:
												{JSON.stringify(isStepValid(), null, '\t')}
											</p>
											<p>
												Output Data:
												{JSON.stringify(fieldData, null, '\t')}
											</p>
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
