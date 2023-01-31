/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/** @jsxImportSource @emotion/react */
import React from 'react';
import Recoil from 'recoil';
import { atomApi } from '../../atoms/atomApi';
import { atomFavourites } from '../../atoms/atomFavourites';
import { atomLoadedRecipes } from '../../atoms/atomLoadedRecipes';
import { atomAuthentication } from '../../atoms/atomAuthentication';
import { useAuthenticated } from '../../hooks/useAuthenticated';
import { useLoadRecipes } from '../../hooks/useLoadRecipes';
import { StylesContext } from '../../context/Styles';
import { ContentPage } from '../../components/ContentPage';
import { Loader } from '../../components/Loader';
import { RecipeRow } from '../../components/RecipeRow';
import {
	favouritesStyles,
} from './Favourites.styles';

const Favourites = () => {
	const { styles } = React.useContext(StylesContext);
	const [favourites, setFavourites] = Recoil.useRecoilState(atomFavourites);
	const loadedRecipes = Recoil.useRecoilValue(atomLoadedRecipes);
	const api = Recoil.useRecoilValue(atomApi);
	const authData = Recoil.useRecoilValue(atomAuthentication);
	const [isLoading, setLoading] = React.useState<boolean>(false);
	const isLoggedIn = useAuthenticated();
	const loadRecipes = useLoadRecipes();

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

	const callFavouritesApi = (
		type: 'GET' | 'POST',
		body?: any,
	) => {
		const submissionUrl = `${api.url}/${api.version}/${api.endpoints.favourites}`;
		const submissionOptions = {
			method: type,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				authorizationToken: authData.authentication.access_token,
			},
			body,
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
					setFavourites([
						...favourites,
						data,
					]);
				}
			})())
			.catch((err) => {
				console.error('error', err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	React.useEffect(() => {
		// Update Local Storage
		localStorage.setItem('favourites', JSON.stringify(favourites));

		// Update User Data if logged in
		if (isLoggedIn) {
			callFavouritesApi('POST', JSON.stringify(favourites));
		}

		// Fetch new recipes if needed
		if (favourites.length > 0) {
			loadRecipes(favourites);
		}
	}, [favourites]);

	React.useEffect(() => {
		// set favourites from localStorage
		const localFavs = localStorage.getItem('favourites') || '[]';
		const parsedFavs = JSON.parse(localFavs);

		if (
			parsedFavs
			&& Array.isArray(parsedFavs)
			&& localFavs.length > 0
		) {
			setFavourites(parsedFavs);
		}

		// if the user is logged in, get the user's favourites
		if (isLoggedIn) {
			callFavouritesApi('GET');
		}
	}, []);

	return (
		<ContentPage title="Favourites">
			<div css={favouritesStyles(styles)}>
				{isLoading ? (
					<Loader />
				) : (
					<div>
						{ favourites.length > 0 ? (
							loadedRecipes.data
								.filter(((recipe) => favourites.includes(recipe.recipeName)))
								.map((recipe) => (
									<>
										<button
											type="button"
											onClick={() => removeFavourite(recipe.recipeName)}
										>
											X
										</button>
										<RecipeRow {...recipe} key={recipe.recipeName} />
									</>
								))
						) : (
							<div>You have no favourites!</div>
						)}
					</div>
				)}
			</div>
		</ContentPage>
	);
};

export default Favourites;
