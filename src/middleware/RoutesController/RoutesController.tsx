import React from 'react';
import {
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Recoil from 'recoil';
import { atomRecipeNameList } from 'atoms/atomRecipeNameList';
import { RecipePage } from 'middleware/RecipePage';

// Pages
import { Landing } from 'pages/Landing';
import { Search } from 'pages/Search';
import { Discover } from 'pages/Discover';
import { Favourites } from 'pages/Favourites';
import { Settings } from 'pages/Settings';
import { Login } from 'pages/Login';
import { SubmissionJourney } from 'pages/SubmissionJourney';
import Error404 from 'middleware/ErrorPage/Errors/404';
import Error405 from 'middleware/ErrorPage/Errors/405';

const RoutesController: React.FunctionComponent = () => {
	const recipes: string[] = Recoil.useRecoilValue(atomRecipeNameList);

	return (
		<Routes>
			<Route
				path="/"
				element={<Landing />}
			/>

			<Route
				path="/search"
				element={<Search />}
			/>

			<Route
				path="/discover"
				element={<Discover />}
			/>

			<Route
				path="/favourites"
				element={<Favourites />}
			/>

			<Route
				path="/random"
				element={(
					<Navigate
						to={(
							`/recipe/${recipes[Math.floor(Math.random() * (recipes.length - 1 - 0 + 1)) + 0]}`
						)}
						replace
					/>
				)}
			/>

			<Route
				path="/recipe/:recipeName"
				element={(
					<RecipePage />
				)}
			/>

			<Route
				path="/settings"
				element={<Settings />}
			/>

			<Route
				path="/login"
				element={<Login />}
			/>

			<Route
				path="/submit"
				element={<SubmissionJourney />}
			/>

			<Route
				path="/405"
				element={<Error405 />}
			/>

			<Route
				path="*"
				element={<Error404 />}
			/>
		</Routes>
	);
};

export default RoutesController;
