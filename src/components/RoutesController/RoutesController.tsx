import React from 'react';
import {
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Recoil from 'recoil';
import { atomRecipeNames } from '../../atoms/atomRecipeNames';
import { RecipePage } from '../RecipePage';

// Pages
import { Landing } from '../../pages/Landing';
import { Search } from '../../pages/Search';
import { Settings } from '../../pages/Settings';
import Error404 from '../ErrorPage/Errors/404';
import Error405 from '../ErrorPage/Errors/405';

const RoutesController: React.FunctionComponent = () => {
	const recipes: string[] = Recoil.useRecoilValue(atomRecipeNames);

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
				path="/contact"
				element={(
					<Navigate
						to="https://nik.malyaris.com/"
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
				element={(
					<Navigate
						to="https://auth.malyaris.com/oauth2/authorize?response_type=code&client_id=56u2njrnvps7r2dcirvk6otjnl&redirect_uri=https://recipes.malyaris.com"
						replace
					/>
				)}
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
