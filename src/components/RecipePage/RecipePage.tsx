/** @jsxImportSource @emotion/react */
import React from 'react';
import { NavBar } from '../NavBar';
import { StylesContext } from '../../context/StylesContext';
/** @jsxImportSource @emotion/react */
import {
	recipePageStyles,
	recipePagePanelLeftStyles,
	recipePagePanelRightStyles,
} from './RecipePage.styles';

type RecipeProps = {
};

const RecipePage: React.FunctionComponent<RecipeProps> = () => {
	const { styles } = React.useContext(StylesContext);

	return (
		<>
			<NavBar />

			<main css={recipePageStyles(styles)}>
				<section css={recipePagePanelLeftStyles(styles)}>
					<h1>Recipe Title</h1>
					<div>
						Prep Time, Cook Time, Difficulty, Price
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Phasellus elementum, ligula et accumsan sagittis, elit justo consequat justo,
						eu laoreet tortor sem nec sem. Morbi blandit condimentum ligula non pulvinar.
						Sed turpis lectus, vestibulum sit amet massa ac, varius eleifend ante.
						Vivamus venenatis nibh in odio dapibus, ac consectetur nibh vulputate.
					</p>
					<div>
						Tags
					</div>
					<div>
						Ingredients
						<br />
						Accordion
					</div>
					<div>
						Method
						<br />
						Accordion
					</div>
				</section>

				<section css={recipePagePanelRightStyles(styles)}>
					<img
						src="https://cdn.donnahaycdn.com.au/images/content-images/all-in-one_crispy_baked_tacos.jpg"
						alt="a good name"
					/>
				</section>
			</main>
		</>
	);
};

export default RecipePage;
