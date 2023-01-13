/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { DynamoDB } from 'aws-sdk';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { atomRecipeNameList, TRecipeNameList } from '../../atoms/atomRecipeNameList';
import { TRecipeData } from '../DataLayer';
import { NavBar } from '../NavBar';
import { Pill } from '../Pill';
import { Accordion } from '../Accordion';
import { Tab, ITabContent } from '../Tab';
import { StylesContext } from '../../context/Styles';
import {
	recipePageStyles,
	recipePageNextLinkStyles,
	recipePagePanelLeftStyles,
	recipePagePanelRightStyles,
	recipePageTitleStyles,
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
	const api = Recoil.useRecoilValue(atomApi);
	const [isLoading, setLoading] = React.useState(true);
	const { styles } = React.useContext(StylesContext);
	const [errors, setErrors] = React.useState<string[]>([]);
	const [recipeData, setRecipeData] = React.useState<TRecipeData>();
	const { recipeName } = useParams();

	const fetchRecipe = () => {
		fetch(`${api.uri}/${api.version}/${api.endpoints.getRecipe}/${recipeName}`)
			.then((response) => response.json())
			.then((data) => (async () => {
				await new Promise((resolve) => { setTimeout(resolve, 1000); });
				setLoading(false);
				setRecipeData(data.Items.map((item: any) => DynamoDB.Converter.output({ M: item }))[0]);
			})()).catch((_error) => {
				setLoading(false);
				setErrors(_error);
			});
	};

	React.useEffect(() => {
		setLoading(true);
		if (recipeNames.includes(recipeName || '')) {
			fetchRecipe();
		}
	}, []);

	const tabContent: ITabContent[] = [
		{
			tabTitle: 'Ingredients',
			tabIcon: <img src={IngredientSvg} alt="ingredient icon" />,
			tabSplit: true,
			tabContent: recipeData && (
				recipeData.ingredients.map((section, i) => (
					<div key={i}>
						<h4>{section.sectionName}</h4>
						<ul>
							{section.sectionIngredients.map((ingredient, j) => (
								<li key={`${i}-${j}`}>
									{`${ingredient.amount} ${ingredient.unit} ${ingredient.ingredient}`}
								</li>
							))}
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
					<div key={i}>
						<h4>{section.sectionName}</h4>
						<ol>
							{section.sectionSteps.map((step, j) => (
								<li key={`${i}-${j}`}>
									{step}
								</li>
							))}
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
					<div key={i}>
						<h4>{section.sectionName}</h4>
						<ol>
							{section.sectionSteps.map((step, j) => (
								<li key={`${i}-${j}`}>
									{step}
								</li>
							))}
						</ol>
					</div>
				))
			),
		},
	];

	return (
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

								<div css={recipePageTagStyles(styles)}>
									<ul>
										{
											recipeData.tags.map((tag, i) => (
												<Pill
													key={tag}
													text={tag}
													href={`/tags/${tag}`}
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
											<p>{recipeData.data.prepTime}</p>
										</li>
										<li>
											<p>Cook Time:</p>
											<p>{recipeData.data.cookTime}</p>
										</li>
										<li>
											<p>Difficulty:</p>
											<p>{recipeData.data.difficulty}</p>
										</li>
									</ul>
								</div>

								{recipeData.description && (
									<div css={recipePageDescriptionStyles(styles)}>
										{recipeData.description.map((item, i) => (
											<p key={i}>{item}</p>
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
											itemContent: recipeData.furtherInfo.map((item) => <p>{item}</p>),
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
	);
};

export default RecipePage;
