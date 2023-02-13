/* eslint-disable no-underscore-dangle */
import React from 'react';
import Recoil from 'recoil';
import { atomApi } from 'atoms/atomApi';
import { atomFavourites } from 'atoms/atomFavourites';
import { useAuthenticated } from 'hooks/useAuthenticated';
import { useLoadRecipes } from 'hooks/useLoadRecipes';

export const useFavourites = () => {
	const [favourites, setFavourites] = Recoil.useRecoilState(atomFavourites);
	const api = Recoil.useRecoilValue(atomApi);
	const [authenticated,, authData] = useAuthenticated();
	const loadRecipes = useLoadRecipes();

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
				authorizationToken: authData.access_token,
			},
			body,
		};

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
				// setLoading(false);
			});
	};

	// If the app thinks we should be logged in and we have credentials, attempt to do so
	const handleUpdateFavourites = (newFavourites: string[]) => {
		setFavourites(newFavourites);

		// Update Local Storage
		localStorage.setItem('favourites', JSON.stringify(newFavourites));

		// Update User Data if logged in
		if (false && authenticated) {
			callFavouritesApi('POST', JSON.stringify(newFavourites));
		}

		// Fetch new recipes if needed
		if (favourites.length > 0) {
			loadRecipes(favourites);
		}
	};

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
		if (false && authenticated) {
			callFavouritesApi('GET');
		}

		// Fetch new recipes if needed
		if (favourites.length > 0) {
			loadRecipes(favourites);
		}
	}, []);

	React.useEffect(() => {
		// Make sure favourite items are all unique
		const uniqueFavourites = [...new Set(favourites)];

		if (uniqueFavourites.toString() !== favourites.toString()) {
			setFavourites(uniqueFavourites);
		}

		// Fetch new recipes if needed
		if (uniqueFavourites.length > 0) {
			loadRecipes(uniqueFavourites);
		}
	}, [favourites]);

	return handleUpdateFavourites;
};

export default useFavourites;
