/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { Rating, Chip } from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
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
	const location = useLocation();

	const nextRecipe = (): string => {
		const currentRecipeIndex = recipeNames.indexOf(recipeName || '');
		const nextRecipeIndex = currentRecipeIndex + 1 < recipeNames.length
			? currentRecipeIndex + 1
			: 0;

		return recipeNames[nextRecipeIndex];
	};

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
	}, [location]);

	const tabContent: ITabContent[] = [
		{
			tabTitle: 'Ingredients',
			tabIcon: <img src={IngredientSvg} alt="ingredient icon" />,
			tabSplit: true,
			tabContent: recipeData && (
				recipeData.ingredients?.map((section, i) => (
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
				recipeData.method?.map((section, i) => (
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
	];

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
														<>
															<Chip
																key={`recipe-data-tag-${tag}-${i}`}
																label={tag}
																component="a"
																href={`/discover?filter=${tag}`}
																variant="outlined"
																color={i % 2 ? 'primary' : 'secondary'}
																clickable
															/>
														</>
													))
												}
											</ul>
										</div>

										<div css={recipePageInfoDataStyles(styles)}>
											<ul>
												<li>
													<h4>
														<span>{recipeData.metaData.prepTime}</span>
														mins
													</h4>
													<p>Preparation</p>
												</li>
												<li>
													<h4>
														<span>{recipeData.metaData.cookTime}</span>
														mins
													</h4>
													<p>Cooking</p>
												</li>
												<li>
													<Rating
														name="difficulty"
														size="large"
														value={recipeData.metaData.difficulty}
														icon={<CookieIcon fontSize="inherit" />}
														emptyIcon={<CookieIcon style={{ opacity: 0.4 }} fontSize="inherit" />}
														sx={{
															'& .MuiRating-iconFilled': {
																color: styles.colors.secondary.base,
															},
														}}
														readOnly
													/>
													<p>Difficulty:</p>
												</li>
											</ul>
										</div>

										{recipeData.description && (
											<div css={recipePageDescriptionStyles(styles)}>
												{recipeData.description?.split('\n').map((item, i) => (
													<p key={`description-paragraph-${item}-${i}`}>
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
													itemContent: recipeData.furtherInfo.split('\n').map((item, i: number) => (
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
										to={`/recipe/${nextRecipe()}`}
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
