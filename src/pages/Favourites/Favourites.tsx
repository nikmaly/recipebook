/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Recoil from 'recoil';
import { atomFavourites } from 'atoms/atomFavourites';
import { atomLoadedRecipes } from 'atoms/atomLoadedRecipes';
import { StylesContext } from 'context/Styles';
import { useFavourites } from 'hooks/useFavourites';
import { ContentPage } from 'middleware/ContentPage';
// import { Loader } from 'components/Loader';
import { RecipeRow } from 'components/RecipeRow';
import {
	favouritesStyles,
	favouritesRowStyles,
	favouritesDeleteStyles,
} from './Favourites.styles';

const Favourites = () => {
	const { styles } = React.useContext(StylesContext);
	const favourites = Recoil.useRecoilValue(atomFavourites);
	const loadedRecipes = Recoil.useRecoilValue(atomLoadedRecipes);
	const setFavourites = useFavourites();
	// const [isLoading, setLoading] = React.useState<boolean>(false);

	const removeFavourite = (recipe: string) => {
		const updatedFavourites = [...favourites];

		if (favourites.includes(recipe)) {
			updatedFavourites.splice(
				updatedFavourites.indexOf(recipe),
				1,
			);

			setFavourites(updatedFavourites);
		}
	};

	return (
		<ContentPage title="Favourites">
			<div css={favouritesStyles(styles)}>
				{/* {isLoading ? (
					<Loader />
				) : ( */}
				{ favourites.length > 0 ? (
					loadedRecipes.data
						.filter(((recipe) => favourites.includes(recipe.recipeName)))
						.map((recipe, i) => (
							<div
								key={i}
								css={favouritesRowStyles(styles)}
							>
								<button
									css={favouritesDeleteStyles(styles)}
									type="button"
									onClick={() => removeFavourite(recipe.recipeName)}
								>
									X
								</button>
								<RecipeRow {...recipe} key={recipe.recipeName} />
							</div>
						))
				) : (
					<div>You have no favourites!</div>
				)}
				{/* )} */}
			</div>
		</ContentPage>
	);
};

export default Favourites;
