// @ts-nocheck
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { StylesContext } from 'context/Styles';
import {
	TRecipeData,
	TRecipeSections,
} from 'middleware/DataLayer';
import { ContentPage } from 'middleware/ContentPage';
import { Loader } from 'components/Loader';
import { Field } from 'components/Field';
import { Button } from 'components/Button';
/** @jsxImportSource @emotion/react */
import {
	submitRecipeStyles,
	submitRecipeFormWrapperStyles,
	submitRecipeFormStyles,
	submitRecipeFormGroupStyles,
} from './SubmitRecipe.styles';

// TODO: accept a image and submit it to the s3 CDN
export type TRecipeDataSubmit = {
	// image: FileList[];
	image: string;
	title: string;
	summary: string;
	description: string;
	tags: string
	furtherInfo: string;
	prepTime: string;
	cookTime: string;
	difficulty: string;
	ingredients: string;
	method: string;
};

const SubmitRecipe = () => {
	const { styles } = React.useContext(StylesContext);
	const api = Recoil.useRecoilValue(atomApi);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const [outputData, setOutputData] = React.useState<TRecipeData>();
	const [authenticated,, authData] = useAuthenticated();
	const {
		register,
		handleSubmit,
		watch,
		formState: {
			errors,
		},
	} = useForm<TRecipeData>();

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

				// if (!data.error) {
				// }
			})())
			.catch((err) => {
				console.error('error', err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const ingredientMapper = (ingredients: string): TRecipeSections[] => {
		const ingredientSections = ingredients.split('!').filter((item) => !!item);

		return ingredientSections.map((section) => {
			const cleaned = section.split('\n');

			const ingredientData = cleaned
				.slice(1, cleaned.length)
				.filter((item) => !!item)
				.map((item) => {
					const items = item.trim().split('/');

					return {
						amount: items[0].trim().toLowerCase(),
						unit: items[1].trim().toLowerCase(),
						ingredient: items[2].trim().toLowerCase(),
					};
				});

			return {
				sectionName: cleaned[0].trim(),
				sectionItems: ingredientData,
			};
		});
	};

	const stepMapper = (steps: string): TRecipeSections[] => {
		const stepSections = steps.split('!').filter((step) => !!step);

		return stepSections.map((section) => {
			const splitSection = section.trim().split('\n');

			return {
				sectionName: splitSection[0].trim(),
				sectionItems: [...splitSection.splice(1, splitSection.length)],
			};
		});
	};

	const onSubmit: SubmitHandler<TRecipeData> = (data) => {
		const sanitisedData: TRecipeData = {
			recipeName: data.title.trim().replace(' ', '-').toLowerCase(),
			title: data.title.trim(),
			// image: data.image[0],
			image: data.image.trim(),
			summary: data.summary.trim(),
			description: data.description.trim().split('\n'),
			tags: data.tags.trim().toLowerCase().split(','),
			metaData: {
				prepTime: data.prepTime.trim(),
				cookTime: data.cookTime.trim(),
				difficulty: data.difficulty.trim(),
			},
			ingredients: ingredientMapper(data.ingredients),
			method: stepMapper(data.method),
			furtherInfo: data.furtherInfo.trim().split('\n'),
		};

		setOutputData(sanitisedData);

		// If the user is logged in
		if (authenticated) {
			postRecipe(sanitisedData);
		}
	};
	// TODO: Validate schema with Yup

	return (
		<ContentPage title="Submit Recipe">
			<div css={submitRecipeStyles(styles)}>
				{isLoading ? (
					<Loader />
				) : (
					<div css={submitRecipeFormWrapperStyles(styles)}>
						<>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div css={submitRecipeFormStyles(styles)}>
									<Field
										labelText="Recipe Title"
										fieldName="title"
										hasInput={!!watch('title')}
										hasError={!!errors.title}
									>
										<input
											placeholder="Name of the recipe"
											{...register('title', { required: true })}
										/>
									</Field>

									<Field
										labelText="Image URL"
										fieldName="image"
										hasInput={!!watch('image')}
										hasError={!!errors.image}
									>
										{/* <input
											type="file"
											accept="image/jpeg, image/png, image/jpg"
											{...register('image', { required: true })}
										/> */}
										<input
											placeholder="Image URL for the finished recipe product"
											{...register('image', { required: true })}
										/>
									</Field>

									<Field
										labelText="Short Description"
										fieldName="summary"
										hasInput={!!watch('summary')}
										hasError={!!errors.summary}
									>
										<input
											placeholder="Describe the recipe in a single short paragraph"
											{...register('summary', { required: true })}
										/>
									</Field>

									<Field
										labelText="Full Description"
										fieldName="description"
										hasInput={!!watch('description')}
										hasError={!!errors.description}
									>
										<textarea
											rows={4}
											placeholder="Describe the recipe fully"
											{...register('description', { required: true })}
										/>
									</Field>

									<div css={submitRecipeFormGroupStyles(styles)}>
										<Field
											labelText="Prep Time"
											fieldName="prepTime"
											hasInput={!!watch('prepTime')}
											hasError={!!errors.prepTime}
										>
											<input
												placeholder="1 hr"
												{...register('prepTime', { required: true })}
											/>
										</Field>

										<Field
											labelText="Cook Time"
											fieldName="cookTime"
											hasInput={!!watch('cookTime')}
											hasError={!!errors.cookTime}
										>
											<input
												placeholder="30 mins"
												{...register('cookTime', { required: true })}
											/>
										</Field>

										<Field
											labelText="Difficulty"
											fieldName="difficulty"
											hasInput={!!watch('difficulty')}
											hasError={!!errors.difficulty}
										>
											<input
												placeholder="Easy"
												{...register('difficulty', { required: true })}
											/>
										</Field>
									</div>

									<Field
										labelText="Tags"
										fieldName="tags"
										hasInput={!!watch('tags')}
										hasError={!!errors.tags}
									>
										<textarea
											rows={2}
											placeholder="Cuisine,Meal,Other"
											{...register('tags', { required: true })}
										/>
									</Field>

									<Field
										labelText="Ingredients"
										fieldName="ingredients"
										hasInput={!!watch('ingredients')}
										hasError={!!errors.ingredients}
									>
										<textarea
											rows={5}
											placeholder={`!Recipe Section 1 Name
500/grams/flour
300/ml/water
100/grams/cocoa powder`}
											{...register('ingredients', { required: true })}
										/>
									</Field>

									<Field
										labelText="Steps - Simplified"
										fieldName="method"
										hasInput={!!watch('method')}
										hasError={!!errors.method}
									>
										<textarea
											rows={5}
											placeholder={`!Step Section 1 Name
This is the first step
This is the second step
This is the third step`}
											{...register('method', { required: true })}
										/>
									</Field>

									<Field
										labelText="Notes"
										fieldName="furtherInfo"
										hasInput={!!watch('furtherInfo')}
										hasError={!!errors.furtherInfo}
									>
										<textarea
											rows={5}
											placeholder="Any other information for the recipe"
											{...register('furtherInfo', { required: true })}
										/>
									</Field>

									<Button text="Submit" />
								</div>
							</form>
						</>
					</div>
				)}

				{outputData && (
					<div css={submitRecipeFormWrapperStyles(styles)}>
						{authenticated ? (
							<p>Recipe submitted.</p>
						) : (
							<>
								<h4>Send this to Nik:</h4>
								<textarea value={JSON.stringify(outputData)} readOnly />
							</>
						)}
					</div>
				)}
			</div>
		</ContentPage>
	);
};

export default SubmitRecipe;
