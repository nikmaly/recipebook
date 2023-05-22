/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { StylesContext } from 'context/Styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoadRecipes } from 'hooks/useLoadRecipes';
import Recoil from 'recoil';
import { atomLoadedRecipes } from 'atoms/atomLoadedRecipes';
import { atomRecipeFilterList, TRecipeFilterList } from 'atoms/atomRecipeFilterList';
import { atomMetaData, TMetaData } from 'atoms/atomMetaData';
import { TRecipeData } from 'middleware/DataLayer';
import { arrayComparator } from 'utils/arrayComparator';
import { Field } from 'components/Field';
import { Checkbox } from 'components/Checkbox';
import { Button } from 'components/Button';
import {
	PureDiscover,
	filterFormStyles,
	filterTagWrapperStyles,
	filterTagTitleStyles,
	filterTagStyles,
	discoverSubmitStyles,
} from '.';

export type TFilterFormData = {
	search: string;
	ingredient: string;
	tags: string[];
};

export type TTags = {
	meal: string[];
	nationality: string[];
	region: string[];
	general: string[];
};

const Discover = () => {
	const { styles } = React.useContext(StylesContext);
	const loadedRecipes = Recoil.useRecoilValue(atomLoadedRecipes);
	const recipeFilterList: TRecipeFilterList = Recoil.useRecoilValue(atomRecipeFilterList);
	const metaData: TMetaData = Recoil.useRecoilValue(atomMetaData);
	const [displayedRecipes, setDisplayedRecipes] = React.useState<TRecipeData[]>([]);
	const [matchingRecipeNames, setMatchingRecipeNames] = React.useState<string[]>([]);
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		formState: {
			errors,
		},
	} = useForm<any>();
	const loadRecipes = useLoadRecipes();

	const filterRecipes = (filterData: TFilterFormData) => {
		// collapse form filter tags into one list
		const filterTags = Object.values(filterData.tags).flat();

		const matchingRecipes = recipeFilterList.filter((recipe) => {
			const nameMatch = filterData.search
				? recipe.recipeName.includes(filterData.search)
				: true;

			const ingredientMatch = filterData.ingredient
				? recipe.ingredients.reduce(
					(found: boolean, ingredient) => {
						const recipeIngredient = ingredient.toLowerCase();
						let result = found;

						result = filterData.ingredient.includes(recipeIngredient)
							? true
							: found;

						result = recipeIngredient.includes(filterData.ingredient)
							? true
							: found;

						return result;
					},
					false,
				)
				: true;

			const tagMatch = filterTags && filterTags.flat().length > 0
				? recipe.tags.reduce(
					(found: boolean, item) => (
						filterTags.includes(item) ? true : found
					),
					false,
				)
				: true;

			return (
				nameMatch
				&& tagMatch
				&& ingredientMatch
			);
		});
		// fuzzy match search?
		// order by confidence?
		// load recipes using loadrecipe hook if needed

		return matchingRecipes;
	};

	const tagSanitisation = (tagObject: Record<string, boolean>) => (
		tagObject
			? Object
				.entries(tagObject)
				.map((entry) => (entry[1] ? entry[0] : []))
				.filter((entry) => entry.length > 0)
			: []
	);

	const onFormDataChange: SubmitHandler<any> = (data) => {
		console.log('in form data change', data);
		const sanitisedData: any = {
			search: data.search ? data.search.trim() : '',
			ingredient: data.ingredient ? data.ingredient.trim() : '',
			tags: {
				nationality: tagSanitisation(data.nationality),
				meal: tagSanitisation(data.meal),
				region: tagSanitisation(data.region),
				general: tagSanitisation(data.general),
			},
		};

		const recipeNames = filterRecipes(sanitisedData).map((recipe) => recipe.recipeName);

		// We don't want rogue updates happening because of the form on input submission
		if (!arrayComparator(matchingRecipeNames, recipeNames)) {
			setMatchingRecipeNames(recipeNames);
			loadRecipes(recipeNames);
		}
	};

	React.useEffect(() => {
		const displayRecipes = loadedRecipes.data.reduce(
			(matches: TRecipeData[], recipe) => {
				if (matchingRecipeNames.includes(recipe.recipeName)) {
					matches.push(recipe);
				}

				return matches;
			},
			[],
		);

		setDisplayedRecipes(displayRecipes);
	}, [matchingRecipeNames, loadedRecipes]);

	React.useEffect(() => {
		onFormDataChange(getValues());
	}, [watch()]);

	return (
		<PureDiscover
			loadedRecipes={displayedRecipes}
		>
			<form
				css={filterFormStyles(styles)}
				onSubmit={handleSubmit(onFormDataChange)}
			>
				<Field
					labelText="Search"
					fieldName="search"
					hasInput={watch('search')}
				>
					<input
						type="text"
						id="search"
						{...register('search')}
					/>
				</Field>

				<Field
					labelText="Ingredient"
					fieldName="ingredient"
					hasInput={watch('ingredient')}
				>
					<input
						type="text"
						id="ingredient"
						{...register('ingredient')}
					/>
				</Field>

				{Object.keys(metaData.tags).map((type: string) => {
					if (
						metaData.tags[type]
						&& metaData.tags[type].length > 0
					) {
						return (
							<div
								key={type}
								css={filterTagWrapperStyles(styles)}
							>
								<h4 css={filterTagTitleStyles(styles)}>{type}</h4>

								<div css={filterTagStyles(styles, false)}>
									{metaData.tags[type].map((tag: string) => (
										<Checkbox
											labelText={tag}
											checkboxName={`${type}.${tag}`}
											isChecked={watch(`${type}.${tag}`)}
											key={`${type}.${tag}`}
										>
											<input
												type="checkbox"
												id={`${type}.${tag}`}
												{...register(`${type}.${tag}`)}
											/>
										</Checkbox>
									))}
								</div>
							</div>
						);
					}

					return null;
				})}
			</form>
		</PureDiscover>
	);
};

export default Discover;
