/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { StylesContext } from 'context/Styles';
import { atomApi } from 'atoms/atomApi';
import { atomRecipeNameList, TRecipeNameList } from 'atoms/atomRecipeNameList';
import { atomLoadedRecipes } from 'atoms/atomLoadedRecipes';
import { useLoadRecipes } from 'hooks/useLoadRecipes';
import { TRecipeData, TRecipeIngredients } from 'middleware/DataLayer';
import { Loader } from 'components/Loader';
import { NavBar } from 'components/NavBar';
import { Pill } from 'components/Pill';
import { Accordion } from 'components/Accordion';
import { Tab, ITabContent } from 'components/Tab';
import { FavouriteButton } from 'components/FavouriteButton';
import {
	recipePageStyles,
	recipePageNextLinkStyles,
	recipePagePanelLeftStyles,
	recipePagePanelRightStyles,
	recipePageTitleStyles,
	recipePageFavouriteStyles,
	recipePageTagStyles,
	recipePageDescriptionStyles,
	recipePageInfoDataStyles,
	recipePageTabStyles,
} from './RecipePage.styles';

import IngredientSvg from '../../assets/icons/groceries.svg';
import StepsSvg from '../../assets/icons/list.svg';
import DetailedStepsSvg from '../../assets/icons/complex.svg';

const RecipePage: React.FunctionComponent = () => {
	const recipeNames: TRecipeNameList = Recoil.useRecoilValue(atomRecipeNameList);
	const loadedRecipes = Recoil.useRecoilValue(atomLoadedRecipes);
	const [recipeData, setRecipeData] = React.useState<TRecipeData>();
	const [isLoading, setLoading] = React.useState(true);
	const { styles } = React.useContext(StylesContext);
	const loadRecipes = useLoadRecipes();
	const { recipeName } = useParams();

	const findRecipe = (onLoad: boolean = false) => {
		if (
			recipeName
			&& typeof recipeName === 'string'
		) {
			if (loadedRecipes.index.includes(recipeName)) {
				const targetRecipe = loadedRecipes.data.find((item) => item.recipeName === recipeName);

				if (targetRecipe) {
					setRecipeData(targetRecipe);
					setLoading(false);
				}
			} else if (onLoad) {
				loadRecipes([recipeName]);
			}
		}
	};

	React.useEffect(() => {
		findRecipe();
	}, [loadedRecipes]);

	React.useEffect(() => {
		setLoading(true);
		findRecipe(true);
	}, []);

	const tabContent: ITabContent[] = [
		{
			tabTitle: 'Ingredients',
			tabIcon: <img src={IngredientSvg} alt="ingredient icon" />,
			tabSplit: true,
			tabContent: recipeData && (
				recipeData.ingredients.map((section, i) => (
					<div key={`ingredient-section-${i}`}>
						<h4>{section.sectionName}</h4>
						<ul>
							{section.sectionItems.map((item: string | TRecipeIngredients, j: number) => {
								const { amount, unit, ingredient } = item as TRecipeIngredients;

								return (
									<li key={`ingredient-section-${i}-ingredient-${j}`}>
										{`${amount} ${unit} ${ingredient}`}
									</li>
								);
							})}
						</ul>
					</div>
				))
			),
		},
		{
			tabTitle: 'Steps',
			tabIcon: <img src={StepsSvg} alt="steps icon" />,
			tabContent: recipeData && (
				recipeData.stepsSimple.map((section, i) => (
					<div key={`step-section-${i}`}>
						<h4>{section.sectionName}</h4>
						<ol>
							{section.sectionItems.map((item: string | TRecipeIngredients, j: number) => {
								const step = item as string;

								return (
									<li key={`step-section-${i}-step-${j}`}>
										{step}
									</li>
								);
							})}
						</ol>
					</div>
				))
			),
		},
		{
			tabTitle: 'Detailed Steps',
			tabIcon: <img src={DetailedStepsSvg} alt="detailed steps icon" />,
			tabContent: recipeData && (
				recipeData.stepsDetailed.map((section, i) => (
					<div key={`detailed-step-section-${i}`}>
						<h4>{section.sectionName}</h4>
						<ol>
							{section.sectionItems.map((item: string | TRecipeIngredients, j: number) => {
								const step = item as string;

								return (
									<li key={`detailed-step-section-${i}-step-${j}`}>
										{step}
									</li>
								);
							})}
						</ol>
					</div>
				))
			),
		},
	];

	if (
		!recipeData?.stepsDetailed
		|| recipeData.stepsDetailed.length < 1
	) {
		tabContent.splice(2, 3);
	}

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<NavBar />

					<main css={recipePageStyles(styles)}>
						{ recipeData && (
							<>
								<section css={recipePagePanelLeftStyles(styles)}>
									<article>
										<h1 css={recipePageTitleStyles(styles)}>
											{recipeData.title}
										</h1>

										<div css={recipePageFavouriteStyles(styles)}>
											<FavouriteButton recipe={recipeName || ''} />
										</div>

										<div css={recipePageTagStyles(styles)}>
											<ul>
												{
													recipeData.tags.map((tag, i) => (
														<Pill
															key={`recipe-data-tag-${tag}`}
															text={tag}
															href={`/discover/${tag}`}
															theme={i % 2 ? 'secondary' : 'primary'}
														/>
													))
												}
											</ul>
										</div>

										<div css={recipePageInfoDataStyles(styles)}>
											<ul>
												<li>
													<p>Prep Time:</p>
													<p>{recipeData.metaData.prepTime}</p>
												</li>
												<li>
													<p>Cook Time:</p>
													<p>{recipeData.metaData.cookTime}</p>
												</li>
												<li>
													<p>Difficulty:</p>
													<p>{recipeData.metaData.difficulty}</p>
												</li>
											</ul>
										</div>

										{recipeData.description && (
											<div css={recipePageDescriptionStyles(styles)}>
												{recipeData.description.map((item, i) => (
													<p key={`description-paragraph-${i}`}>
														{item}
													</p>
												))}
											</div>
										)}
									</article>

									<article css={recipePageTabStyles(styles)}>
										<Tab content={tabContent} />
									</article>

									<article>
										{ recipeData.furtherInfo && recipeData.furtherInfo.length > 0 && (
											<Accordion
												content={[{
													itemTitle: 'Further Information',
													itemContent: recipeData.furtherInfo.map((item, i: number) => (
														<p key={`further-information-${i}`}>
															{item}
														</p>
													)),
												}]}
											/>
										)}
									</article>
								</section>

								<section css={recipePagePanelRightStyles(styles)}>
									<NavLink
										to={`/recipe/${recipeName || 0 + 1}`}
										className="next-recipe-link"
										css={recipePageNextLinkStyles(styles)}
									>
										Next Recipe
										<img
											src={recipeData.image}
											alt={`${recipeData.title} result`}
										/>
									</NavLink>
								</section>
							</>
						)}
					</main>
				</>
			)}
		</>
	);
};

export default RecipePage;
